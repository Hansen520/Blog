import { track, trigger, effect } from '../reactivity/effect';

/*
  我们拦截computed的value属性，并制定了effect的lazy和scheduler配置，
  computed注册的函数就不会直接执行，而是要通过scheduler函数中对_dirty属性决定是否执行
*/
export function computed(getterOrOptions) {
  // getterOrOptions可以是函数，也可以是一个对象，支持computed
  let getter, setter;
  if (typeof getterOrOptions === 'function') {
    getter = getterOrOptions;
    setter = () => {
      console.warn('计算属性不能修改');
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  return new ComputedRefImpl(getter, setter);
}

class ComputedRefImpl {
  constructor(getter, setter) {
    this._setter = setter;
    this._val = undefined;
    this._dirty = true;
    // computed 就是一个特殊的effect，设置lay和执行时机
    this.effect = effect(getter, {
      lazy: true,
      scheduler: () => {
        if (!this._dirty) {
          this._dirty = true;
          trigger(this, 'value');
        }
      },
    });
  }
  get value() {
    track(this, 'value');
    if (this._dirty) {
      this._dirty = false;
      this._val = this.effect();
    }
    return this._val;
  }
  set value(val) {
    this._setter(val);
  }
}
