// 方法 Object.fromEntries() 把键值对列表转换为一个对象，这个方法是和 Object.entries() 相对的。
// let arr = [['name', 'zhansgan'],['age', 24]]
// console.log(Object.fromEntries(arr));

// 有时候我们可以先把对象变成数组，然后筛选过滤，最后再转化为对象
// let score = {
//   lisan: 86,
//   lisi: 68,
//   wuwu: 98,
//   xiamen: 87.5,
//   xiaoli: 95.5
// }
// // filter主要是过滤符合条件的数组，并返回数组
// // map主要是对符合条件的数组进行操作，并返回数组
// // 先转为数组
// let sp = Object.entries(score).filter(([key, value]) => {
//   return value > 90
// })
// // 再将数组转化为对象
// console.log(Object.fromEntries(sp))

// 练习一：自己如何给Array实现一个Flat函数
// function flatFn (arr, depty) {
//   return arr.flat(depty)
// }
// let newArr = [3, 4, [5, 6, [7, 8]]]
// console.log(flatFn(newArr, 2))

// 练习二：利用Object.fromEntries把url的search部分返回一个object?

var r = window.location.search.substr(1).split('&')
let den = r.map((item) => {
  return item.split('=')
})
console.log(Object.fromEntries(den))
