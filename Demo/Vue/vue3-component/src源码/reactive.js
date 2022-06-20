import { mutableHandlers } from './baseHandlers';
export function reactive(target) {
  if (typeof target !== 'object') {
    console.log(`reactive ${target} 必须是一个 对象`);
    return target;
  }
  return new Proxy(target, mutableHandlers);
}
