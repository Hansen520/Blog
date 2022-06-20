const targetMap = new WeakMap();
let activeEffect;
export function track(target, type, key) {
  // console.log(target, 4);
  // console.log(`触发 track -> target: ${target} type:${type} key:${key}`)
  // 1. 先基于 target 找到对应的 dep
  // 如果是第一次的话，那么就需要初始化(下面就是这样子的一个结构)
  // {
  // target1: { // depsmap
  //   key:[effect1,effect2]
  //  }
  // }
  let depsMap = targetMap.get(target);
  // console.log(depsMap, 14);
  if (!depsMap) {
    // 初始化 depsMap 的逻辑
    targetMap.set(target, (depsMap = new Map()));
  }
  console.log(targetMap, 19);
  let deps = depsMap.get(key);
  if (!deps) {
    deps = new Set();
  }
  if (!deps.has(activeEffect) && activeEffect) {
    // 防止重复注册
    deps.add(activeEffect);
  }
  depsMap.set(key, deps);
}

export function effect(fn, options = {}) {
  const effectFn = () => {
    try {
      activeEffect = effectFn;
      // fn执行的时候，内部读取响应式数据的时候，就能在get配置里读取到activeEffect
      return fn();
    } finally {
      activeEffect = null;
    }
  };
  if (!options.lazy) {
    // 没有配置lazy 直接执行
    effectFn();
  }
  /*
    scheduler 存在的意义就是我们可以手动控制函数执行的时机，方便应对一些性能优化的场景，比如数据在一次交互中可能会被修改很多次，
    我们不想每次修改都重新执行依次 effect 函数，
    而是合并最终的状态之后，最后统一修改一次。
  */
  effectFn.scheduler = options.scheduler; // 调度时机 watchEffect会用到
}

export function trigger(target, type, key) {
  // console.log(`触发 trigger -> target: type:${type} key:${key}`)
  // 从targetMap中找到触发的函数，执行他
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    // 没有找到依赖
    return;
  }
  const deps = depsMap.get(key);
  if (!deps) {
    return;
  }
  deps.forEach((effectFn) => {
    if (effectFn.scheduler) {
      effectFn.scheduler();
    } else {
      effectFn();
    }
  });
}
