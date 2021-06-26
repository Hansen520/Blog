// let sWord1 = "Star Wars: Attack of the Clones";
// let starWarsRegex = /Star Wars.*/;
// console.log(starWarsRegex.test(sWord1)); //返回true

// 这部分还有很多不懂，等再学习万正则后再慢慢研究下
let str = `"foo" and "bar" and "baz"`

// function select (regExp, str) {
//   const matches = []
//   while (true) {
//     // exec找到则返回一个数组，否则返回null
//     const match = regExp.exec(str)
//     if (match === null) break
//     matches.push(match)
//   }
//   return matches
// }

// /*
// 正则的意思是,以"开头，并且要匹配多个"
// */
// console.log(select(/"([^"]*)"/g, str))

// 2
// function select (regExp, str) {
//   const matches = []
//   str.replace(regExp, function(all, first) {
//     matches.push(first)
//   })
//   return matches
// }
// console.log(select(/"([^"]*)"/g, str))

// 3 ES10的做法
function select (regExp, str) {
  const matches = []
  for (const match of str.matchAll(regExp)) {
    matches.push(match[1])
  }
  return matches
}
// 小括号里面代表捕获
console.log(select(/"([^"]*)"/g, str))
