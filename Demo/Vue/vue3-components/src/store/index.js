import { createStore } from '@/vuex'

export default createStore({
  state: {
    // 组件中的data
    count: 0
  },
  getters: {
    double(state) {
      return state.count * 2
    }
  },
  mutations: {
    add(state, payload) {
      state.count += payload
    }
  },
  actions: {
    // 可以更改状态，必须同步更改的
    asyncAdd({ commit }, payload) {
      setTimeout(() => {
        commit('add', payload)
      }, 1000)
    }
  },

  modules: {}
})
