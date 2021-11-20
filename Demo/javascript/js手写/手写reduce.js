function reduce(arr, reduceCallback, initialValue) {
  if (
    !Array.isArray(arr) ||
    !arr.length ||
    typeof reduceCallback !== 'function'
  ) {
    return [];
  } else {
    // 如果没有将initialValue传递给该函数，我们将使用第一个数组项作为哦initialValue
    let hasInitialValue = initialValue !== undefined;
    let value = hasInitialValue ? initialValue : arr[0];

    // 如果有传递initialValue，则索引从0开始，否则从1开始
    for (let i = hasInitialValue ? 0 : 1, len = arr.length; i < len; i++) {
      value = reduceCallback(value, arr[i], i, arr);
    }
    return value;
  }
}
let a = reduce(
  [1, 2, 3],
  function (cu, item) {
    return cu + item;
  },
  10
);

console.log(a);

let b = [1, 2, 3].reduce(function (a, b) {
  return a + b;
}, 10);
console.log(b);
