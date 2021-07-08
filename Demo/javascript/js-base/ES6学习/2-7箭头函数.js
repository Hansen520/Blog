// 1
// if(null == undefined){
//   console.log(true)
// }

// 2
// let data = [3, 1, 55, 9, 1, 5, 10, 100, 80, 75]
// let sort = data.sort((a, b) => a - b)
// console.log(sort)

// 3
let obj1 = {
  name: 'zhangsan',
  say : function(){
    console.log(this.name, this)
  }
}

let obj2 = {
  name: 'zhangsan',
  say : () => {
    console.log(this.name, this)
  }
}
obj1.say()
// 对应是上层作用域window
obj2.say()

// 4
let bbb = {
  bbb1: function(){
    setTimeout(function(){
      console.log(this)
    }, 5000)
  } 
}

let ccc = {
  ccc1: function(){
    setTimeout(() => {
      console.log(this)
      }, 500)
  } 
}
// // 5000mm后执行，this指向执行作用域setTimeout,所以为window
// bbb.bbb1()
// // 500mm后执行，this指向他的上一层作用域ccc1
// ccc.ccc1()

// 5
// 返回表示式
// let fn1 = (a, b) => a + b

// // 返回对象形式
// let fn2 = (a, b) => ({
//   a: a,
//   b: b
// })
// // 或
// // 返回对象形式,一般用这种方法，容易理解
// let fn2 = (a, b) => {
//   return {
//     a: a,
//     b: b
//   }
// }