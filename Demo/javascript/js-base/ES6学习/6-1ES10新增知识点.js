// 1 JSON.stringify()
// 是对这个部分的能力增强，原先像0xD是不能识别的
// JSON.stringify 在 ES10 修复了对于一些超出范围的 Unicode 展示错误的问题。因为 JSON 都是被编码成 UTF-8，所以遇到 0xD800–0xDFFF 之内的字符会
// 因为无法编码成 UTF-8 进而导致显示错误。在 ES10 它会用转义字符的方式来处理这部分字符而非编码的方式，这样就会正常显示了。
// 如下代码
// console.log(JSON.stringify('\u{D800}'))

// 2 Array.prototype.flat() 扁平化输出
// 语法：const newArray = arr.flat(depth)
// depth代表层数
// const numbers = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10], 11], 12, 13], 14, 15], 16, [17 ,18]]
// console.log(numbers.flat(4))

// 3 Array.prototype.flatMap()
// 原来数组的map是这样子的
// let arr = [1, 2, 3]
// // item代表每个元素,map是对数组进行操作
// console.log(arr.map(item => {return [item * 2]}).flat())
// // map与flat的合并写法就是mapflat
// console.log(arr.flatMap(item => {return [item * 2]}))

// 4 String.prototype.trimStart() 或 String.prototype.trimLeft()去掉前面空格
let str = '   123   '
console.log(str.trimLeft())

// 5 String.prototype.trimEnd() 或String.prototype.trimRight()去掉右边空格
console.log(str.trimRight())

// 6去掉两边空格String.prototype.trim()
console.log(str.trim())
