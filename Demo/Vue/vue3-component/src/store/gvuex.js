import { inject, reactive } from 'vue';

const STORE_KEY = '__store__';
function useStore() {
  return inject(STORE_KEY);
}
function createStore(option) {
  return new Store(option);
}

class Store {
  constructor(options) {
    this.$options = options;
    this._state = reactive({
      data: options.state(),
    });
    this._mutations = options.mutations;
  }
  get state() {
    return this._state.data;
  }
  // get getters() {
  //   return 2;
  // }
  commit = (type, payload) => {
    const entry = this._mutations[type]; // 应该是一个函数
    console.log(type, payload, 24);
    // 将最新的状态值传入
    entry && entry(this.state, payload);
  };
  // main.js 入口出app.use(store)的时候，会执行这个函数
  install(app) {
    app.provide(STORE_KEY, this);
  }
}
export { createStore, useStore };
