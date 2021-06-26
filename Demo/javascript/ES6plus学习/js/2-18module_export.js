// 1 导出变量或者常量
// export const name = "hansne"
// export let time = "2019年12月29日23点48分"
// export var list = [5, 2, 0]

// 或
// const name = "hansne"
// let time = "2019年12月29日23点48分"
// var list = [5, 2, 0]

// export {
//   name,
//   time,
//   list
// }

// 2导出函数,被导出的模块是否能在本模块引用？是可以的
// export function say (content) {
//   console.log(content)
// }
// export function run () {
//   say("aa")
// }
// 或
// let sayHi = function  (content) {
//   console.log(content)
// }
// let fn = function () {
//   console.log("我是一个函数")
// }
// export {
//   sayHi,
//   fn
// }

// 3导出对象,这种只能导出一个对象
// export default{
//   code: 0,
//   message: "success"
// }

// 或
// 导出多个对象
// let data = {
//   code: 1,
//   message: "error"
// }
// let res = {
//   code: 2,
//   message: "error2"
// }
// export default{
//   data,
//   res
// }

// 4导出类
// class Test {
//   constructor () {
//     this.id = 2
//   }
// }
// export {
//   Test
// }
// 或也是可以的，如果是export default class也是可以的，那么前面import就可以不用写花括号了
// export class Test {
//   constructor () {
//     this.id = 2
//   }
// }

// 5如果说导出多个模块，import可以用*
// const name = 'hello'
// let addr = 'wenzhou City'
// var list = [1, 2 , 3]
// export {
//   name as cname,
//   addr,
//   list
// }

/*
  总结
  1.export defalut只能拥有一个，然后import用什么名字都是可以的,可以自定义
  2.如果是export导出的东西，那么import导入的东西必须与export导出的一致
  3.export导出的东西，在import里面必需用花括号去括
  4.export defalut导出的，import不需要花括号
*/
