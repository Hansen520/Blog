// 1.fill
const res = new Array(100).fill(0).map((i, index) => index + 1);
console.log(res);
// 2. Array.from
const arr2 = Array.from(Array(100), (i, index) => index + 1);
console.log(arr2);
// 3. 扩展运算符...
const arr3 = [...Array(100).keys()].map((i, index) => index + 1);
console.log(arr3);
