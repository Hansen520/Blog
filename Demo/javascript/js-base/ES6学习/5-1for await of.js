// // 1
// function Gen (time) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(function(){
//       resolve(time)
//     }, time)
//   })
// }

// async function test(){
//   let arr = [Gen(2000), Gen(1000), Gen(3000)];
//   for (let item of arr) {
//     // 就是先把函数都执行一遍，不管有没有出现结果
//     console.log(Date.now(), item.then(console.log))
//   }
// }
// test()

// 2
// function Gen (time) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () {
//       resolve(time)
//     }, time)
//   })
// }

// async function test () {
//   let arr = [Gen(2000), Gen(100), Gen(3000)]
//   for (let item of arr) {
//     console.log(Date.now(), await item.then(console.log))
//   }
// }

// test()

// 3 for await of
// function Gen(time) {
//   return new Promise((resolve, reject) => {
//     setTimeout(function(){
//       resolve(time)
//     }, time)
//   })
// }

// // 让程序能够按照顺序执行
// async function test() {
//   let arr = [Gen(1500), Gen(1000), Gen(3000)];
//   for await (let item of arr) {
//     console.log(Date.now(), item)
//   }
// }
// test()

// 4 自定义遍历器
let obj = {
  count: 0,
  Gen (time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          done: false,
          value: time
        })
      }, time)
    })
  },
  [Symbol.asyncIterator] () {
    let self = this
    return {
      next () {
        self.count++
        if (self.count < 10) {
          return self.Gen(Math.random() * 500)
        } else {
          return Promise.resolve({
            done: true,
            value: ''
          })
        }
      }
    }
  }
}

async function test () {
  for await (let item of obj) {
    console.log(Date.now(), '#321' + Math.floor(item).toString().padStart(3, '0'))
  }
}
test()

// （1）
// for of是用来做遍历的，await是用来做异步操作的
// for await of是解决异步集合的遍历

// （2）
// for of是解决同步问题的
// for await of是解决异步问题的

// （3）自定义遍历的异步遍历该如何操作
// 用Symbol.asyncIterator
