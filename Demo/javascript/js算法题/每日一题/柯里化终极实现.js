/*
  函数柯里化
  const foo = function(...args) {}

  foo(1, 2, 3) == 6; // true
  foo(1)(2, 3) == 6; // true
  foo(1)(2)(3)(4) == 10; // true
*/

function argsSum(args) {
  return args.reduce((pre, cur) => {
    return pre + cur;
  }, 0);
}

const foo = (...args1) => {
  const sum1 = argsSum(args1);
  const fn = (...args2) => {
    const sum2 = argsSum(args2);
    return foo(sum1 + sum2);
  };
  // 核心内容, 重写了一个方法的 toString 方法，然后如果这个方法当字符串用，那么就会执用方法上的 toString 方法，并返回结果，然后再作处理...
  // 当然，如果执行这个函数，还是能执行的，这时与 toString 就没啥关系了。
  fn.toString = () => {
    return sum1;
  };
  return fn;
};
// 测试
foo(1, 2, 3) == 6; // true
foo(1)(2, 3) == 6; // true
foo(1)(2)(3)(4) == 10; // true
