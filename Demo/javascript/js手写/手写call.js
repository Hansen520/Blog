// call实现
Function.prototype.myCall = function (context) {
  // 判断调用对象
  if (typeof this !== 'function') {
    console.log('type error');
  }

  // 获取参数, 获取参数1后面的所有参数
  let args = [...arguments].slice(1);
  let result = null;

  // 判断context是否传入，没有则是window
  context = context || window;

  // 将调用函数设置为对象的方法
  // 就是多一个fn属性
  context.fn = this;
  // 调用函数,并把参数传入函数
  result = context.fn(...args);
  /*
    // 这个就是原理
    {
      firstName: "Bill"
      fn: ƒ (a)
      lastName: "Gates"
    }
  */
  // console.log(context)
  // 删除这个本身无多大作用
  delete context.fn;
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

let a = person.fullName.myCall(person1, 1);
console.log(a);
