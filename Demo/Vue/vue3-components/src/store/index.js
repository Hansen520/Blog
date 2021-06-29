import { createStore } from '@/vuex'

export default createStore({
  strict: true, // 开启严格模式， 不允许用户非法操作状态(只能再mutation中修改, 否则就会发生异常)
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
  // 实现模块的拆分
  modules: {
    aCount: {
      namespaced: true,
      state: { count: 1 },
      mutations: {
        add(state, payload) {
          state.count += payload
        }
      },
      modules: {
        cCount: {
          namespaced: true,
          state: { count: 10 },
          mutations: {
            add(state, payload) {
              state.count += payload
            }
          }
        }
      }
    },
    bCount: {
      namespaced: true,
      state: { count: 2 },
      mutations: {
        add(state, payload) {
          state.count += payload
        }
      }
    }
  }
})
