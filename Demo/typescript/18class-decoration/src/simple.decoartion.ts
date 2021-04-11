// 类的装饰器
// 装饰器本身是一个函数
// 类装饰器接受的参数是构造函数
// 装饰器通过 @ 符号来使用

// function testDecorator(constructor: any) {
//   constructor.prototype.getName = () => {
//     console.log('han')
//   }
//   console.log('decorator')
// }

// // 装饰器可以写多个
// function testDecorator1(constructor: any) {
//   console.log('decprator1')
// }
// /**
// * 装饰器通过 @ 符号来使用
// * 如果报错，不支持使用，打开 tsconfig.json 这两个配置项
// * experimentalDecorators，emitDecoratorMetadata
// *
// * 多个装饰器的时候，执行的时候是从下到上，从右到左
// */
// @testDecorator @testDecorator1
// class Test { }

// const test = new Test();
// (test as any).getName();

// -------------------------------------------------------------------
// 有的时候我希望去使用 testDecorator 对类装饰，有的时候不希望对类装饰
function testDecorator2(flag: boolean) {
  if (flag) {
    return function (constructor: any) {
      constructor.prototype.getName = () => {
        console.log('han');
      }
    }
  } else {
    return function (constructor: any) {}
  }
}

// 执行下这个函数，跟上面不包含的效果是一样的,
// 这里如果传false会出现test.getName is not a function的错误
@testDecorator2(true)
class Test{ }

const test = new Test();
(test as any).getName();