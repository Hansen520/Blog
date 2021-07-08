let map = new Map([['123', '1234'], [666, '0987'], [666, 'qua']])
// 添加数据,说明数据是不能被重复的
console.log('添加数据')
let keyObj = {}
let keyFunc = function () {}
let keyString = 'a string'

// 说明键可以是各种类型的，包括字符串，函数，对象
map.set(keyObj, 'obj')
map.set(keyFunc, '函数')
map.set(keyString, '字符串')
console.log(map)

// 删除数据
console.log('删除数据')
map.delete(keyObj)
map.delete('123')
console.log(map)

// 清除数据
// map.clear()
console.log(map)

// 统计数据
console.log(map.size)
// 判断是否有key-val
console.log(map.has(666))

//
