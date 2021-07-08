// 1.generator用法
/**
 *一般来说，我们是采用常规循环是做不到在循环时候暂停效果的，但是generator是可以的
 */
// 常规循环
// let array = [1, 2, 3, 4, 5]
// for (let i = 0; i < 5; i++) {
//   const element = array[i];
//   console.log(element)
// }

// 利用generator
// function * loop (){
//   for (let i = 0; i < 5; i++) {
//     yield console.log(i)
//   }
// }

// const l = loop()
// console.log(l.next())
// console.log(l.next())
// console.log(l.next())
// console.log(l.next())
// console.log(l.next())
// console.log(l.next())

// 2Basic Syntax
// function * gen (){
//   let val
//   // yield返回的是一个对象，其返回值是一个undefined
//   val = yield 1
//   console.log("1" + val)
//   val = yield 9
//   console.log("2" + val)
//   val = yield 3
//   console.log("3" + val)
// }

// let g = gen()
// console.log(g.next())
// console.log(g.next())
// console.log(g.next())
// console.log(g.next())

// 3其实 next 是可以接受参数的，这个参数可以让你在 Generator 外部给内部传递数据，而这个参数就是作为 yield 的返回值。
// 从 done 可以看出代码执行已经结束。
// function * gen () {
//   var val = 100
//   while (true) {
//     console.log(`before ${val}`)
//     val = yield val
//     console.log(`return ${val}`)
//   }
// }

// var g = gen()
// console.log(g.next(20))
// // before 100
// // 100
// console.log(g.next(30))
// // return 30
// // before 30
// // 30
// console.log(g.next(40))
// // return 40
// // before 40
// // 40

// 4return 也可以传入参数，作为返回的 value 值。
// function * gen () {
//   yield 1
//   yield 2
//   yield 3
// }
// let g = gen()
// console.log(g.next())
// console.log(g.return(100))
// console.log(g.next())

// 5也可以作为抛出异常 throw 方法在 Generator 外部控制内部执行的“终断”。
// function * gen () {
//   while (true) {
//     try {
//       yield 42
//     } catch (e) {
//       console.log(e.message)
//       return false
//     }
//   }
// }
// let g = gen()
// console.log(g.next())
// console.log(g.next())
// console.log(g.next())
// // 中断操作
// g.throw(new Error("break"))//报错退出
// console.log(g.next()) // {value: undefined, done: true}

// 6抽奖活动
// function * draw (first = 1, second = 3, third = 5) {
//   let firstPrize = ['1A', '1B', '1C', '1D', '1E', '1F', '1G', '1H', '1I', '1J', '1K', '1L', '1M', '1N']// 满足1000积分的名单
//   let secondPrize = ['2O', '2P', '2Q', '2R', '2S', '2T', '2U', '2V', '2W', '2X', '2Y', '2Z'] // 满足500积分的名单
//   let thirdPrize = ['31', '32', '33', '34', '35', '36', '37', '38', '39'] // 满足50积分的名单
//   let count = 0
//   let random
//   while (1) {
//     if (count < first) {
//       random = Math.floor(Math.random() * firstPrize.length)
//       yield firstPrize[random]
//       count = count + 1
//     } else if (count < first + second) {
//       random = Math.floor(Math.random() * secondPrize.length)
//       yield secondPrize[random]
//       count = count + 1
//       secondPrize.splice(random, 1)
//     } else if (count < first + second + third) {
//       random = Math.floor(Math.random() * thirdPrize.length)
//       yield thirdPrize[random]
//       count = count + 1
//       thirdPrize.splice(random, 1)
//     } else {
//       return false
//     }
//   }
// }
// // 设置一个按钮以便测试
// let oclick = document.getElementById("click")
// let l = draw()
// oclick.onclick = function() {
//   console.log(l.next().value)
// }

// 7小游戏 遇到3倍跳过
// function * count (x = 1) {
//   while (1) {
//     if (x % 3 !== 0) {
//       yield x
//     }
//     x++
//   }
// }
// let oclick = document.getElementById("click")
// let l = count()
// oclick.onclick = function() {
//   console.log(l.next().value)
// }

// 8斐波那契数列
// 1 1 2 3 5
// function * FibonacciSequence (num1 = 1, num2 = 1) {
//   console.log(num1)
//   console.log(num2)
//   while (true) {
//     let tem = num1 + num2
//     yield tem
//     num1 = num2
//     num2 = tem
//   }
// }

// // function * fn (x = 0, y = 1) {
// //   while (1) {
// //     yield x + y;
// //     [y, x] = [x, x + y]
// //   }
// // }

// let oclick = document.getElementById("click")
// let l = FibonacciSequence()

// oclick.onclick = function() {
//   console.log(l.next().value)
// }
