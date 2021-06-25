// 字符串类型是数字类型的子类型，但是反过来不行, 数字索引类型“string”不能赋给字符串索引类型“number”
// 1
interface StringArray {
  [index: number]: string
  // [index1: string]: number // 数字索引类型“string”不能赋给字符串索引类型“number”
}
let myArray: StringArray
myArray = ['bob', 'fred']

let myStr: string = myArray[0]

// 2
class Animal {
  name: string
}
class Dog extends Animal {
  breed: string
}
// 字符串类型是数字类型的子类型，但是反过来不行
interface NotOkey {
  [x: number]: Dog
  [x: string]: Animal
}

// 3 只读的
interface ReadonlyStringArray {
  readonly [index: number]: string
}
let myArray1: ReadonlyStringArray = ['Alice', 'Bob']
// myArray[5] = '2'// 会报错，这是只读的