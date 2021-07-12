import { createWebHashHistory } from './history/hash'
import { createWebHistory } from './history/html5'

// 格式化用户的参数
function normalizedRecord1(record) {
  return {
    path: record.path, // 状态机，解析路径的分数，算出匹配规则
    meta: record.meta || {},
    beforeEnter: record.beforeEnter,
    name: record.name,
    components: {
      default: record.component // 循环
    },
    children: record.children || []
  }
}
// 构建匹配记录，构造父子关系
function createRouteRecordMatcher(record, parent) {
  // record中的path做一些修改 正则的情况
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
    1. route {path:'/' children: [2]}
  */
  function addRoute(route, parent) {
    // 获取标准化的格式
    /*
      1. normalizedRecord {path:'/' children: [2]}
      2. normalizedRecord {path:'a' children: []}, {path: '/', children: []}
      2. normalizedRecord {path:'b' children: []}, {path: '/', children: []}
    */
    const normalizedRecord = normalizedRecord1(route)
    console.log(normalizedRecord)
    if (parent) {
      normalizedRecord.path = parent.path + normalizedRecord.path
    }
    // 构建父子关系
    /*
      1. matcher {path: '/', children: []}
    */
    const matcher = createRouteRecordMatcher(normalizedRecord, parent)
    if ('children' in normalizedRecord) {
      const children = normalizedRecord.children
      for (let i = 0; i < children.length; i++) {
        /*
          传入1 normalizedRecord {path:'a' children: []}, {path: '/', children: []}
          传入2 normalizedRecord {path:'b' children: []}, {path: '/', children: []}
        */
        addRoute(children[i], matcher)
      }
    }
    matchers.push(matcher)
  }

  routes.forEach((route) => addRoute(route))
  console.log(matchers)
  return {
    addRoute // 动态添加路由， 面试常考
  }
}
// 入口
function createRouter(options) {
  // const routerHistory = options.history
  // 格式化设置拍平const matcher =
  createRouterMatcher(options.routes)
  const router = {
    // vue3安装路由
    install(app) {
      console.log(app, 'app路由的安装')

      app.component('RouterLink', {
        setup: (props, { slots, attrs, emit, expose }) => () => {
          return <a>{slots.default && slots.default()}</a>
        }
      })

      app.component('RouterView', {
        setup: (props, { slot }) => () => <div></div>
      })
    }
  }
  console.log(router)
  return router
}

export { createWebHashHistory, createWebHistory, createRouter }
