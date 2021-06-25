// 1 交叉类型就是几种类型之和
function extend<T, U>(first: T, second: U): T & U {
  // 类型断言
  let result = {} as T & U

  for (let id in first) {
    // 需要为any类型，这是ts中的限制, 不然是不能赋值给T & U 的，相当于他们的并集
    result[id] = first[id] as any
  }

  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      result[id] = second[id] as any
    }
  }
  return result
}
// 2
class Person {
  constructor(public name: string) {}
}

interface Loggable {
  log(): void
}

class ConsoleLogger implements Loggable {
  log() {
    // to do
  }
}

var jim = extend(new Person('jim'), new ConsoleLogger())
jim.name
jim.log()