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
// 发布订阅模式
function useCallback() {
  const handlers = []
  function add(handler) {
    handlers.push(handler)
  }
  return {
    add,
    list: () => handlers
  }
}
function guardToPromise(guard, to, from, record) {
  return () =>
    new Promise((resolve, reject) => {
      const next = () => resolve()
      const guardReturn = guard.call(record, to, from, next)

      // 这边可以多一层， 如果不调用next，最终也会调用next(就是说用户可以不调用nexx方法)
      return Promise.resolve(guardReturn).then(next)
    })
}

// 确定组件守卫
function extractComponentsGuards(matched, guardType, to, from) {
  const guards = []
  for (const record of matched) {
    const rawComponent = record.components.default
    const guard = rawComponent[guardType]

    // 需要将钩子串联在一起
    guard && guards.push(guardToPromise(guard, to, from))
  }
  return guards
}

// promise的组合函数
// [fn()=>promise, fn=>promise]
function runGuardQueue(guards) {
  return guards.reduce(
    (promise, guard) => promise.then(() => guard()),
    Promise.resolve()
  )
}

// 入口
function createRouter(options) {
  const routerHistory = options.history
  // console.log(routerHistory)
  // 将路由进行扁平化
  const matcher = createRouterMatcher(options.routes)
  console.log('matcher', matcher)
  // (响应式)后续改变这个数据的value就可以更新视图了(利用vue的api)
  const currentRoute = shallowRef(STATE_LOCATION_NORMALIZED)

  // 路由钩子(通过一个函数)
  const beforeGuards = useCallback()
  const beforeResolveGuards = useCallback()
  const afterGuards = useCallback()

  // 通过路径匹配到对应的记录， 更新currentRoute，将数据用计算属性 再次包裹
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
  // 初始化导航
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
    // 如果是初始化，还需要注入一个listen去更新currentRoute的值，这样数据变化后可以重新渲染
    markAsReady()
  }
  // 钩子相关
  function extractChangeRecords(to, from) {
    const leavingRecords = []
    const updatingRecords = []
    const enteringRecords = []
    // 用len去判断谁的路径长一些
    const len = Math.max(to.matched.length, from.matched.length)
    for (let i = 0; i < len; i++) {
      const recordFrom = from.matched[i]
      if (recordFrom) {
        // 去的和来的都有 那么就是要更新
        if (to.matched.find((record) => record.path === recordFrom.path)) {
          updatingRecords.push(recordFrom)
        } else {
          // 如果出来的不在进入的里面，那说明此路由是离开的
          leavingRecords.push(recordFrom)
        }
      }
      const recordTo = to.matched[i]
      if (recordTo) {
        // 如果进入的有，出来的没有，那就推进到enteringRecords里面
        if (!from.matched.find((record) => record.path === recordTo.path)) {
          enteringRecords.push(recordTo)
        }
      }
    }
    return [leavingRecords, updatingRecords, enteringRecords]
  }

  function navigate(to, from) {
    // 在做导航的时候，要知道哪个组件是进入，哪个组件是离开的，还要知道哪个组件是更新的
    const [
      leavingRecords,
      updatingRecords,
      enteringRecords
    ] = extractChangeRecords(to, from)

    let guards = extractComponentsGuards(
      leavingRecords.reverse(),
      'beforeRouteLeave',
      to,
      from
    )
    return runGuardQueue(guards)
      .then(() => {
        guards = []
        for (const guard of beforeGuards.list()) {
          guards.push(guardToPromise(guard, to, from, guard))
        }
        return runGuardQueue(guards)
      })
      .then(() => {
        guards = extractComponentsGuards(
          updatingRecords,
          'beforeRouteUpdate',
          to,
          from
        )
        return runGuardQueue(guards)
      })
      .then(() => {
        guards = []
        for (const record of to.matched) {
          if (record.beforeEnter) {
            guards.push(guardToPromise(record.beforeEnter, to, from, record))
          }
        }
        return runGuardQueue(guards)
      })
      .then(() => {
        guards = extractComponentsGuards(
          enteringRecords,
          'beforeRouteEnter',
          to,
          from
        )
        return runGuardQueue(guards)
      })
      .then(() => {
        guards = []
        for (const guard of beforeResolveGuards.list()) {
          guards.push(guardToPromise(guard, to, from, guard))
        }
        return runGuardQueue(guards)
      })
  }

  // 通过路径匹配到对应的记录，更新currentRoute
  function pushWithRedirect(to) {
    // console.log(to)
    const targetLocation = resolve(to)
    const from = currentRoute.value
    // 路由的钩子 在跳转前，我们可以做路由的拦截

    // 根据是不是第一次，来决定是push还是replace
    // 这边做导航守卫的逻辑
    navigate(targetLocation, from)
      .then(() => {
        return finalizeNavigation(targetLocation, from)
      })
      .then(() => {
        // 当导航切换完毕后执行 afterEach
        for (const guard of afterGuards.list()) {
          guard(to, from)
        }
      })
  }
  function push(to) {
    return pushWithRedirect(to)
  }
  const router = {
    push,
    beforeEach: beforeGuards.add, // 可以注册多个， 所以是一个发布订阅模式，钩子如同
    afterEach: afterGuards.add,
    beforeResolve: beforeResolveGuards.add,
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
      // const { path } = reactive(reactiveRoute)
      // console.log(path)
      // console.log(currentRoute.value, STATE_LOCATION_NORMALIZED)
      if (currentRoute.value === STATE_LOCATION_NORMALIZED) {
        // 默认就是初始化，需要通过路由系统先进行一次跳转 ，发生匹配
        // console.log('默认第一次')
        push(routerHistory.location)
      }
      // console.log(beforeGuards.list())
    }
  }
  console.log(router)
  return router
}

export { createWebHashHistory, createWebHistory, createRouter }
