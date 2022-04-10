/*
  描述: 找出数组中唯一落单的数(只出现一次的数)
  [1, 4, 3, 3, 2, 4, 1] => 2
*/

/**
 * 方法1：
 *    利用map的key-value特性存储数据
 *    找出其实value值为1对应的值
 */
function getUnique(arr) {
  let map = {};
  for (let key of arr) {
    if (!map[key]) {
      map[key] = 1;
    } else {
      map[key]++;
    }
  }
  for (let item in map) {
    if (map[item] === 1) {
      return +item;
    }
  }
}
console.log(getUnique([1, 4, 3, 3, 2, 4, 1]));

/**
 * 方法2
 * 如果一个值第一次出现的位置和最后一次出现的位置相同
 * 那么这个值就只出现了一次
 */
function getUnique2(arr) {
  return arr.filter((item) => arr.indexOf(item) === arr.lastIndexOf(item))[0];
}

console.log(getUnique2([1, 4, 3, 3, 8, 4, 4, 1]));

/**
 * 方法3：数字的异或运算
 * 两个相同的数字进行异或运算得到0
 * 0与任何值a异或得到a本身
 * 0 ^ 2 = 2   2 ^ 2 = 0
 */
// 这个算法会有一丢丢的问题，就是必需成对出现才可以取消
function getUnique3(arr) {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    result ^= arr[i];
  }
  return result;
}
console.log(getUnique3([1, 4, 3, 3, 10, 4, 1]));
