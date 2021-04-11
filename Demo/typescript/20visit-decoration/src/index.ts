/**
 * 访问器装饰器的参数跟方法装饰器的参数是一样的
 * @param target  prototype
 * @param key function name
 * @param descriptor 描述符
 */
function visitDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  descriptor.configurable = false
}

class Test {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }
  @visitDecorator
  get name() {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }
}

const test = new Test('han');
test.name = 'dell han';
console.log(test.name)

