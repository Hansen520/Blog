// 调用node模块
const fs = require('fs');
let Promise = require('./myPromise3.js');
const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    // 走的异步逻辑
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) return reject(err); // 失败了调用reject
      resolve(data); // 成功调用resolve
    });
  });
};

// all静态方法 全部成功就成功，有任何一个失败就失败了
// Promise.all([
//   1,
//   2,
//   3,
//   readFile('./test/a.txt'),
//   readFile('./test/a.txt'),
//   false,
//   4,
//   5,
// ]).then((data) => {
//   console.log(data);
// });

/*---finally 最终的  es9 node 11版本是支持的 catch---*/
// let p = new Promise((resolve, reject) => {
//   reject(1000);
// });

// 返回的是一个promise实例， 无论成功失败都执行
// p.finally(() => {
//   console.log('最终的');
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve();
//     }, 1000);
//   });
// }).catch((e) => {
//   console.log(e, 35);
// });

/*--------resolve--- catch-------------*/
// 1 如果resolve放的是普通纸会将这个值包装成promise
// 2 如果放的是promise 会等待这个promise执行完之后再继续resolve
// Promise.resolve(1).then((data) => {
//   // console.log(data);
// });

// // 1.catch 其实是 then(undefined, () => {}) 的语法糖
// new Promise((resolve, reject) => {
//   reject(1);
// }).catch((err) => {
//   console.log('catch' + err);
// });

/*---------Promise.race-----------*/
// 1. 一个数组中谁先返回结果就执行谁的
readFile('./test/a.txt');

var p = Promise.race([readFile('./test/a.txt'), Promise.resolve(63)]);
p.then((value) => {
  console.log(value); // 35
});
