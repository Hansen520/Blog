import { inject, reactive } from 'vue'
// import store from '../store'
// 创建容器，返回一个store(多例的)
const storeKey = 'store'

class Store {
  constructor(options) {
    const store = this
    store._state = reactive({ data: options.state })
  }

  get state() {
    return this._state.data
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
export function createStore(options) {
  // options 就是我们vuex里面的对象(state, getter等等)
  return new Store(options)
}

export function useStore(injectKey = null) {
  return inject(injectKey != null ? injectKey : storeKey)
}
