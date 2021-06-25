interface Counter {
  // 函数类型参数是start，且是number类型，并返回string类型
  (start: number): string
  interval: number
  reset(): void
}

function getCounter(): Counter {
  let counter = (function (number) { }) as Counter
  counter.interval = 123
  counter.reset = function () { }
  return counter
}

let c = getCounter()
c(100) // 因为counter就是个函数
c.reset()// 且这个设置了reset函数
c.interval = 3.14// 也可以新增属性