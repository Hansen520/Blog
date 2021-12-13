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

// 写法3
function flatten3(arr) {
  while (
    arr.some((item) => {
      return Array.isArray(item);
    })
  ) {
    // 可以打平数组
    arr = [].concat(...arr);
  }
  return arr;
}
console.log(flatten3([1, 2, 3, [4, 5, 6, [7, 8, 9]]]));
