import 'reflect-metadata'

const user = {
  name: 'dell'
}

// 一、最基础的存储获取值的方式：存储一个 data:lisi 的值到 user
Reflect.defineMetadata('data', 'lisi', user);
// 这样存储的源数据打印是看不到的，需要使用下面这种方式
// console.log(user);
// 从user这个对象里面拿data这个数据，打印出 lisi
console.log(Reflect.getMetadata('data', user)) // lisi

// 二、存储类的键值对
// 在类上面定义一个data:zhangsan的值
@Reflect.metadata('data', 'zhangsan')
class User {
  name = '12345'
}
// 获取User下面属性data的值
console.log(Reflect.getMetadata('data', User))// zhangsan

// 三、存储类的属性方法里面的值
class User1 {
  @Reflect.metadata('data', 'zhaowu')
  getName() {}
}
console.log(Reflect.getMetadata('data', User1.prototype, 'getName'))// zhaowu