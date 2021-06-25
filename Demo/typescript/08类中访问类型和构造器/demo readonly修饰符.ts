class Person3 {
  // 只读属性
  readonly name: string

  constructor(name: string) {
    this.name = name
  }

  // 等价于参数属性
  // constructor(readonly name: string) {}
}

let john = new Person3('John')
// john.name = '' // 无法分配到 "name" ，因为它是只读属性