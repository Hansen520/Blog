/**
 * 装饰器永远是个方法，方法的装饰器，里面的三个参数是规定好的
 * 
 * @param target 普通方法 target 对应的是类的 prototype
 *               静态方法 target 对应的是类的构造函数
 * 
 * @param key 装饰方法的名字
 * 
 * @param descriptor
 */

function getNameDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  // 禁止对属性进行重写
  descriptor.writable = false
}

class Test2 {
  name: string;
  constructor(name: string) {
    this.name = name
  }
  // 方法装饰器(在装饰器里面的操会影响属性)
  @getNameDecorator
  getName() {
    return this.name
  }
}

const test = new Test2('del');
// 这里对 getName 做了修改，打印出 123
// test.getName =  () => {
//   return '123'
// }
// console.log( test.getName() );
// 如果想不允许对这个 getName 做修改，就可以在装饰器里面进行修饰, writable 改成 false 就不能改了

test.getName =  () => {
  return '123'
}
console.log(test.getName());
// 这个时候会报错，将writable改成 true ，则不会报错