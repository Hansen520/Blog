// 去重
const arr = [3,4,5,6,7];
const arr2 = [...new Set(arr)];

// 判断元素是否在集合中
const set = new Set(arr);
const has = set.has(3);

// 求交集
const set2 = new Set([2, 3, 7]);
const set3 = new Set([...set].filter(item => set2.has(item)));
console.log([...set3]);