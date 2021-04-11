// 这里介绍一种新的写法
/*
  T extends new (...args: any[]) => any  
  1.(...args: any[]) => any  这是一个函数，返回一个对象，接收的参数是任意个
  2.new (...args: any[]) => any 任意类型组成的数组 new 代表这是一个构造函数
  3. T extends new (...args: any[]) => any  T可以理解为一个包含这个构造函数的类
*/
// function testDecorator<T extends new (...args: any[]) => {}>(constructor: T) {
//   return class extends constructor {
//     name = 'lee';
//     getName() {
//       return this.name;
//     }
//   }
// }

// class Test1 {
//   name: string;
//   constructor(name: string) {
//     this.name = name
//   }
// }

// const test1 = new Test1('dell');
// console.log(test1.getName())// Test1 { name: 'dell' }

// ------------------------------------------------------------------
function testDecorator() {
  return function <T extends new (...args: any[]) => {}>(constructor: T) {
    return class extends constructor{
      name = 'lee';
      getName() {
        return this.name
      }
    }
  }
}
/**
 * testDecorator() 返回一个装饰器，返回的装饰器去装饰 class 
 * 这个 class 就有了 getName 这个函数
 */
const Test1 = testDecorator()(class {
  name: string;
  constructor(name: string) {
    this.name = name
  }
})

const test1 = new Test1('han');
console.log(test1.getName())// 'lee'