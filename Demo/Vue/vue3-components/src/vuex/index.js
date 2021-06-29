import Store from './store'
import { useStore } from './injectKey'

function createStore(options) {
  // options 就是我们vuex里面的对象(state, getter等等)
  return new Store(options)
}

export { useStore, createStore }
