// Promise 为了解决异步的编程问题
// Promise 有三个状态: 默认状态时等待态， 然后时成功态 失败态
// 早期IE不支持

// 1.promise 是一个类， 用的时候 就new这个类, promise 是立即执行的
// 2. promise中需要传入一个执行器executor
// 3. 如果调用resolve 会让状态变成成功态，调用reject 会让状态变成失败态
// 4. newPromise 会产生一个promise实例，promise实例拥有一个then方法，
// 第一个参数是成功的回调，第二个是失败的回调
// 5.promise的状态一旦发生了，就不会在发生变化了
// 成功有成功的原因value，失败有失败的原因reason
// 6. 如果new Promise中发生了异常也会执行失败态
// 如果出现异步逻辑，我们就采用发布订阅模式，缓存回调，发布时候依次执行
let Promise = require('../myPromise1');
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功');
  }, 1000);
});

p.then(
  (data) => {
    console.log(data, '成功');
  },
  (data) => {
    console.log(data, '失败');
  }
);
p.then(
  (data) => {
    console.log(data, '成功');
  },
  (data) => {
    console.log(data, '失败');
  }
);
