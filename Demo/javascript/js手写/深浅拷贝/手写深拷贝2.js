// 针对能够遍历对象的不可枚举属性以及 Symbol 类型，我们可以使用 Reflect.ownKeys 方法；
// 当参数为 Date、RegExp 类型，则直接生成一个新的实例返回；
// 利用 Object 的 getOwnPropertyDescriptors 方法可以获得对象的所有属性，以及对应的特性，顺便结合 Object 的 create 方法创建一个新对象，并继承传入原对象的原型链；
// 利用 WeakMap 类型作为 Hash 表，因为 WeakMap 是弱引用类型，可以有效防止内存泄漏（你可以关注一下 Map 和 weakMap 的关键区别，这里要用 weakMap），作为检测循环引用很有帮助，如果存在循环，则引用直接返回 WeakMap 存储的值。

const isComplexDataType = (obj) =>
  (typeof obj === 'object' || typeof obj === 'function') && obj !== null;

const deepClone = function (obj, hash = new WeakMap()) {
  if (obj.constructor === Date) {
    // 日期对象直接返回一个新的日期对象
    return new Date(obj);
  }
  if (obj.constructor === RegExp) {
    // 正在对象直接返回一个新的正则对象
    return new RegExp(obj);
  }
  // 如果循环引用(环)了就用weakMap来解决
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  // 用来获取一个对象的所有自身属性的描述符
  let allDesc = Object.getOwnPropertyDescriptors(obj);
  // 遍历传入参数所有键的特性,getPrototypeOf方法返回指定对象的原型（内部[[Prototype]]属性的值）
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);
  // 继承原型链
  hash.set(obj, cloneObj);
  console.log(hash, 28, Reflect.ownKeys(obj));
  for (let key of Reflect.ownKeys(obj)) {
    cloneObj[key] =
      isComplexDataType(obj[key]) && typeof obj[key] !== 'function'
        ? deepClone(obj[key], hash)
        : obj[key];
  }
  return cloneObj;
};

// 下面是验证代码
let obj = {
  num: 0,
  str: '',
  boolean: true,
  unf: undefined,
  nul: null,
  obj: { name: '我是一个对象', id: 1 },
  arr: [0, 1, 2],
  func: function () {
    console.log('我是一个函数');
  },
  date: new Date(0),
  reg: new RegExp('/我是一个正则/ig'),
  [Symbol('1')]: 1,
};
Object.defineProperty(obj, 'innumerable', {
  enumerable: false,
  value: '不可枚举属性',
});
obj = Object.create(obj, Object.getOwnPropertyDescriptors(obj));
obj.loop = obj; // 设置loop成循环引用的属性
let cloneObj = deepClone(obj);
cloneObj.arr.push(4);
console.log('obj', obj);
console.log('cloneObj', cloneObj);
