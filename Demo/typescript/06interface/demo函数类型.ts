// 定义一个函数类型
interface SearchFunc {
  (source: string, subString: string): boolean
}

// 定义函数的类型
let mySearch: SearchFunc
mySearch = function (src, sub) {
  let result = src.search(sub)
  return result < -1
}