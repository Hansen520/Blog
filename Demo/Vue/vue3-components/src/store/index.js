import { createStore } from '@/vuex'

// 比如说建立一个持久化的插件(这里可以增加一些性能优化，如节流等等)
function customPlugin(store) {
  const local = localStorage.getItem('VUEX:STATE')
  if (local) {
    store.replaceState(JSON.parse(local))
  }
  // 每次状态发生变化(调用了mutation的时候，就会执行此回调)
  store.subscribe((mutation, state) => {
    localStorage.setItem('VUEX:STATE', JSON.stringify(state))
  })
}

const store = createStore({
  // 插件
  plugins: [
    // 会按照注册的顺序依次执行, 执行时候会把store传进去
    customPlugin
  ],
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
      }
      // modules: {
      //   cCount: {
      //     namespaced: true,
      //     state: { count: 10 },
      //     mutations: {
      //       add(state, payload) {
      //         state.count += payload
      //       }
      //     }
      //   }
      // }
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

// 动态注册模块(比如再aCount上面注册cCount)
store.registerModule(['aCount', 'cCount'], {
  namespaced: true,
  state: {
    count: 0
  },
  mutations: {
    add(state, payload) {
      state.count += payload
    }
  }
})
export default store
