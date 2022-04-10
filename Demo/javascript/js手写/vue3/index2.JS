// 响应式
const bucket = new WeakMap();

const data = { text: 'hello world' };
let activeEffect;
function effect(fn) {
  activeEffect = fn;
  fn();
}

const obj = new Proxy(data, {
  get(target, key) {
    // 将副作用函数activeEffect添加到存储副作用函数的桶中
    track(target, key);
    // 返回属性值
    return target[key];
  },
  // 设置拦截器
  set(target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
  },
});

// 在get拦截器函数内调用track函数追踪变化
function track(target, key) {
  if (!activeEffect) return;
  let depsMap = bucket.get(target);
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  deps.add(activeEffect);
}
// 在set拦截函数内调用trigger函数触发变化
function trigger(target, key) {
  const depsMap = bucket.get(target);
  if (!depsMap) return;
  const effects = depsMap.get(key);
  effects && effects.forEach((fn) => fn());
}
effect(() => {
  console.log('dadsad'); // 2次打印
  document.body.innerHTML = obj.text;
});
setTimeout(() => {
  obj.text = 'hello vue3';
}, 1000);
