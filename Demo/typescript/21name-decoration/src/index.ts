/**
 * 属性装饰器只能接收到两个参数
 * @param target Test 对应的 prototype
 * @param key  属性名字
 */
// 这里必需要有any返回
function nameDecorator(target: any, key: string): any {
  // 这样子可以防止属性被修改
  const descriptor: PropertyDescriptor = {
    writable: false
  }
  return descriptor;
}

class Test {
  // 属性选择器
  @nameDecorator
  name = '1111'
}

const test = new Test();

// 本身是可以对属性进行修改的
test.name = '12345';
console.log(test.name);// 12345

// 在装饰器里面加以修饰就可以改变这个局面
test.name = '8908'
console.log(test.name); // 报错不允许修改