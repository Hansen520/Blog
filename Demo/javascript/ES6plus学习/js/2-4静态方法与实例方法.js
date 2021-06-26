// 1
// let Animal = function (type) {
//   this.type = type
// }

// // 动态方法
// Animal.prototype.walk = function(){
//   // 调用静态方法
//   Animal.eat()
//   console.log('I am walking')
// }

// // 静态方法
// Animal.eat = function (food) {
//   console.log(`I am eating`);
// }

//2
class Animal {
  constructor (type) {
    this.type = type
  }
  // 实例方法
  walk () {
    // 调用静态方法
    Animal.eat()
    console.log(`I am walking`)
  }
  // 静态方法
  static eat () {
    console.log(`I am eating`)
  }
}
let cat = new Animal('cat')
cat.walk()
cat.eat()