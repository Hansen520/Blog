// 1async 函数显式返回的不是 Promise 的话，会自动包装成 Promise 对象
// async function first () {
//   return []
// }
// console.log(first() instanceof Promise)

// 2 async 与 await的配合使用
// async function first () {
//   let promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("Today is the first of newyear")
//     }, 1000);
//   })
//     // await等待只到promise返回值为止
//     let result = await promise
//     // 返回一个promise对象返回的值
//     return result

// }
// first().then(console.log)
// await 只能在 async 标记的函数内部使用，单独使用会触发 Syntax error。

// 例子2
async function first () {
  let promise = new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve('now it is done')
    }, 1000)
  })
  // 调用promise
  // 这种不是按顺序输出的
  // promise.then(val => {
  //   console.log(val)
  // })
  // 要想按照顺序输出，则用await，因为await等待直到promise返回值为止
  console.log(await promise)
  console.log(2)
  return Promise.resolve(3)
}

first().then(val => {
  console.log(val)
})
// await后面要跟一个promise对象，其他是不行的，如果是其他，则自动会返回promise对象
console.log('a', first())
