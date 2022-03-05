function buildState(
  back,
  current,
  forward,
  replace = false,
  computedScroll = false
) {
  return {
    back,
    current,
    forward,
    replace,
    scroll: computedScroll
      ? { left: window.pageXOffset, top: window.pageYOffset }
      : null,
    // 跳转的历史记录
    position: window.history.length - 1
  }
}
// 获取当前路径函数
function createCurrentLocation(base) {
  const { pathname, search, hash } = window.location
  // 有#就是hash 如 /about -> #/ #/about
  const hasPos = base.indexOf('#')
  if (hasPos > -1) {
    return base.slice(1) || '/'
  }

  return pathname + search + hash
}
// 利用历史状态导航(里面实现三个功能)
function useHistoryStateNavigation(base) {
  // 当前路径
  const currentLocation = {
    value: createCurrentLocation(base)
  }
  // 状态
  const historyState = {
    value: window.history.state
  }
  /* 第一次刷新页面，此时没有任何状态，那么就要自己维护一个状态(后退后是哪个路径、当前路径是哪个、要去哪里)
  我要用push跳还是replace跳，跳转后滚动条的位置在哪里 */
  if (!historyState.value) {
    changeLocation(
      currentLocation.value,
      buildState(null, currentLocation.value, null, true),
      // 要用true, 否则回退的时候就不是当前地址了
      true
    )
  }
  /**
   * @params 将要去的路径, 状态, 是否代替
   * 变化地址时候发生的事情
   * */
  function changeLocation(to, state, replace) {
    const hasPos = base.indexOf('#')
    const url = hasPos > -1 ? base + to : to
    // data: any, title: string, url?: string
    window.history[replace ? 'replaceState' : 'pushState'](state, null, url)
    /*
      将自己生成的状态同步到了路由系统中了(state)就是当前路径前后所有的值
    */
    historyState.value = state
  }
  // 去哪里，带的新状态是谁
  function push(to, data) {
    // 跳转的时候， 需要两个状态， 一个是跳转前的[将要跳转的]， 另一个从哪儿到哪儿[是将要跳转的]
    const currentState = Object.assign(
      {},
      // 当前的状态
      historyState.value,
      {
        // 将要去哪里
        forward: to,
        // 记录当前滚动条的位置
        scroll: { left: window.pageXOffset, top: window.pageYOffset }
      }
    )
    // 本质是没有跳转的 只是更新了状态，后续在vue中我可以详细监控到状态的变化
    changeLocation(currentState.current, currentState, true)

    const state = Object.assign(
      {},
      buildState(currentLocation.value, to, null),
      // 相当于在下一个位置
      { position: currentState.position + 1 },
      data
    )

    // 真正的发生跳转(更改了路径)
    changeLocation(to, state, false)
    currentLocation.value = to
  }
  // 替换当前路径
  function replace(to, data) {
    const state = Object.assign(
      {},
      // 除了当前路径外，其他不变
      buildState(historyState.value.back, to, historyState.value.forward, true),
      data
    )

    changeLocation(to, state, true)
    // 替换后需要将路径变为现在的路径
    currentLocation.value = to
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace
  }
}
// 监听浏览器前进后退，要更新historyState 和 currentLocation这两个边距
function useHistoryListeners(base, historyState, currentLocation) {
  const listeners = []
  // 最新的状态，已经是前进后退完毕后的状态， 回调函数
  const popStateHandler = ({ state }) => {
    console.log('state', state)
    const to = createCurrentLocation(base) // 去哪儿
    const from = currentLocation.value // 从哪儿来
    const fromState = historyState.value // 从哪儿的状态

    currentLocation.value = to
    historyState.value = state // state可能为空
    // 判断是前进还是后退， 如果后退则小于0
    const isBack = state.position - fromState.position < 0
    // 用户在这扩展.....
    listeners.forEach((listener) => {
      listener(to, from, { isBack })
    })
  }
  // popstate 只能监听浏览器的前进后退
  window.addEventListener('popstate', popStateHandler)
  // 发布订阅模式
  function listen(cb) {
    listeners.push(cb)
  }
  return {
    listen
  }
}
// 创建主入口方法
export function createWebHistory(base = '') {
  // 1.路由系统最基本的，【得包含当前的路径】，【当前路径下他的状态是什么】，【需要提供两个切换路径的方法push replace】
  const historyNavigation = useHistoryStateNavigation(base)

  // 2.监听浏览器的前进后退
  const historyListeners = useHistoryListeners(
    base,
    historyNavigation.state,
    historyNavigation.location
  )
  const routerHistory = Object.assign({}, historyNavigation, historyListeners)
  // 采用此方法是为了取值的时候获得下层属性的时候少一点
  Object.defineProperty(routerHistory, 'location', {
    get: () => historyNavigation.location.value
  })
  Object.defineProperty(routerHistory, 'state', {
    get: () => historyNavigation.state.value
  })
  return routerHistory
}
