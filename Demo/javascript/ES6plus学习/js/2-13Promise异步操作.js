// 1 Promise
// function loadScript (src) {
//   return new Promise((resolve, reject) => {
//     let script = document.createElement('script')
//     script.src = src
//     script.onload = () => resolve(src)
//     script.onerror = (err) => reject(err)
//     document.head.append(script)
//   })
// }

// loadScript("./1.js")
//   .then(console.log(loadScript("./2.js")))
//   .then(loadScript("./3.js"))

// promise工作原理
/**
   * 执行new promise对象时候会返回一个空状态:挂起pending状态,pending是初始状态，既不是成功，也不是失败,返回的结果是undefined
   * resolve和reject是改变状态结果的,resolve是将状态改成fulfilled状态(意味着操作成功完成),返回的结果是result
   * reject是将状态变成rejected状态,返回的结果是error
   *
   * 注意:状态是不可逆的
   */

// 2 then
/**
    * 1.只要是promise对象就支持Promise语法,就能用then
    * 2.then支持两个参数,两个参数onFulfilled,onFulfilled都是函数类型的,Promise.then(onFulfilled, onFulfilled),
    * 而且onFulfilled和onFulfilled对应Promise的resolve和reject两个方法,因为这两个方法返回两个不同的状态.
    * 3.如果then里面传的是非函数,就会返回一个空的Promise对象,这家就能保证调用then就一定能够返回一个then对象,这样子就能完全保证我们
    * 能够实用连续的then的链式调用.
    *
   */
// loadScript("./1.js")
//   .then(() => {
//     // 如果不加return则返回一个空的Promise对象,因为loadScript('./4.js')不是函数
//     // 如果加上return就是返回一个新的Promise实例去影响下一个then的状态
//     return loadScript('./42.js')
//   }, (err) => {
//     console.log(err)
//   })
//   .then(() => {
//     loadScript('./3.js')
//   }, (err) => {
//     console.log(err)
//   })

// then正规操作
// loadScript("./4.js").then((value) => {
//   console.log(value)
// }, (err) => {
//   console.log(err)
// })

// 3 resolve与reject
// 一般情况下我们都会使用 new Promise() 来创建 Promise 对象，但是除此之外我们也可以使用其他方法。
// 在这里，我们将会学习如何使用 Promise.resolve 和 Promise.reject 这两个方法。

// function cap (type) {
//   if(type){
//     return Promise.resolve(42)
//   } else {
//     return Promise.reject(new Error("出错了"))
//   }
// }

// cap(0).then((value) => {
//   console.log(value)
// }, (err) => {
//   console.log(err)
// })

// 4 Promise.prototype.catch()捕获异常是程序质量保障最基本的要求，可以使用 Promise 对象的 catch 方法来捕获异步操作过程中出现的任何异常。
// 就是说可以把所有的出错都放在catch里面统一返回
// 记得不要用 throw new Error去抛出错误，要用reject去抛出错误，让catch去捕获
// loadScript("./1.js")
//   .then(() => {
//     return loadScript('./42.js')
//   })
//   .then(() => {
//     loadScript('./3.js')
//   }).catch(err => {
//     console.log(err)
//   })

// 5 Promise.prototype.all()
/**
   *
   * Promise.all 生成并返回一个新的 Promise 对象，所以它可以使用 Promise 实例的所有方法。参数传递promise数组中所有的 Promise 对象都变为resolve的时候，该方法才会返回， 新创建的 Promise 则会使用这些 promise 的值。
   * 如果参数中的任何一个promise为reject的话，则整个Promise.all调用会立即终止，并返回一个reject的新的 Promise 对象。
   * 由于参数数组中的每个元素都是由 Promise.resolve 包装（wrap）的，所以Paomise.all 可以处理不同类型的 promose对象(并行)。
   * */
// const p1 = Promise.resolve(10)
// const p2 = Promise.resolve(20)
// const p3 = Promise.resolve(30)
// Promise.all([p1, p2, p3]).then((value) => {
//   console.log(value)
// })

// //6 Promise.race 生成并返回一个新的 Promise 对象。
// const fn1 = () => {
//   return new Promise((resolve, reject) =>{
//     setTimeout(()=>{
//       resolve(111)
//     },2000)
//   })
// }

// const fn2 = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() =>{
//       resolve(222)
//     }, 1000)
//   })
// }

// Promise.race([fn1(), fn2()]).then((value) => {
//   console.log(value)//222
// })

// function getUrl (url) {
//   return new Promise((resolve, reject) => {
//     let xml = new XMLHttpRequest()
//     xml.onreadystatechange = function () {
//       if (xml.ready === 4) {
//         if (xml.status === 200) {
//           resolve(JSON.parse(xml.responseText))
//         } else if (xml.status === 404) {
//           reject(new Error('错误信息404'))
//         }
//       }
//     }
//     xml.send(null)
//   })
// }

// const url = './jsonp.json'
// getUrl(url).then((res) => {
//   console.log(res)
// })
