/*
  下面这两条内容进行相互的转化
  [{a: 'hangzhou', b: '1'}, {a: 'shaoxing', b: '2'}] => 
  {
    hangzhou: {a: 'hangzhou', b: '1'},
    shaoxing: {a: 'shaoxing', b: '2'}
  }
*/

let arr = [
  { a: 'hangzhou', b: '1' },
  { a: 'shaoxing', b: '2' },
];

let obj = arr.reduce((prev, cur) => {
  if (cur.a) {
    prev[cur.a] = cur;
    return prev;
  }
}, {});

console.log(obj);

let newArr = Object.keys(obj).map((key) => {
  return obj[key];
});
console.log(newArr);
