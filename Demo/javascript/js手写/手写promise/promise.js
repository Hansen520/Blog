// 调用node模块
const fs = require('fs');
let Promise = require('./myPromise2.js');
const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    // 走的异步逻辑
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) return reject(err); // 失败了调用reject
      resolve(data); // 成功调用resolve
    });
  });
};
// 将promise嵌套进行简化
// 1.如果promise中的then的回调(成功或失败), 返回一个普通值(不是promise， 也不是抛出异常错误), 会将结果传递到下一次then的 成功 回调中去
// 2.如果发生了异常，那么会把这个异常抛出到外层then的 失败 回调中去
// 3.如果返回的是一个promise，那么需要判断这个promise的状态。如果promise是成功，就继续将成功的结果传递到外层的成功，如果是失败就将promise传递给外层的失败
// 总结: 走第二个then时候， 只有抛出异常，或者返回一个失败的promise才会走失败，其他的都是成功
// let promise2 = readFile('./test/a.txt').then((data) => {
//   // throw new Error('!~~~~');
//   return 12345;
// });

// promise2.then(
//   (data) => {
//     console.log(data, 26);
//   },
//   (err) => {
//     console.log(err);
//   }
// );

// 1.promise为什么能.then.then.then() 返回的并不是this?
// 一个promise一旦成功了就不能失败，如果不停的返回this，状态就美办法扭转了，所以你有更好的办法么?

// 2. 如果x === promise2 就会typeError
// let p = new Promise((resolve, reject) => {
//   resolve();
// });
// let promise2 = p.then((data) => {
//   return promise2;
// });

// promise2.then(
//   () => {
//     console.log('成功');
//   },
//   (e) => {
//     console.log('失败', e);
//   }
// );

// 3. 如果取then的时候出错了就抛出异常, 因为有可能人家写的对象上定一个取then就出错的情况
// let promise2 = readFile('./test/a.txt').then((data) => {
//   // throw new Error('!~~~~');
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(
//         new Promise((resolve, reject) => {
//           setTimeout(() => {
//             resolve(500);
//           }, 1000);
//         })
//       );
//     }, 500);
//   });
// });

// promise2.then(
//   (data) => {
//     console.log(data, 64);
//   },
//   (err) => {
//     console.log(err);
//   }
// );

// 4. then方法中的回调可以忽略, 如果不是函数就会透传给下一个then
new Promise((resolve, reject) => {
  resolve(1000);
})
  .then(null, null) // 走2次发布订阅
  .then()
  .then((data) => {
    console.log(data);
  });
