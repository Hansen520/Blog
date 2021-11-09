// 1.这个深拷贝函数并不能复制不可枚举的属性以及 Symbol 类型；
// 2.这种方法只是针对普通的引用类型的值做递归复制，而对于 Array、Date、RegExp、Error、Function 这样的引用类型并不能正确地拷贝；
// 3.对象的属性里面成环，即循环引用没有解决。

function deepClone(obj) {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  let result = null;
  if (Array.isArray(obj)) {
    result = [];
  } else {
    result = {};
  }

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }
  return result;
}
// 测试用例
const originObj = {
  a: '时间就是生命',
  b: [12, 34],
  f: new Date(),
  e: /123456/,
  m: new Error(),
  c: function () {},
  d: {
    a: '三个字',
    b: [
      function () {},
      {
        a: 36,
        b: [45, 78],
      },
      {},
    ],
  },
};

const newObj = deepClone(originObj);
console.log(newObj, 38);
// a: "时间就是生命"
// b: (2) [12, 34]
// c: ƒ ()
// d: {a: '三个字', b: Array(3)}
// e: {}
// f: {}
// m: {}
