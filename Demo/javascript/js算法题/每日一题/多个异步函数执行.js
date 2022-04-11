/*
  多个异步函数如何同步执行
  要求:
    异步函数之间有关联关系
    前一个异步函数的树池作为后一个异步函数的输入
*/
const add = (x) => x + 5;
const multiply = (x) => x * 5;
const subtraction = (x) => x - 5;
const division = (x) => x / 5;

// 同步的办法
const pipeFunctions = (...fns) => {
  // 求最后结果
  return fns.reduce((preFn, curFn) => {
    // return 为最外层的return
    return (...args) => {
      // 执行每一个函数, 将结果传入下一个函数
      const res = preFn(...args);
      return curFn(res);
    };
  });
};
pipeFunctions(
  add, // 10
  multiply, // 50
  subtraction, // 45
  division // 9
)(5); // 9
// console.log(targetFn(5));

// 异步的办法
const asyncFn = (v) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(v);
    }, Math.random() * 1000);
  });
};

const add2 = async (x) => await asyncFn(x + 5);
const multiply2 = async (x) => await asyncFn(x * 5);
const subtraction2 = async (x) => await asyncFn(x - 5);
const division2 = async (x) => await asyncFn(x / 5);

const pipeFunctions2 = (...fns) => {
  return fns.reduce((preFn, curFn) => {
    // 执行targetFn2(5)
    return async (...args) => {
      const res = await preFn(...args);
      return curFn(res);
    };
  });
};

const targetFn2 = pipeFunctions2(add2, multiply2, subtraction2, division2);

targetFn2(5).then((res) => {
  console.log(res);
});
