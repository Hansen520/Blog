// 基础类型null、undefined、symbol、boolean、void、 any
const decLiteral: number = 20 // 十进制
const hexLiteral: number = 0x14; // 16进制
const binaryLiteral: number = 0b10100 // 2进制
const octalLiteral: number = 0o24// 8进制
const teacherName: string = 'Han'
const flag: boolean = false;
const n: null = null
const u: undefined = undefined
function warnUser(): void {
  console.log('hello');
}

// never类型
function error(message: string): never {
  throw new Error(message);
}
function fail() {
  return error('someing failed');
}
function inifiniteLoop(): never {
  while(true) {}
}


// 以number类型的数组2种方式
const numbers: number[] = [1, 2, 3, 4, 5];
const number1: Array<number> = [1, 2, 3];
// 可以用any类型(数据不明确)
const number2: any[] = ['1', true, 2];


// 元组类型
let x: [string, number] = ['hello', 11];
console.log(x[0].substr(1));

// 对象类型
class Person11 { }
const teacher11: {
  name: String,
  age: Number
} = {
  name: 'han',
  age: 18
};
const han: Person = new Person();
const getTotal: () => number = () => {
  return 20;
}

// 枚举类型
enum Color {
  Red = 1,
  Green,
  Blue
}
let colorName: string = Color[2]
console.log(colorName); // Green


// 类型断言(很明确你就是这种类型)
let someValue: any = 'this is a string';
// 因为用了any后，无法判断此为字符串，所以没法用length属性，所以强制转换
// let strLength: number = (<string>someValue).length;
// 或 等价于
let strLength: number = (someValue as string).length;