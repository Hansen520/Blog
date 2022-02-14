function createComparisonFunction(propertyName) {
  return function (object1, object2) {
    let value1 = object1[propertyName];
    let value2 = object2[propertyName];

    if (value1 < value2) {
      // 升序
      return -1;
    } else if (value1 > value2) {
      // 降序
      return 1;
    } else {
      return 0;
    }
  };
}

// 测试用例
let data = [
  {
    id: 4,
    name: '浙江',
    age: 12,
  },
  {
    id: 2,
    name: '上海',
    age: 44,
  },
  {
    id: 3,
    name: '北京',
    age: 33,
  },
];
data.sort(createComparisonFunction('id'));
console.log(data);
data.sort(createComparisonFunction('age'));
console.log(data);
