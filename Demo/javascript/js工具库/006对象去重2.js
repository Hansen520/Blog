/*
 * @Date: 2025-07-22 15:01:13
 * @Description: 这边我们要对基础类型何引用类型去重
 */
let arr = [
  1,
  1,
  "2",
  3,
  1,
  2,
  { name: "张三", id: { n: 1 } },
  { name: "张三", id: { n: 1 } },
  { name: "张三", id: { n: 2 } },
];

/* 方法一 */
const arr2 = arr.map(item => {
  return JSON.stringify(item);
});

let newArr = new Set(arr2);
newArr = Array.from(newArr).map(item => {
  return JSON.parse(item);
});

console.log(newArr);


/* 方法2见 006数组对象去重.js */