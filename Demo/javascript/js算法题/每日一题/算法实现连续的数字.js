/*
  输入一串数字字符串，经过分析
  如果连续数字的话，就取连续的第一个数和最后一个数，中间用~隔开
  如果不连续就用,隔开
  输入 '1,2,3,5,6,8,10' 输出'1~3,5,7~8,10'
*/

/*
  方法1
  1.字符串 -> 数组
  2.定义结果变量result
  3.使用临时变量tmp表示序列的第一个值
  4. 遍历数组，cur(当前元素值) + 1 和 next(后面一个元素的值)
      cur + 1 === next 不做处理
      cur + 1 !== next
        如果临时变量 !== 当前值，则表示是一个序列, result中添加tmp~cur
        如果临时变量 === 当前值相等，则表示是一个独立的值, result中添加cur
      next动态更新临时变量的值
*/
function getValue(str) {
  const arr = str.split(',').map((i) => +i);
  const result = [];
  let tmp = arr[0];
  arr.forEach((item, index, self) => {
    // 不断的推进
    if (item + 1 !== self[index + 1]) {
      if (tmp !== item) {
        result.push(`${tmp}~${item}`);
      } else {
        result.push(item);
      }
      tmp = self[index + 1];
    }
  });
  return result.join();
}
// console.log(getValue('1,2,3,5,6,8,10'));

/*
  方法二
  1. 字符串 -> 数组
  2. 数组 -> 获取新格式的字符串
    1,2,3,5,7,8,10 -> 1~2~3,5,7~8,10
  3. 正则表达式替换中间多余的~值
*/
function getValue2(str) {
  const arr = str.split(',').map((i) => +i);
  const target = arr.reduce((pre, cur, index, self) => {
    if (index > 0) {
      if (cur - 1 === self[index - 1]) {
        // 将连续的字符进行拼接，不连续的用逗号隔开
        return `${pre}~${cur}`;
      } else {
        return `${pre},${cur}`;
      }
    } else {
      return cur;
    }
  }, '');

  // 下面这个正则好好理解
  return target
    .split(',')
    .map((item) => {
      // 10~11~12~13~14 -> 10~14
      // (10)(~11~12~13)(~14)
      const reg = /(\d{1,})(~\d{1,})*(~\d{1,})/;
      // $1 匹配第一个括号，$3 匹配第三个括号
      return item.replace(reg, '$1$3');
    })
    .join();
}
console.log(getValue2('1,2,3,5,6,8,10'));
