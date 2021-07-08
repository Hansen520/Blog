// let arr = ['hello', 'world']
// for (let i = 0, item; i < arr.length; i++) {
//   item = arr[i]
//   console.log(item)
// }

// 2
// let user = { name: 's', surname: 't'}
// console.log(Object.entries(user))
// for (let [k, v] of Object.entries(user)) {
//   console.log(k, v)
// }

// 3
// let options = {
//   title: 'menu',
//   // width: 100,
//   height: 200
// }
// let { title: title1, width = 300, height} = options
// console.log(title1, width, height)

// 4
// [a,b] = [1,2]
// console.log(a)

let a = 3
let b = 4;
[a, b] = [b, a]
console.log(a, b)// 4 3

// function fn () {
//   return 'hello'
// }

// let [a, b, c, d, e] = fn()
// console.log(a, b, c, d, e)//h e l l o

// 5
// let [one, two, three, four, five] = new Set([1, 2, 3, 4, 5]);
// console.log(one, two, three, four, five)//1 2 3 4 5

// 6
// let user = {};
// [user.name, user.surname, user.sayHi] = "hello world heihei".split(' ');

// console.log(user.name, user.surname, user.sayHi);//hello world heihei

// 7
// let user = {
//   name: "John",
//   age: 30
// };

// console.log(Object.entries(user))
// // loop over keys-and-values
// for (let [key, value] of Object.entries(user)) {
//   console.log(`${key}:${value}`); // name:John, then age:30
// }
// let [p1, p2, ...rest] = ["浙江", "江苏", "福建", "广东", "山东"]
// console.log(p1)//浙江
// console.log(p2)//江苏
// console.log(rest)//["福建", "广东", "山东"]
// // 因为rest出来也是数组，我们也可以直接对rest去改变
// rest[0] = "湖南"
// rest[1] = "湖北"
// console.log(rest)//["湖南", "湖北", "山东"]

// 8
// let [name = "Hansen", surname="pipi"] = ["liwei"];
// console.log(name) // liwei(from array)
// console.log(surname)// pipi (default used)

// 9
// let options = {
//   title: "list",
//   privince: "浙江",
//   width: 100
// }
// let {title, width, privince} = options
// console.log(title, privince, width)//list 浙江 100
// let {title:title1, width:width1, privince:privince1} = options
// console.log(title1, privince1, width1)// list 浙江 100

// 10默认值
// let options1 = {
//   title: "Menu"
// }
// let {width = 200, height = 250, title} = options1
// console.log(width, height, title)

// 11rest 运算符
// let options = {
//   title: "list",
//   name: "zhangsan",
//   privince: "浙江",
//   width: 100
// }
// let {title, name, ...rest} = options
// console.log(title, name, rest)//list zhangsan {privince: "浙江", width: 100}

// 12嵌套对象
// let options = [{
//   privince: "浙江",
//   size: {
//     width: 3000,
//     height: 4000
//   },
//   cities: ['杭州','宁波', '温州'],
//   extra: true
// }, {
//   privince: "江苏",
//   size: {
//     width: 3000,
//     height: 4000
//   },
//   cities: ['南京', '无锡', '苏州'],
//   extra: true
// }]
// let {
//   privince,
//   size:{
//     width,
//     height
//   },
//   cities: [city1, city2, city3],
//   extra
// } = options
// 浙江 3000 4000 杭州 宁波 温州 true
// console.log(privince, width, height, city1, city2, city3, extra)

// 13for of解构赋值

// for (let {privince: privince1, cities: [city1, city2]} of options) {
//   console.log(`省：${privince1},城市1：${city1},城市2：${city2}`)
// }
// 省：浙江,城市1：杭州,城市2：宁波
// 省：江苏,城市1：南京,城市2：无锡
