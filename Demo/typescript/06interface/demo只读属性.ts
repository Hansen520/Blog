interface Point {
  readonly x: number
  readonly y: number
}

let p1: Point = {
  x: 10,
  y: 20
}
// p1.x = 5 //error: 无法分配到 "x" ，因为它是只读属性


// 让数组不可以被修改
let a: number[] = [1, 2, 3, 4, 5];
let ro: ReadonlyArray<number> = a
// ro[0] = 12; // 类型“readonly number[]”中的索引签名仅允许读取。
// 如果想让只读数组可以赋值可以使用类型断言的方式
a = ro as number[] // 就是说很确定他是什么类型