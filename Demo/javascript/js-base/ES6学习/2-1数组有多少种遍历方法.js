// let arr = [1, 2, 3, 4, 5, 6]
// for (let i = 0, length = arr.length; i < length; i++) {
//   if (arr[i] === 2) {
//     continue
//   }
//   if (arr[i] === 5) {
//     break
//   }
//   // console.log(i, arr[i])
// }

// // forEach
// arr.forEach(function (item) {
//   // if(item === 2){
//   // forEach不能使用continue和break
//   //   continue
//   // }
//   // 原本 false的出现是跳出函数体的，但是，这里的false却是和continue相似，这是不是让你大跌眼镜
//   if (item === 2) {
//     // continue
//     return false
//   } else {
//     // console.log(item)
//   }
// })
// function isBigEnough (element, index, array) {
//   return element >= 10
// }
// // console.log(arr.every(isBigEnough))

// // console.log('---------------------------')
// // every
// // every需要你写返回值的,every默认返回的是false
// arr.every(function (item) {
//   if (item === 4) {
//     // return false相当于break
//     // 如果不做处理，这里不写任何代码，相当于continue
//   } else {
//     // console.log(item)
//   }
//   return true
// })
// arr.a = 11
// for (let index in arr) {
//   if (Number(index) === 2) {
//     // console.log(typeof index)
//     continue
//   }
//   // console.log(index, arr[index])
// }
// // let newarr = arr.filter(function (item) {
// //   return item > 3
// // })
// // // console.log(newarr)

// // for (let value of arr) {
// //   // console.log(value)
// // }

// // array.from
// // let arrayLike = {
// //   0: 'Hansen',
// //   1: '25',
// //   2: '男',
// //   3: ['wenzhou','hangzhou','ningbo'],
// //   'length': 4
// // }
// // let arr = Array.from(arrayLike)
// // console.log(arr) // ['Hansen','25','男',['wenzhou','hangzhou','ningbo']]

// // let arr1 = Array.from({ length: 5 }, function () { return 1 })
// // console.log(arr1)

// // let arr1 = arr
// // arr1.push(1,2)
// // console.log(arr)

// // let arr1 = Array(6, 7, 9)
// // console.log(arr1)
// // let arr2 = Array.of(6, 7, 9)
// // console.log(arr2)

// // let arr3 = Array(6).fill(100)
// // console.log(arr3)

// // let arr5 = [4, 10, 2, 30, 1]
// // let test1 =  arr5.some(function(item){
// //   return item > 29
// // })
// // console.log(test1) // true

// // let arr4 = [1, 2, 3, 4, 5]
// // arr4.fill(100, 1, 3)
// // console.log(arr4)

// // let test2 =  arr.find(function(item){
// //   return item > 4
// // })
// // console.log(test2) // 5

// // let arr6 = [4, 6, 7, 22, 4, 6]
// // let newContent = arr6.findIndex(function (item) {
// //   return item > 10
// // })
// // console.log(newContent) // 3
