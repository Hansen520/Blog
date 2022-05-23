/*
    使用Set对象: new | add | delete | has | size
    迭代Set: 多种迭代方法、Set与Array互转、求交集/差集

    求交集 和 差集
*/
const arr = [3,4,5,6,7];
const set = new Set(arr)

// 求交集
const set2 = new Set([2, 3, 7]);
const intersection = new Set([...set].filter(item => set2.has(item)));
console.log([...intersection]);[3, 7]

// 求差集， 就比如说set1里面有，set2里面没有的值
const difference = new Set([...set].filter(x => !set2.has(x)));
console.log([...difference]);[4,5,6]