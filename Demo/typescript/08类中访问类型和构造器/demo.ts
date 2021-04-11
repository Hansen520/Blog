class Person5 {
  // 共有类内外调用
  public name: string
  // 保护类 可以内部调用也可以继承调用
  protected sayHi() {
    this.name;
    console.log('hi')
  }
  // 私有类, 只可供内部调用
  private sayABC() {
    this.name
   }

}
class Teacher2 extends Person5 {
  // 共有类，内外都可以调用
  public sayBye() {
    this.sayHi();
  }
}

const teacher2 = new Teacher2()
teacher2.name = 'dell'
console.log(teacher2.name)
teacher2.sayBye()


// constructor
class Person6 {
  // 传统的写法
  // public name: string;
  // contructor(name: string) {
  //   this.name = name
  // }
  // 简化写法
  constructor(public name: string) {
    
  }
}

const person6 = new Person6('han')
console.log(person6.name)


/*构造器继承*/
class Person7 {
  constructor(public name: string){}
}

class Teacher7 extends Person7 {
  constructor(public age: number) {
    // 如果字类有构造器且继承了父类，必需有super先给父类赋值才性，
    // super() 表示调用父类的构造函数,如果父类没有构造器super()为空，父类有构造器就要传参
    // 父类相当与name=han
    super('han');
  }
}

const teacher7 = new Teacher7(25)
console.log(teacher7.age)
console.log(teacher7.name)