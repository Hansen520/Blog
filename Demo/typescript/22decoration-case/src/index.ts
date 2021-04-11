/*
  本例子采用工厂化装饰器的方式，让每个类里面添加try--catch 的方式
*/
const userInfo: any = undefined;

// 采用工厂模式
function catchError(msg: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value
    descriptor.value = function () {
      try {
        fn();
      } catch (e) {
        console.log(msg)
      }
    }
  }
}

class Test {
  @catchError('userInfo.name 不存在')
  getName() {
    return userInfo.name
  }
  getAge() {
    return userInfo.age
  }
  @catchError('userInfo.gender 不存在')
  getGender() {
    return userInfo.gender
  }
}

const test = new Test()
test.getName()
test.getGender()