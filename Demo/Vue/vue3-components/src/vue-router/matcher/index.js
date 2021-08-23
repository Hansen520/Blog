// 格式化用户的参数
function normalizedRecord1(record) {
  return {
    path: record.path, // 状态机，解析路径的分数，算出匹配规则
    meta: record.meta || {},
    beforeEnter: record.beforeEnter,
    name: record.name,
    components:
      'components' in record
        ? record.component || {}
        : { default: record.component },
    children: record.children || []
  }
}
// 构建匹配记录，构造父子关系
function createRouteRecordMatcher(record, parent) {
  // record中的path做一些修改 正则的情况(获取当前理由信息)
  const matcher = {
    path: record.path,
    record,
    parent,
    children: []
  }
  // 如果有爸爸
  if (parent) {
    parent.children.push(matcher)
  }
  return matcher
}
// 树的遍历
function createRouterMatcher(routes) {
  const matchers = []
  /*
    1. route {path:'/' children: [2]}, unde
  */
  function addRoute(route, parent) {
    // 获取标准化的格式
    /*
      1. normalizedRecord {path:'/' children: [2]}
      2. normalizedRecord {path:'a' children: []}, {path: '/', children: []}
      2. normalizedRecord {path:'b' children: []}, {path: '/', children: []}
    */
    const normalizedRecord = normalizedRecord1(route)
    // console.log(normalizedRecord)
    if (parent) {
      normalizedRecord.path = parent.path + normalizedRecord.path
    }
    // 构建父子关系
    /*
      1. matcher {path: '/', children: []}
    */
    const matcher = createRouteRecordMatcher(normalizedRecord, parent)

    // 如果有孩子先从孩子开始(到了子路由后，因为自己设置了，每次都会有个children: []所以会有， 这也是个技巧)
    if ('children' in normalizedRecord) {
      const children = normalizedRecord.children
      // console.log(children.length)
      for (let i = 0; i < children.length; i++) {
        /*
          传入1 normalizedRecord {path:'a' children: []}, {path: '/', children: []}
          传入2 normalizedRecord {path:'b' children: []}, {path: '/', children: []}
        */
        addRoute(children[i], matcher)
      }
      // console.log(matcher)
    }
    // console.log(matcher)
    matchers.push(matcher)
  }
  // addRoute的入口， 通过循环增加动态路由
  routes.forEach((route) => addRoute(route))
  // console.log(matchers)

  // {path: /, matched: HomeRecord} {path: /a, matched: {HomeRecord, aRecord}}
  function resolve(location) {
    const matched = []
    const path = location.path
    let matcher = matchers.find((m) => m.path === path)

    while (matcher) {
      // 往下放数组, 将用户的原始数据 放到matched中
      matched.unshift(matcher.record)
      matcher = matcher.parent
    }
    console.log(matched)
    return {
      path,
      matched
    }
  }
  return {
    resolve,
    addRoute // 动态添加路由， 面试常考
  }
}

export { createRouterMatcher }
