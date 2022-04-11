// 函数柯里化编程题

// 一个叠加的求和
const sumFn = (...args) => {
  return args.reduce((a, b) => {
    return a + b;
  });
};

// func = sumFn
var currying = function (func) {
  const args = [];
  // 用具体的名字result有利于递归
  return function result(...rest) {
    if (rest.length === 0) {
      return func(...args);
    } else {
      // 把参数全部传入args
      args.push(...rest);
      return result;
    }
  };
};

currying(sumFn)(1)(2)(3)(); // 6
currying(sumFn)(1, 2)(3, 4)(5)(); //15
currying(sumFn)(1)(2, 3, 4, 5)(6)(); //21

const sortFn = (...args) => {
  return args.sort((a, b) => a - b);
};
currying(sortFn)(1)(3)(2)(6, 4)(5)(); // [1, 2, 3, 4, 5, 6]

/*
  函数柯里化
  柯里化通常也称为部分求值，其含义是给函数分步传递参数，
  每次传递参数进行处理，并返回一个更具体的函数接收剩下的参数，
  这中间可嵌套多层这样的接收部分参数函数，直至返回最后的结果。
*/
function add(x) {
  return function (y) {
    return x + y;
  };
}
add(1)(2);
