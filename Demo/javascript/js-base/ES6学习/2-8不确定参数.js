//1 扩展运算符...数组转参数
function sum1 (x = 1, y = 2, z = 3) {
  return x + y + z
}
let data = [4, 5, 6]
//es5
console.log(sum1.apply(null, data))
//es6
console.log(sum1(...data))
console.log('-----------------------------')

//2 剩余运算符...参数转数组
//es5
function sum2 () {
  let num = 0
  Array.prototype.forEach.call(arguments, function(item){
    num += item * 1
  })
  return num
}
console.log(sum2(1,2,3,4,5))
console.log(sum2(1,2,3,4,5,6,7,8))
//es6
function sum3(...nums){
  let num = 0
  nums.forEach(function(item){
    num += item * 1
  })
  return num
}
console.log(sum3(1,2,3,4,5))
console.log(sum3(1,2,3,4,5,6,7,8))

