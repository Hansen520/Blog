import { CrowllerController, LoginController } from '../controller';

// 必需要有, 否则router[method]的method无法识别
export enum Methods {
  get = 'get',
  post = 'post'
}

// 复用性写法
function getRequestDecorator(type: Methods) {
  // 请求方法装饰器
  return function (path: string) {
    return function (target: CrowllerController | LoginController, key: string) {
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', type, target, key)
    }
  }
}


export const get = getRequestDecorator(Methods.get);
export const post = getRequestDecorator(Methods.post);
