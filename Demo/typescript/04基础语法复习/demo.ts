// 如果变量的声明和赋值是分开写的，这样 TS 就不能推断出变量的具体类型了。
let count1: number;
count1 = 123456;

// 函数类型声明的两种方式；
// 一种是直接赋值一个箭头函数，一种是先声明函数的类型注解，再赋值具体的函数。
const func = (str: string) => {
  return parseInt(str, 10)
}
// 下面这种和上面是一样的，怎么好理解怎么写
const func1: (str: string) => number = (str) => {
  return parseInt(str, 10)
}

/*其他类型*/
// Date类型，可以隐性推断出
const data = new Date()

// 有些函数返回的值类型是推断不出来的，所以需要类型注解
interface Person {
  name: 'string'
}
const rawData = '{"name": "han"}'
const newData: Person = JSON.parse(rawData)

// 给变量赋值多种类型
let temp: number | string = 123;
temp = '456';