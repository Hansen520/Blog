// setter getter
class Person {
  constructor(private _name: string) { }
    // 因为_name为私有属性，可以通过get方法让外部可以调用
    get name(){
      return this._name + ' san';
    }
    // 可以通过set方法，让挖补可以对内部赋值
    set name(name: string) {
      const realName = name.split(' ')[0];
      this._name = realName
    }
}
const person = new Person('zhang');
// 这里的person.name其实获取的是get name方法，切记不需要括号
console.log(person.name); // zhang san
// 因为上面定义了set，所以可以给上面赋值，但是获得的值还是get得到的
person.name = 'zhang si';
console.log(person.name);// zhang san

// 单例模式一个类永远只能生成一个实例。
class Demo {
  // 这是一个静态变量:static把属性或方法挂载在类上，而不是类的实例上
  private static instance: Demo;
  private constructor(public name: string) { };
  // 访问类型不写默认为public
  static getInstance() {
    // 在一个静态方法中调用同一个类中的其他静态方法，可以使用this关键字。
    if (!this.instance) {
      this.instance = new Demo('zhang san');
    }
    return this.instance;
  }
}
// 非静态方法中，不能直接使用 this 关键字来访问静态方法。而是要用类名来调用, 如Demo.getInstance()
const demo1 = Demo.getInstance();
const demo2 = Demo.getInstance();
console.log(demo1.name);// zhang san
console.log(demo2.name);// zhang san
console.log(demo1 === demo2);// true

/*
  代码解读:此为单例模式
  当demo1 被调用时候会创建this.instance = new Demo('zhang san');
  当demo2 第二次被调用, this.instance 已经存在，所以直接返回
*/

