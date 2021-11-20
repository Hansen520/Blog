// 创建一个新的对象
// 继承父类原型上的方法.
// 添加父类的属性到新的对象上并初始化. 保存方法的执行结果.
// 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象。

function _new(ctor, ...args) {
  if (typeof ctor !== 'function') {
    throw 'ctor must be a function';
  }
  // 创建一个新的对象
  let obj = new Object();
  // 继承父类原型上的方法
  obj.__proto__ = Object.create(ctor.prototype);
  console.log(obj.__proto__, 14);
  // 添加父类的属性到新的对象上并初始化. 保存方法的执行结果.
  let res = ctor.apply(obj, [...args]); // 好好理解, 相当于在指向obj，在ctor里面放属性
  console.log(ctor, obj, 16);
  let isObject = typeof res === 'object' && res !== null;
  let isFunction = typeof res === 'function';
  // 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象。
  return isObject || isFunction ? res : obj;
}

function Person(firtName, lastName) {
  // this 指向上面的obj
  this.firtName = firtName;
  this.lastName = lastName;
  // 相当于 obj.firstName = firstName
}

const tb = new Person('Chen', 'Tianbao');
console.log(tb);

const tb2 = _new(Person, 'Chen', 'Tianbao');
console.log(tb2);

// 这里模拟一个思考, 大概就是下面这个意思
// let a = {
//   name: 'jack',
//   b: function (firstname, lastName) {
//     console.log(this.name);
//     this.firstname = firstname;
//     this.lastName = lastName;
//   },
// };
// let b = {
//   name: 'wangbo',
// };
// a.b.apply(b, ['成熟', '成长']);
// console.log(b, 50);
