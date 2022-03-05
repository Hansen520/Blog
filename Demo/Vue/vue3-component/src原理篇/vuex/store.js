import { forEachValue, isPromise } from './utils'
import { reactive, watch } from 'vue'
import { storeKey } from './injectKey'
import ModuleCollection from './module/module-collection'

// 根据路径 获取store上面的最新状态
function getNestedState(state, path) {
  return path.reduce((state, key) => state[key], state)
}

// 递归安装
function installModule(store, rootState, path, module) {
  // 如果数组是空数组，说明是根元素，否则不是
  const isRoot = !path.length

  // 判断模块上是否有namespaced
  const namespaced = store._modules.getNamespaced(path)

  if (!isRoot) {
    // []
    const parentState = path
      .slice(0, -1)
      .reduce((state, key) => state[key], rootState)
    store._withCommit(() => {
      parentState[path[path.length - 1]] = module.state
    })
  }
  // getters
  module.forEachGetter((getter, key) => {
    store._wrappedGetters[namespaced + key] = () => {
      // 这里不能直接用模块上自己的状态，此状态不是响应式的，所以我们用getNestedState包装下成为响应式的
      return getter(getNestedState(store.state, path))
    }
  })
  // mutations
  module.forEachMutation((mutation, key) => {
    const entry =
      store._mutations[namespaced + key] ||
      (store._mutations[namespaced + key] = [])
    // store.commit('add', payload)
    entry.push((payload) => {
      mutation.call(store, getNestedState(store.state, path), payload)
    })
  })
  // actions
  module.forEachAction((action, key) => {
    const entry =
      store._actions[namespaced + key] ||
      (store._actions[namespaced + key] = [])
    // store.dispatch('add', payload)
    entry.push((payload) => {
      // store 里面存在着commit等一系列方法, 所以第二参数传store
      const res = action.call(store, store, payload)
      // 判断res是不是一个promise, 如果不是则再包装一层
      if (!isPromise(res)) {
        return Promise.resolve(res)
      }
      return res
    })
  })
  // key=> aCount,bCount
  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child)
  })
}

// 重置状态
function resetStoreState(store, state) {
  store._state = reactive({ data: state })
  const wrappedGetters = store._wrappedGetters
  store.getters = {}
  forEachValue(wrappedGetters, (getter, key) => {
    Object.defineProperty(store.getters, key, {
      get: getter,
      enumerable: true
    })
  })
  // 如果开启了严格模式
  if (store.strict) {
    enableStrictMode(store)
  }
}
// 能够进行严格模式
function enableStrictMode(store) {
  // 监控数据变化，数据变化后执行回调函数
  watch(
    () => store._state.data,
    () => {
      console.assert(
        store._commiting,
        '不能通过mutation其他之外的方式修改state'
      )
    },
    { deep: true, flush: 'sync' }
  ) // 默认watchApi是异步的，这里改成同步的监控
}

export default class Store {
  _withCommit(fn) {
    // 切片
    const commiting = this._commiting
    // 就是包了一层后先置为true, 让其可以修改状态, 执行完方法后再置回false
    this._commiting = true
    fn()
    this._commiting = commiting
  }

  constructor(options) {
    // {state, actions,mutations,getter,modules}
    const store = this
    // 通过递归的方式收集模块, 传递对象options
    store._modules = new ModuleCollection(options)

    // {add: [fn,fn,fn]} 发布订阅模式
    store._wrappedGetters = Object.create(null)
    store._mutations = Object.create(null)
    store._actions = Object.create(null)

    // 是不是严格模式
    this.strict = options.strict || false

    // 在mutation之前添加状态， _commiting = true
    // 调用mutation会更改状态, 如果同步更改, commiting还是true，如果是异步修改，则commiting是false
    // 调用时候，用mutation, mutation里面得写同步代码
    this._commiting = false

    // 定义状态
    const state = store._modules.root.state // 根状态
    installModule(store, state, [], store._modules.root)
    resetStoreState(store, state)

    // 做一个插件
    store._subscribes = []
    if (options.plugins) {
      options.plugins.forEach((plugin) => plugin(store))
    }
  }

  // 订阅模式
  subscribe(fn) {
    this._subscribes.push(fn)
  }

  get state() {
    return this._state.data
  }

  // 通过插件换取新状态(用户刷新时候更改)
  replaceState(newState) {
    // 严格模式下，不能直接修改状态，所以加上_withCommit再修改
    this._withCommit(() => {
      this._state.data = newState
    })
  }

  commit = (type, payload) => {
    const entry = this._mutations[type] || []
    this._withCommit(() => {
      entry.forEach((handler) => handler(payload))
    })
    // 发布订阅插件执行
    this._subscribes.forEach((sub) => sub({ type, payload }, this.state))
  }

  dispatch = (type, payload) => {
    const entry = this._actions[type] || []
    // 让所有请求都返回再执行
    return Promise.all(entry.map((handler) => handler(payload)))
  }

  install(app, injectKey) {
    // createApp().use(store, 'my')
    // 全局奥路一个变量，暴露的是store的实例
    // 给根app增加一个_provides,子组件会向上查找, 并将store实例进行暴露
    app.provide(injectKey || storeKey, this)
    // 类似vue2中Vue.prototype.$store = this的写法
    app.config.globalProperties.$store = this
  }

  // 动态添加新模块
  registerModule(path, rawModule) {
    const store = this
    if (typeof path === 'string') {
      path = [path]
    }
    // 要在原有的模块基础上新增加一个
    const newModule = store._modules.register(rawModule, path) // 注册上去
    // 再把模块安装上
    installModule(store, store.state, path, newModule)
    // 重置容器
    resetStoreState(store, store.state)
  }
}
