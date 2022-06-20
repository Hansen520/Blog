import { isObject } from '@vue/shared';
import { reactive } from './reactive';
import { track, trigger } from './reactivity/effect';
// 给外部调用
export function ref(val) {
  // 有值可以初始化返回值
  // 第一次 val.__isRef 为undefined， 什么都没有
  console.log(isRef(val), val.__isRef, 7);
  if (isRef(val)) {
    return val;
  }
  return new RefImpl(val);
}

export function isRef(val) {
  return !!(val && val.__isRef);
}

// ref 就是利用面向对象的getter和setter进行track和trigger
class RefImpl {
  constructor(val) {
    this.__isRef = true;
    this._val = convert(val);
  }
  // get value 这也是为什么我们用ref去拦截value的原因
  get value() {
    track(this, 'value');
    return this._val;
  }
  set value(val) {
    if (val !== this._val) {
      this._val = convert(val);
      console.log(this, 31);
      trigger(this, 'value');
    }
  }
}

// ref 也可以支持复杂数据结构, 所以我们写应用的时候可以用ref一把刷
function convert(val) {
  return isObject(val) ? reactive(val) : val;
}
