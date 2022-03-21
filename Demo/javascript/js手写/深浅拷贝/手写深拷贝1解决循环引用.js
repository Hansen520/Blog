// 1.这个深拷贝函数并不能复制不可枚举的属性以及 Symbol 类型；
// 2.这种方法只是针对普通的引用类型的值做递归复制，而对于 Array、Date、RegExp、Error、Function 这样的引用类型并不能正确地拷贝；
// 3.对象的属性里面成环，即循环引用没有解决。

function deepClone(obj, hash = new WeakMap()) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  // 解决循环引用的问题
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  let result = null;
  if (Array.isArray(obj)) {
    result = [];
  } else {
    result = {};
  }
  hash.set(obj, 1);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key], hash);
    }
  }
  return result;
}
// 测试用例
const obj2 = {
  name: 'obj2', // 循环引用问题
};
obj2['obj2'] = obj2;
const newObj = deepClone(obj2);
console.log(newObj, 38);
