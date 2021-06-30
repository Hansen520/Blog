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

  console.log(namespaced)

  if (!isRoot) {
    // []
    const parentState = path
      .slice(0, -1)
      .reduce((state, key) => state[key], rootState)
    parentState[path[path.length - 1]] = module.state
  }
  // getters
  module.forEachGetter((getter, key) => {
    store._wrappedGetters[namespaced + key] = () => {
      // 这里不能直接用模块上自己的状态，此状态不是响应式的，所以我们用getNestedState包装下成为响应式的
      return getter(getNestedState(module.state, path))
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
function enableStrictMode(store) {
  // 监控数据变化，数据变化后执行回调函数
  watch(
    () => store._state.data,
    () => {
      console.assert(
        store._commiting,
        'do not mutate vuex store state outside mutaion handler'
      )
    },
    { deep: true, flush: 'sync' }
  ) // 默认watchApi是异步的，这里改成同步的监控
}

export default class Store {
  _withCommit(fn) {
    // 切片
    const commiting = this._commiting
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
  }

  get state() {
    return this._state.data
  }

  commit = (type, payload) => {
    const entry = this._mutations[type] || []
    console.log(entry)
    this._withCommit(() => {
      entry.forEach((handler) => handler(payload))
    })
    // entry.forEach((handler) => handler(payload))
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
}
