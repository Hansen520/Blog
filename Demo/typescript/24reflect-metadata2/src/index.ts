import 'reflect-metadata'

// 使用类的装饰器获取源数据，对应@Reflect.metadata('data', 'name')
function showData(target: typeof User) {
  for (let key in target.prototype) {
    // params： 'data', User, 对应的方法名
    const data = Reflect.getMetadata('data', target.prototype, key)
    // console.log(data)// namesex
  }
}
// 采用属性装饰器方式
function setData(dataKey: string, msg: string) {
  return function (target: User, key: string) {
    // params target-> User, key-> getAge 
    Reflect.defineMetadata(dataKey, msg, target, key);
    console.log(target, key)
  }
}

@showData
class User {
  @Reflect.metadata('data', 'name')
  getName() { }

  @Reflect.metadata('data', 'sex')
  getSex() { }

  // 和上面@Reflect.metadata('data', 'sex')作用是一样的, 只不过更加灵活
  @setData('data', 'age') 
  getAge() { }
}
