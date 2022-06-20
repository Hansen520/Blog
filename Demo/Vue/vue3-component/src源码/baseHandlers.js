import { isObject } from '@vue/shared';
import { track, trigger } from './reactivity/effect';
const get = createGetter();
const set = createSetter();

function createGetter(shallow = false) {
  // Reflect.get()方法用于允许用户从对象获取函数的属性。此方法始终返回属性的值。
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver);
    track(target, 'get', key);
    if (isObject(res)) {
      // 值也是对象的话，需要嵌套调用reactive
      // res就是target[key]
      // 浅层代理，不需要嵌套
      return shallow ? res : reactive(res);
    }
    return res;
  };
}

function createSetter() {
  return function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    // 在触发 set 的时候进行触发依赖
    trigger(target, 'set', key);
    return result;
  };
}

export const mutableHandlers = {
  get,
  set,
};
