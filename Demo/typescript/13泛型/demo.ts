// 泛型是指在定义函数、接口或者类时，未指定其参数类型，
// 只有在运行时传入才能确定。那么此时的参数类型就是一个变量，
// 通常用大写字母 T 来表示，当然你也可以使用其他字符，如：U、K等。

// 1.传入2个泛型
function join<T, P>(first: T, second: P) {
  return `${first}${second}`
}

join<number, string>(1, '2')
join('2', '5')// 不写会默认判断类型


// 2.定义泛型，类型为T类型，返回也是要T类型
function anotherJoin<T>(first: T, second: T): T {
  return first
}

anotherJoin<string>('1', '2')

// 3.数据是参数是 以数组的字符串类型
// Array<T> 写法也可以是这样子的 T[]
function map<T>(params: Array<T>) {
  return params
}
map<string>(['123'])