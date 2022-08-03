/*
  1. 判断两个对下个是否指向同一内存
  2. 使用Object.getOwnPropertyNames获取对象所有键名数组
  3. 判断两个对象的键名是否相等
  4. 遍历键名，判断键值是否都相等。
*/

function isObjectValueEqual(a, b) {
  // 1.判断两个对象是否指向同一内存，指向统一内存返回true
  if (a === b) {
    return true;
  }
  // 2.获取两个对象键值数组
  let aProps = Object.getOwnPropertyNames(a);
  let bProps = Object.getOwnPropertyNames(b);
  // 3.判断两个对象键值数组长度是否一致，不一致返回true
  if (aProps.length !== bProps.length) {
    return false;
  }
  // 4.遍历对象的键值
  for (let prop in a) {
    // 判断a的键值，在b中是否存在，不存在，返回false
    if (b.hasOwnProperty(prop)) {
      // 判断a的键值是否为对象，是则递归，不是对象直接判断键值是否相等，不相等返回false
      if (typeof a[prop] === 'object') {
        if (!isObjectValueEqual(a[prop], b[prop])) return false;
      } else if (a[prop] !== b[prop]) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
}
console.log(isObjectValueEqual({ a: 1, b: { c: 2 } }, { b: { c: 3 }, a: 1 }));
console.log(isObjectValueEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }));
