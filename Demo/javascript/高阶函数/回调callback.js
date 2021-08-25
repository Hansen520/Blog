// 1.before方法是对原函数进行扩展
// 2.curring 方法 暂存变量
// 3.after函数 函数返回函数 会造成函数嵌套

// 解决异步问题(就是每次调用一个out就赋值一次， 当条件满足时候就回调出去)
const fs = require('fs');
// 类似于柯里化
const after = (times, callback) => {
  let obj = {};
  // out函数
  return (key, value) => {
    obj[key] = value;
    if (--times == 0) {
      callback(obj);
    }
  };
};
// 又用闭包
let out = after(2, (obj) => {
  console.log(obj);
});
fs.readFile('./test/a.txt', 'utf-8', function (err, data) {
  // obj.a = data;
  out('a', data);
});

fs.readFile('./test/b.txt', 'utf-8', function (err, data) {
  // obj.b = data;
  out('b', data);
});
