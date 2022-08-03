// 1简单的递归实现
function flatten1(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(
        flatten1(
          // 如果还是数组
          arr[i]
        )
      );
    } else {
      result.push(arr[i]);
    }
  }
  // 返回的这个与concat合并
  return result;
}
console.log(flatten1([2, [3, [4, 5, 6]]]));

// 2reduce实现的递归方式(和1是一样的)
function flatten2(arr) {
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flatten2(next) : next);
  }, []);
}
console.log(flatten2([2, [3, [4, 5, 6]]]));

// 写法3(不使用递归)
function flatten3(arr) {
  while (
    arr.some((item) => {
      return Array.isArray(item); // 返回布尔值
    })
  ) {
    // 可以打平数组
    arr = [].concat(...arr);
  }
  return arr;
}
console.log(flatten3([1, 2, 3, [4, 5, 6, [7, 8, 9]]]));

// 写法四 split和toString共同处理
function flatten4(arr) {
  return arr
    .toString()
    .split(',')
    .map((item) => Number(item));
}
console.log(flatten4([1, 2, 3, [4, 5, 6, [7, 8, 9]]]));

// 写法五，ES6的flat
function flatten5(arr) {
  return arr.flat(Infinity);
}
console.log(flatten5([1, 2, 3, [4, 5, 6, [7, 8, 9]]]));

// 写法六 正则和JSON方法共同处理
function flatten6(arr) {
  let str = JSON.stringify(arr);
  str = str.replace(/(\[|\])/g, '');
  str = '[' + str + ']';
  return JSON.parse(str);
}
console.log(flatten6([1, 2, 3, [4, 5, 6, [7, 8, 9]]]));

// 写法七 堆栈方法(个人觉得这个方法不错)
function flatten7(arr) {
  const stack = [...arr];
  const res = [];
  while (stack.length) {
    // 使用pop从stack中取出并移除值,直到没有为止
    const next = stack.pop();
    if (Array.isArray(next)) {
      // 使用push送回内层数组中的元素，不会改动原始输入 original input
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  // 使用reverse恢复数组的顺序
  return res.reverse();
}
console.log(flatten7([1, 2, 3, [4, 5, 6, [7, 8, 9]]]));
