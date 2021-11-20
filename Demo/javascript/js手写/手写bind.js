Function.prototype.myBind = function (context) {
  // const args = Array.prototype.slice.call(arguments, 1);
  const args = [...arguments].slice(1);

  // fn1.bind(...) 中的fn1
  const fn = this;
  // console.log(this)
  context = context || window;
  //返回一个函数, 因为他是不能立即执行的
  return function () {
    // console.log(this)// window， 简单吧
    return fn.apply(context, args);
  };
};

// function fn1(a, b, c){
//   console.log('this', this)
//   console.log(a, b, c)
//   return 'this is fn1'
// }

// const fn2 = fn1.myBind({x: 100}, 10, 20, 30)
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

let a = person.fullName.myBind(person1, 1);
// 需要执行
console.log(a());
