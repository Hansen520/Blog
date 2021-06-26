// 这个就是自己把数据做一个集合发出去
// 数据
let authors = {
  allAuthors: {
    fiction: [
      'Agatha Christie',
      'J. K. Rowling',
      'Dr. Seuss'
    ],
    scienceFiction: [
      'Neal Stephenson',
      'Arthur Clarke',
      'Isaac Asimov',
      'Robert Heinlein'
    ],
    fantasy: [
      'J. R. R. Tolkien',
      'J. K. Rowling1',
      'Terry Pratchett'
    ]
  }
}
// ES5的做法
// let r = [];
// for (let key in authors.allAuthors) {
//   r = r.concat(authors.allAuthors[key])

// }
// console.log(r)

// ES6的做法
// Iterator接口
// authors[Symbol.iterator] = function () {
//   let allAuthors = this.allAuthors
//   // 拿到所以的key,就是上面的fiction、scienceFiction、fantasy,以数据形式返回
//   let keys = Reflect.ownKeys(allAuthors)
//   // [fiction、scienceFiction、fantasy]
//   // console.log(keys)
//   // 通过next往里面存值
//   let value = []
//   return {
//     next () {
//       if (!value.length) {
//         if (keys.length) {
//           // 将数据存入value,keys是个数组
//           value = allAuthors[keys[0]]
//           // console.log(value)
//           // 并且删除这个数据,因为上面总是以keys[0]去获取数据的
//           // console.log("be",keys)
//           keys.shift()
//           // console.log("af",keys)
//         }
//       }
//       return {
//         // 因为只有false循环才能继续
//         done: !value.length,
//         // 返回一个个值出去的iterator可遍历对象
//         value: value.shift()
//       }
//     }
//   }
// }

// 2
// 熟悉了 Generator 之后，发现它是天然满足可迭代协议的。上述的代码我们可以用 Generator 来实现,因为generator默认有next()方法：
// 这种方法更适合编程思想，但是不是特别理解，所以自己理解哪一个用哪一个，不用特别纠结
// authors[Symbol.iterator] = function * () {
//   let allAuthors = this.allAuthors
//   let keys = Reflect.ownKeys(allAuthors)
//   let values = []
//   while (1) {
//     // 判断value是否为空
//     if (!values.length) {
//       if (keys.length) {
//         values = allAuthors[keys[0]]
//         keys.shift()
//         yield values.shift()
//       } else {
//         return false
//       }
//     } else {
//       // 就是一个一个返回数据移到到iterator到外面去的
//       yield values.shift()
//     }
//   }
// }

// let r = []
// // authors现在就是一个可以迭代的遍历
// for (let value of authors) {
//   console.log(value)
//   r.push(value)
//   // console.log(authors.allAuthors.scienceFiction)
// }
// console.log(r)

// 3
// let arr = [1,2,3]
// console.log(arr.shift())

var myIterable = {}
let arr = ['q', 'p', 'r']
myIterable[Symbol.iterator] = function * () {
  yield arr.shift()
  yield arr.shift()
  yield arr.shift()
}
console.log([...myIterable]) // ["q", "p", "r"]
