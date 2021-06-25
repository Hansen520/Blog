// keyof类(型，看下k是不是存在于T中
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

let x = { a: 1, b: 2 }
getProperty(x, 'a')
// getProperty(x, 'm')// 类型“"m"”的参数不能赋给类型“"a" | "b"”的参数