// 柯里化函数就是一个高阶函数, 反柯里化(让函数功能变大)

// 柯里化的含义就是让一个函数变得更具体一些(原则上返回的函数只能接收一个函数), 多个函数姑且也认为是柯里化
// 高阶函数中，包含柯里化函数(柯里化函数就是一个高阶函数)
// 偏函数: 返回一个函数，函数的擦书不止一个

// 1、判断一个数据的类型(定义二个参数)
function isType(type, value) {
  return Object.prototype.toString.call(value) === `[object ${type}]`;
}
// let isString = isType('String');
// let isNumber = isType('Number');

// console.log(isString('abc'));
// console.log(isNumber(123));
// 高阶函数可以暂存变量(因为有闭包)

// 通用的柯里化函数, 就是根据调用时候传递的参数和函数的参数做判断，如果
// 传递的参数和定义的参数一致就执行
const curring = (fn) => {
  // args存储用户调用的参数
  const inner = (...args) => {
    // 如果传递的参数个数大于等于定义的参数，就让原函数执行，如果不是就返回一个函数
    return args.length >= fn.length
      ? // 上面isType定义了2个参数，然后符合条件则执行
        fn(...args)
      : // ...args, ...arg 让下次也能扩展, 传给下一次的变量
        (...o) => inner(...args, ...o);
  };
  return inner;
};

let type = curring(isType);
let isString = type('String');
let isNumber = type('Number');
let isArray = type('Array');
console.log(isString('abc'));
console.log(isNumber(123));
console.log(isArray([]));

// fn.length 就是sum的个数， 柯里化是固定参数
// function sum(a, b, c, d, e) {
//   return a + b + c + d + e;
// }

// let newSum = curring(sum);

// let fn1 = newSum(1, 2);
// let fn2 = fn1(3, 4);
// let r = fn2(5);
// console.log(r);
