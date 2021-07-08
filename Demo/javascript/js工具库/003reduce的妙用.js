// 测试用例
const testArr = [1, 2, 3, 4];
const testArr2 = [
  [1, 2],
  [3, 4],
  [5, 6],
  [7, 8],
];
const testArrs = [
  -1,
  0,
  [1, 2, 3, [4, 5, 6]],
  [7, 8, 9, [10, 11, [12, [13]]]],
  [14, [15]],
];
const testArrCount = [
  1, 3, 4, 1, 3, 2, 9, 8, 5, 3, 2, 0, 12, 10, 1, 4, 5, 6, 2, 3, 4, 5, 6,
];
const testObj = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }];
// ---------------------array-map-用于重新组装成数组-----------
Array.prototype.reduceMap = function (callback) {
  const result = this.reduce((acc, cur, index, array) => {
    const item = callback(cur, index, array);
    acc.push(item);
    return acc;
  }, []);
  return result;
};
testArr.reduceMap((item, index) => {
  return item + index;
});
// -------------------array-foreach-遍历循环-------------------
Array.prototype.reduForEach = function (callback) {
  this.reduce((acc, cur, index, arr) => {
    callback(cur, index, arr);
  }, []);
};
testArr.reduForEach((item, index) => {
  // console.log(item, index);
});
// --------------------array-filter-用于遍历除符合条件的所有元素---------------------------
Array.prototype.reduceFilter = function (callback) {
  return this.reduce((acc, cur, index, arr) => {
    if (callback(cur, index, arr)) {
      acc.push(cur);
    }
    return acc;
  }, []);
};
testArr.reduceFilter((item) => {
  return item > 2;
});
// ----------------------array-find-选出符合条件的一个数组------------------------
Array.prototype.reduceFind = function (callback) {
  return this.reduce((acc, cur, index, array) => {
    // 只要符合条件一次就行
    if (callback(cur, index, array)) {
      // acc instanceof Array 这步是避免重新赋值的关键
      if (acc instanceof Array && acc.length === 0) {
        acc = cur;
      }
    }
    // 循环到最后若acc还是数组，且等于0， 代表没有找到想要的项，则acc=undefined
    if (
      index === array.length - 1 &&
      acc instanceof Array &&
      acc.length === 0
    ) {
      acc = undefined;
    }
    return acc;
  }, []);
};
testArr.reduceFind((item) => item % 2 == 0); // 2
testObj.reduceFind((item) => item.a % 2 == 0); // {a: 2}
testObj.reduceFind((item) => item.a % 9 == 0); // undefined
// ----------------------array-some-只要有一个元素符合条件就返回true, 否则返回false---------------------

Array.prototype.reduceSome = function (callback) {
  return this.reduce((acc, cur, index, array) => {
    // 只要符合条件一次就行
    if (callback(cur, index, array)) {
      if (acc instanceof Array && acc.length === 0) {
        acc = true;
      }
    }
    // 循环到最后若acc还是数组，且等于0， 代表没有找到想要的项，则acc=undefined
    if (
      index === array.length - 1 &&
      acc instanceof Array &&
      acc.length === 0
    ) {
      acc = false;
    }
    return acc;
  }, []);
};

testArr.reduceSome((item) => item % 2 == 0); // true
testObj.reduceSome((item) => item.a % 2 == 0); // true
testObj.reduceSome((item) => item.a % 9 == 0); // false

// ----------------------array-every-只有所有元素符合条件才返回true, 否则返回false---------------------
Array.prototype.reduceEvery = function (callback) {
  return this.reduce((acc, cur, index, arr) => {
    // 只要有一个数据项条件不满足就返回false
    if (!callback(cur, index, arr)) {
      acc = false;
    }
    return acc;
  }, true);
};

testArr.reduceEvery((item) => item > 0); // true
testArr.reduceEvery((item) => item > 2); // false

// -------------------------二维数组转一维数组-----------------------------------------------------
testArr2.reduce((acc, cur) => {
  return acc.concat(cur);
}, []); // [1, 2, 3, 4, 5, 6, 7, 8 ]
// --------------------------------------多维组数转一维数组(多理解)----------------------------------------

function formatArr(arrs) {
  if (!Array.isArray(arrs)) {
    throw new Error(arrs + ' is not array');
  }
  return arrs.reduce((acc, cur) => {
    if (Array.isArray(cur)) {
      // 这步就是核心
      return acc.concat(formatArr(cur));
    } else {
      return acc.concat(cur);
    }
  }, []);
}
formatArr(testArrs); //[-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
// -----------------------计算数组中没饿过元素出现的个数----------------------------
testArrCount.reduce((acc, cur) => {
  // 写法一
  // if (!(cur in acc)) {
  //   acc[cur] = 1;
  // } else {
  //   acc[cur] += 1;
  // }
  // 写法二
  if (!acc.hasOwnProperty(cur)) {
    acc[cur] = 1;
  } else {
    acc[cur] += 1;
  }
  return acc;
}, {}); //{'0': 1,'1': 3,'2': 3,'3': 4,'4': 3,'5': 3,'6': 2,'8': 1,'9': 1,'10': 1,'12': 1}
// ---------------------按照属性给数组分类(就是把相同一类归为一处)--------------------------------------------
const bills = [
  { type: 'shop', momey: 223 },
  { type: 'study', momey: 341 },
  { type: 'shop', momey: 821 },
  { type: 'transfer', momey: 821 },
  { type: 'study', momey: 821 },
];
bills.reduce((acc, cur) => {
  // 如果不存在这个键，则设置它赋值为[] 空数组
  if (!acc[cur.type]) {
    acc[cur.type] = [];
  }
  acc[cur.type].push(cur);
  return acc;
}, {});

// ----------------------数组去重---------------------------------
testArrCount.reduce((acc, cur) => {
  if (!acc.includes(cur)) {
    acc.push(cur);
  }
  return acc;
}, []);
// [1, 2, 3, 4, 5, 6, 7]

// -----------------------求最大值或最小值-------------------------
const ageArr = [
  { age: 20 },
  { age: 21 },
  { age: 24 },
  { age: 22 },
  { age: 23 },
];

ageArr.reduce((acc, cur) => {
  if (!acc) {
    acc = cur;
  }
  if (acc.age < cur.age) {
    acc = cur;
  }
  return acc;
}, 0); // { age: 24 }
