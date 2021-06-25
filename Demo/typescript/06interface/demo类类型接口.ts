// 类有实例部分类型 和静态部分类型
// 类的实例部分
interface ClockInterface {
  tick()
}
// 类的静态部分
interface ClockConstructor {
  new(hour: number, minute: number): ClockInterface
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute)
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) { }

  tick() {
    console.log('beep beep')
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log('tick toc')
  }
}