// Reflect.apply(target, thisArg, args)
// Reflect.construct(target, args)
// Reflect.get(target, name, receiver)
// Reflect.set(target, name, value, receiver)
// Reflect.defineProperty(target, name, desc)
// Reflect.deleteProperty(target, name)
// Reflect.has(target, name)
// Reflect.ownKeys(target)
// Reflect.isExtensible(target)
// Reflect.preventExtensions(target)
// Reflect.getOwnPropertyDescriptor(target, name)
// Reflect.getPrototypeOf(target)
// Reflect.setPrototypeOf(target, prototype)

// 1反射机制 Reflect不是一个函数对象，因此它是不可构造的。Reflect.apply(target, thisArg, args)
// 原来apply是指定作用域再调用参数 ，而Reflect就是先用apply再去指定哪个函数
// let floor = Reflect.apply(Math.floor, undefined, [2.22])
// console.log(floor)

// let fromCharCode = Reflect.apply(String.fromCharCode, undefined, [104, 101, 108, 108, 111])
// console.log(String.fromCharCode(104, 101, 108, 108, 111))

// let charAt1 = Reflect.apply(''.charAt, "ponies", [3])
// let charAt2 = Reflect.apply(String.prototype.charAt, "ponies", [3])
// console.log(charAt2)

// let price = 92.5
// console.log(Reflect.apply(price >100 ? Math.floor : Math.ceil, null, [price]))

// 2Reflect.construct() 方法的行为有点像 new 操作符 构造函数 ， 相当于运行 new target(…args).
// let d = new Date()
// d.getTime()

// let d1 = Reflect.construct(Date, [2066, 2, 6])
// let d2 = Reflect.construct(Date, [])
// console.log(d1.getFullYear())
// console.log(d2 instanceof Date)

// 自己造个
// class test1 {
//   constructor(name, age){
//     this.name = name
//     this.age = age
//   }
//   sayHi () {
//     console.log("say1")
//   }
// }
// class test2 extends test1 {
//   constructor(name, age, sex){
//     super(name, age)
//     this.sex = sex
//   }
//   sayHi2 () {
//     console.log("say2")
//   }
// }
// let greet = Reflect.construct(test2, ["zhangsan", 18, "nan"])
// console.log(greet.name)
// console.log(greet instanceof test1)

// 3 Reflect.defineProperty() 这个要适应去用它，因为w3c有这个标准了
// const student = {}
// const r = Reflect.defineProperty(student, 'name', {value: 'Mick'})
// console.log(student, r)

// 4 Reflect.deleteProperty(target, propertyKey)
// 这对直接删除某一个数组值，某一个对象值挺管用的
// var obj = { x: 2, y: 4 }
// Reflect.deleteProperty(obj, "y") // true
// console.log(obj)//{x: 2}

// var arr = [1, 2, 3, 4, 5]
// Reflect.deleteProperty(arr, '3')
// console.log(arr)

// 如果属性不存在，返回 true
// console.log(Reflect.deleteProperty({}, "foo"))

// 如果属性被冻结，则返回false
// let obj = {
//   name: 'sangsan'
// }

// let Reflect_freeze =  Reflect.deleteProperty(Object.freeze(obj), "name")
// console.log(Reflect_freeze)

// 5 Reflect.get()方法的工作方式，就像从 object (target[propertyKey]) 中获取属性，但它是作为一个函数执行的。
// const obj = {x: 1, y: 2}
// console.log(Reflect.get(obj,  'x'))// 1
// // 2代表索引值
// console.log(Reflect.get([1, 5, 3], 2))//3

// 6 属性描述符 Reflect.getOwnPropertyDescriptor(obj, x)
// const obj = {x: 1, y: 2}
// console.log(Reflect.getOwnPropertyDescriptor(obj, 'x'))
// {value: 1, writable: true, enumerable: true, configurable: true}
// 数值为1，可以写，可以枚举的，可配置的;

// 7查看实例对象原型链上的所有方法Reflect.getPrototypeOf()
// let date = new Date()
// console.log(Reflect.getPrototypeOf(date))
// let array = new Array()
// console.log(Reflect.getPrototypeOf(array))
// let string = new String()
// console.log(Reflect.getPrototypeOf(string))

// 8Reflect.has()用于检查一个对象是否拥有某个属性
// const obj = {x: 1, y: 2}
// console.log(Reflect.has(obj, 'x'))

// 9Reflect.isExtensible(obj)是否可以扩展
// const obj = {x: 1, y: 2}
// obj.z = 3
// console.log(Reflect.isExtensible(obj))// true可以拓展
// console.log(obj)
// //让其不可以扩展，冻结
// Object.freeze(obj)
// console.log(Reflect.isExtensible(obj))// false不可以扩展
// obj.n = 4// 因为冻结了，所以增加删减是不行的
// console.log(obj)

// 10 判断是否为自身的属性，而不是原型链上的属性
// const obj = {x: 1, y: 2}
// // 返回以数组的形式返回键值
// console.log(Reflect.ownKeys(obj))//["x", "y"]
// console.log(Reflect.ownKeys([1, 2, 3]))//["0", "1", "2", "length"]

// 11
// Symbol几乎不用，不介绍了

// 12Refle.set()修改数组，对象，比ES5先push，再pop那些好用
// const obj = {x: 1, y: 2}
// Reflect.set(obj, 'z', 33)
// console.log(obj)//{x: 1, y: 2, z: 33}

// const arr = ['cat', 'cat', 'cat']
// console.log(Reflect.set(arr, 2, 'duck'))// true
// console.log(arr) ["cat", "cat", "duck"]

// 13Reflect.setPrototypeOf()修改原型链属性上的对象，比如把String的对象改成Array的
// let arr = [1, 2]
// 将数组原型链上的对象改成字符串上的原型链对象
// Reflect.setPrototypeOf(arr, String.prototype)
// String {"", constructor: ƒ, anchor: ƒ, big: ƒ, blink: ƒ, …}
// console.log(Reflect.getPrototypeOf(arr))
