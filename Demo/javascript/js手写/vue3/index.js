const bucket = new Set();

const data = { text: 'hello world' };
let activeEffect;
function effect(fn) {
  activeEffect = fn;
  fn();
}

const obj = new Proxy(data, {
  get(target, key) {
    if (activeEffect) {
      bucket.add(activeEffect);
    }
    return target[key];
  },
  set(target, key, newVal) {
    console.log(newVal);
    target[key] = newVal;
    bucket.forEach((fn) => fn());
    return true;
  },
});
effect(() => {
  console.log('dadsad'); // 2次打印
  document.body.innerHTML = obj.text;
});
setTimeout(() => {
  obj.text = 'hello vue3';
}, 1000);
