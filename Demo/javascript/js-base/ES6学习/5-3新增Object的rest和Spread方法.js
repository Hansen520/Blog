// 1这块代码展示了 spread 语法，可以把 input 对象的数据都拓展到 output 对象，这个功能很实用。
// const input = {
//   a : 1,
//   b : {
//     c : 2,
//     d : 3
//   },
//   f :true
// }

// const output = {
//   ...input,
//   m : 10
// }
// console.log(output)

// 2Object rest 的示例：
// 当对象 key-value 不确定的时候，把必选的 key 赋值给变量，用一个变量收敛其他可选的 key 数据，这在之前是做不到的。
const input = {
  a: 1,
  b: {
    c: 2,
    d: 3
  },
  f: true
}
let { a, ...rest } = input
console.log(a, rest)
