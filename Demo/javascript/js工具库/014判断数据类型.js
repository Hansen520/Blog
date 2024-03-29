// 这里使用一种较为通用的判断方式 Object.prototype.toString

function getType(obj) {
  let type = typeof obj;
  if (type !== 'object') {
    // 先进行typeof判断，如果是基础数据类型，直接返回
    return type;
  }
  // 对于typeof返回结果是object, 再进行如下的判断，正则返回结果,并将其转化为小写
  return Object.prototype.toString
    .call(obj)
    .replace(/^\[object (\S+)\]$/, '$1')
    .toLowerCase();
}

console.log(getType([])); // "array" typeof []是object，因此toString返回
console.log(getType('123')); // "string"
console.log(getType(123)); // number
console.log(getType(123n)); // bigint
console.log(getType(global)); // "global"
console.log(getType(null)); // "null"，typeof null是object，需toString来判断
console.log(getType(undefined)); // "undefined" typeof 直接返回
console.log(getType()); // "undefined" typeof 直接返回
console.log(getType(function () {})); // "function" typeof能判断，因此首字母小写
console.log(getType(/123/g)); //"regexp" toString返回
console.log(getType(NaN)); // 'number'
console.log(getType(new Date())); // date
console.log(getType(Symbol())); // symbol
