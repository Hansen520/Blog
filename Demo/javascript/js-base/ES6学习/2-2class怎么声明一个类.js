// 1
// let Animal = function (type) {
//   this.type = type
//   this.walk = function () {
//     console.log('I am walking')
//   }
// }

// let dog = new Animal('dog')
// let monkey = new Animal('monkey')
// console.log(dog)
// console.log(monkey)
// monkey.walk()

// 这个walk方法居然还能改，而且成功了，说明违背了继承的原则
// monkey.walk = function(){
//   console.log('猴子 walk')
// }
// monkey.walk()

// 2
// 把共有的方法写道Animal的原型链上去，而不是直接写在里面，看下面代码
// let Animal = function (type) {
//   this.type = type
// }

// 将共有的方法抽出来，将他挂在到原型链上去
// Animal.prototype.walk = function(){
//   console.log('I am walking')
// }

// let dog = new Animal('dog')
// let monkey = new Animal('monkey')
// console.log(dog)
// console.log(monkey)
// dog.walk()
// monkey.walk()

// 3
class Animal {
  constructor (type) {
    this.type = type
  }
  walk () {
    console.log('I am walking')
  }
}

let dog = new Animal('dog')
let monkey = new Animal('monkey')
console.log(dog)
console.log(monkey)
dog.walk()
monkey.walk()
