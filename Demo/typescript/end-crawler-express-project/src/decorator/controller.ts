import router from '../router'
import { RequestHandler } from 'express'
import { Methods } from './request'

// new (...args: any[]) => any 为构造函数的写法
export function controller(root: string) {
  return function(target: new (...args: any[]) => any) {
    for (let key in target.prototype) {
      // 获取请求路径
      const path: string = Reflect.getMetadata('path', target.prototype, key)
      // 获取请求方法
      const method: Methods = Reflect.getMetadata('method', target.prototype, key);
      // 获取原型链方法
      const handler = target.prototype[key]
      // 获取中间件函数
      const middlewares: RequestHandler = Reflect.getMetadata('middlewares', target.prototype, key)
      if (path && method) {
        const fullPath = root === '/' ? path : `${root}${path}`
        if (middlewares && middlewares.length) {
          // 中间件是按照顺序执行的, 就是说先执行middleware，再执行handler
          router[method](fullPath, middlewares, handler)
        } else {
          router[method](fullPath, handler)
        }
      }
    }
  }
}
