// 只有引用类型可以使用instanceof
// 普通一写法, 就是去判断right是不是left上的原型对象
function myInstanceof1(left, right) {
  // 这里先用typeof来判断基础数据类型，如果是，直接返回false
  if (typeof left !== 'object' || left === null) {
    return false;
  }
  // obj.__proto__是获取obj对象的原型对象的非标准方法
  let _left = left.__proto__;
  while (true) {
    if (_left === null) {
      return false;
    }
    if (right.prototype === _left) {
      return true;
    }
    // 继续往上找
    _left = _left.__proto__;
  }
}
// 对照组普通组二写法
function myInstanceof2(left, right) {
  // 这里先用typeof来判断基础数据类型，如果是，直接返回false
  if (typeof left !== 'object' || left === null) {
    return false;
  }
  // getProtypeOf是Object对象自带的API，能够拿到参数的原型对象
  // Object.getPrototype(obj)是ES5中用来获取obj对象的原型对象的标准方法。
  let proto = Object.getPrototypeOf(left);
  // 循环往下寻找，直到找到相同的原型对象
  while (true) {
    if (proto === null) {
      return false;
    }
    // 找到相同原型对象，返回true
    if (proto === right.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
}

// 验证一下自己实现的myInstanceof是否OK
console.log(myInstanceof1(new Number(123), Number)); // true
console.log(myInstanceof1(123, Number)); // false
