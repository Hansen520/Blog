// Proxy 是充当中介的作用，就是中间人！
// let p = new Proxy(target, handler)
// target就是说要代理谁

// 1proxy basic syntax(代理功能)
// let obj = {
//   name: "lisan",
//   price: 130
// }

// // // obj为代理的对象
// let d = new Proxy(obj, {
//   // target 相当于obj，相当于深拷贝一份给target
//   get(target, key) {
//     if(key === "price") {
//       return target[key] + 20
//     } else {
//       return target[key]
//     }
//   }
// })

// console.log(obj.price)
// console.log(d.price)

// 2场景一 从服务器获取的数据只读，不可以写
// let obj = {
//   name: 'lisan',
//   info: {
//     age: 20
//   },
//   price: 130
// }
// //ES6的做法
// let d =  new Proxy(obj, {
//   get(target, key) {
//     return target[key]
//   },
//   set(target, key, value){
//     // target[key] = 300
//     // 拦截赋值操作，保证不会被修改
//     return false
//   }
// })

// d.price = 300
// // 被拦截了,但是只能拦截一层对象，如果对象里面嵌套了对象，如果还想用proxy必需深度递归才行
// console.log(d.price, d.name)

// ES5的做法
// for (let [key] of Object.entries(obj)) {
//   Object.defineProperty(obj, key, {
//     writable: false
//   })
// }
// obj.price = 300
// // 同理ES5要做完全拦截也要做深度递归才行
// obj.info.age = 33
// console.log(obj.price, obj.info.age, obj.name)
// //说明： ES5和ES6虽然都可以拦截写入操作，但是ES6的代理做法是中介还可以在set去写入，但是ES5就不行了
// //所以，本人推荐还是选择ES6的代理为佳

// 场景二
/*
对于数据交互而言，校验是不可或缺的一个环境，
传统的做法是将校验写在了业务逻辑里，
导致代码耦合度较高。
如果大家使用 Proxy 就可以将代码设计的非常灵活。
*/

// class Component {
//   constructor () {
//     // 还是被改了
//     // this.proxy = Math.random().toString(36).slice(-8)

//       this.proxy = new Proxy({
//         id : Math.random().toString(36).slice(-8)
//       }, {})
//   }
//   get id () {
//     return this.proxy
//   }
// }

// let com = new Component()
// com2 = new Component()
// for (let i = 0; i < 10; i++) {
//   console.log(com.id, com2.id)
// }
// com.id = "abds"

// console.log(com.id, com2.id)
