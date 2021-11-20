// apply
Function.prototype.myApply = function (context) {
  // 判断调用对象是否为函数
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }

  let result = null;

  // 判断context是否存在，如果未传入则为window
  context = context || window;

  // 将函数设置未对象的方法
  context.fn = this;
  console.log(this, context.fn, 15);
  // 调用方法
  if (arguments[1]) {
    // 获取第二个参数数组里面的所有参数
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  // 属性删除
  delete context.fn();
  return result;
};

let person = {
  fullName: function (a) {
    // console.log(this)
    return this.firstName + ' ' + this.lastName + '-' + a;
  },
};
let person1 = {
  firstName: 'Bill',
  lastName: 'Gates',
};
// 参数许是数组
let a = person.fullName.myApply(person1, [1]);
console.log(a);
