//1
// function fn(a, b, c){
//   b = b || 1;
//   c = c || 2;
//   return a + b + c
// }

//2
function fn(a, b, c){
  // b == null 相当于b === undefined || b === null
  b = b == null ? 2 : b
  c = c == null ? 3 : c
  return a + b + c
}
console.log(fn(3,undefined,10))
//3
//直接传入默认值
// function fn(a, b = 3, c =4){
//   return a + b + c
// }

//4
// 通过表达式传参
// function fn(a, b = 3, c = a + b + 2){
//   return a * 2 + c // 1 * 2 + 6
// }

//5
//es5获得参数个数
// function fn(a, b = 3, c =4){
//   console.log(arguments.length) //5 个实际参数个数
//   return a + b + c
// }

//6
// es6判断参数个数
// function fn(a, b = 2, c =4){
//   console.log(fn.length) //5 个实际参数个数
//   return a + b + c
// }

//7
//es5判断实际参数个数，与5做对比
// function sum () {
//   let num = 0
//   let count = 0
//   // Array.prototype.forEach.call(arguments, function (item) {
//   //   num += item * 1
//   //   count = count + 1
//   // })

//   Array.from(arguments).forEach(function (item) {
//       num += item * 1
//       count = count + 1
//     })

//   // console.log(arguments.length) //也可以获得参数个数
//   return '和' + num + '，实际参数个数' + count
// }

// console.log(sum(1, 2, 3))// 和6，实际参数个数3
// console.log(sum(1, 2, 3, 4))//和10，实际参数个数4


//8 ...
// function sum (...nums) {
//   let num = 0
//   console.log(nums)
//   nums.forEach(function(item){
//     num += item
//   })
//   // console.log(arguments.length) //也可以获得参数个数
//   return num
// }

// console.log(sum(1, 2, 3))// 6
// console.log(sum(1, 2, 3, 4))//10


//9
// function sum (base, ...nums) {
//   let num = 0
//   console.log(nums)
//   nums.forEach(function(item){
//     num += item
//   })
//   // console.log(arguments.length) //也可以获得参数个数
//   return num
// }

// console.log(sum(1, 2, 3))// 5
// console.log(sum(1, 2, 3, 4))//9
// test
// console.log(fn(1, undefined, 2, 4, 5))


//10 数组回到参数
// es5
// 假设data式后台传回来的数据
// let data = [4, 5 ,6]
// 求和
// function sum (x = 1, y = 1, z = 1){
//   return x + y + z
// }
// console.log(sum.apply(this, data)) //15

//es6
// console.log(sum(...data))