function add(first: number, second: number): number {
  return first + second
}

function sayHello(): void{
  console.log('hello')
}

function errorEmitter(): never {
  while (true) { }
}

// 解构方式的函数类型
function add1({ first, second }: { first: number, second: number }): number {
  return first + second
}

function getNumber({ first }: { first: number }) {
  return first;
}