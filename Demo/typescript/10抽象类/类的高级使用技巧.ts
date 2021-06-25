class Greenter {
  static standardGreeting = 'Hello, there'
  greeting: string
  constructor(message?: string) {
    this.greeting = message
  }
  greet() {
    if (this.greeting) {
      return 'Hello, ' + this.greeting
    } else {
      return Greenter.standardGreeting
    }
  }
}

let greeter: Greenter
greeter = new Greenter()
console.log(greeter.greet())

// 先赋值，然后修改他的静态类型
let greeterMaker: typeof Greenter = Greenter
greeterMaker.standardGreeting = 'Hey there'

let greeter2: Greenter = new greeterMaker()
console.log(greeter2.greet())
