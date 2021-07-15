import { createWebHashHistory } from './history/hash'
import { createWebHistory } from './history/html5'
import { shallowRef, computed, reactive, unref } from 'vue'
import { RouterLink } from './router-link'
import { RouterView } from './router-view'
import { createRouterMatcher } from './matcher'

// 初始化路由系统中的默认参数
const STATE_LOCATION_NORMALIZED = {
  path: '/',
  // 路径参数
  // params: {},
  // query: {},
  // 当前路径匹配到的记录
  matched: []
}

// 入口
function createRouter(options) {
  const routerHistory = options.history
  console.log(routerHistory)
  // 格式化设置拍平
  const matcher = createRouterMatcher(options.routes)
  console.log(matcher)

  // (响应式)后续改变这个数据的value就可以更新视图了
  const currentRoute = shallowRef(STATE_LOCATION_NORMALIZED)

  // 通过路径匹配到对应的记录， 更新currentRoute
  function resolve(to) {
    // to = '/' to={path: '/'}
    if (typeof to === 'string') {
      return matcher.resolve({ path: to })
    }
  }

  // 标识方法只走一次
  let ready
  function markAsReady() {
    if (ready) {
      return
    }
    // 用来标记已经渲染完毕
    ready = true
    routerHistory.listen((to) => {
      const targetLocation = resolve(to)
      const from = currentRoute.value
      finalizeNavigation(targetLocation, from, true)
    })
  }

  function finalizeNavigation(to, from, replaced) {
    // 第一次
    if (from === STATE_LOCATION_NORMALIZED || replaced) {
      routerHistory.replace(to.path)
      // 第二次跳转或更多跳转
    } else {
      routerHistory.push(to.path)
    }
    // 更新最新的路径
    currentRoute.value = to
    console.log(currentRoute.value)
    // 如果是初始化，还需要注入一个listen去更新currentRoute的值，这样数据变化后可以重新渲染
    markAsReady()
  }

  function pushWithRedirect(to) {
    // console.log(to)
    const targetLocation = resolve(to)
    const from = currentRoute.value
    // 路由的钩子 在跳转前，我们可以做路由的拦截

    // 根据是不是第一次，来决定是push还是replace
    finalizeNavigation(targetLocation, from)
    console.log(targetLocation, from)
    return { targetLocation, from }
  }
  function push(to) {
    return pushWithRedirect(to)
  }
  const router = {
    push,
    replace() {},
    // vue3安装路由, 路由的核心就是 页面的切换，重新渲染
    install(app) {
      const router = this
      // 方法
      app.config.globalProperties.$router = router
      // 属性
      Object.defineProperty(app.config.globalProperties, '$router', {
        enumerable: true,
        get: () => unref(currentRoute)
      })
      const reactiveRoute = {}
      // 遍历使之每个都成为计算属性
      for (const key in STATE_LOCATION_NORMALIZED) {
        reactiveRoute[key] = computed(() => currentRoute.value[key])
      }

      // 暴露路由对象
      app.provide('router', router)
      app.provide('route location', reactive(reactiveRoute))

      app.component('RouterLink', RouterLink)
      app.component('RouterView', RouterView)
      // 原本因为vue的ref的api，会path.value这样子使用
      // 所以可以采用reactive的方式包裹一层，因为它可以自动的消灭value的值
      const { path } = reactive(reactiveRoute)
      console.log(path)
      console.log(currentRoute.value, STATE_LOCATION_NORMALIZED)
      if (currentRoute.value === STATE_LOCATION_NORMALIZED) {
        // 默认就是初始化，需要通过路由系统先进行一次跳转 ，发生匹配
        console.log('默认第一次')
      }
    }
  }
  console.log(router)
  return router
}

export { createWebHashHistory, createWebHistory, createRouter }
