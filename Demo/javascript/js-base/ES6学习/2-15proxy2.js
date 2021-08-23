// 链式操作
var pipe = function (value) {
  // 3
  var funcStack = [];
  var oproxy = new Proxy(
    {},
    {
      get(pipeObject, fnName) {
        console.log(fnName);
        if (fnName === 'get') {
          // 对里面函数遍历，类似返回this的操纵
          return funcStack.reduce(function (val, fn) {
            return fn(val);
          }, value);
        }
        funcStack.push(window[fnName]);
        return oproxy;
      },
    }
  );
  return oproxy;
};

var double = (n) => n * 2;
var pow = (n) => n * n;
var reverseInt = (n) => n.toString().split('').reverse().join('') | 0;

console.log(pipe(3).double.pow.reverseInt.get); // 63
