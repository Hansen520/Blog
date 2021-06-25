interface Shape {
  color: string
}
interface PenStroke {
  penWidth: number
}
// 多接口继承
interface Square1 extends Shape, PenStroke {
  sideLength: number
}

let squre = {} as Square1
squre.color = 'blue'
squre.sideLength = 10
squre.penWidth = 5.0