let grade = {
  lisan: 86,
  zhaosi: 95,
  wangwu: {
    age: '15',
    sex: true
  }
}

// // 首先 grade不是一个Iterator可迭代的对象
// // Object.values就是把grade对象的 “键值” 变成可以迭代(Iterator)的对象
// console.log(Object.values(grade))// [86, 95]
// // Object.keys就是把grade的键变成一个可迭代的对象
// console.log(Object.keys(grade)) // ["lisan", "zhaosi"]

// //上面两种的组合就是Object.entries
// // 下面这种就是将每一个 “键和值的数组” 组成一个数组，变成变成一个可迭代的对象
// console.log(Object.entries(grade))
// // 0: (2) ["lisan", 86]
// // 1: (2) ["zhaosi", 95]

// //以上三种变成可迭代对象后就可以使用 for...of进行遍历了
// for(let [k, v] of Object.entries(grade)){
//   console.log(k, v)
// }

// 这样子也是可以遍历对象
for (let [i, k] of Object.entries(grade)) {
  if (i === 'wangwu') {
    console.log(k.age)
  }
}
// lisan 86
// zhaosi 95
// wangwu {age: "15", sex: true}
