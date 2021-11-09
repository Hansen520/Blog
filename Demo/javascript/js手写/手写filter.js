function filter(arr, fillterCallback) {
  // 首先检查传参是否正确
  if (
    !Array.isArray(arr) ||
    !arr.length ||
    typeof fillterCallback !== 'function'
  ) {
    return [];
  } else {
    let result = [];
    for (let i = 0, len = arr.length; i < len; i++) {
      // 检查filterCallback的返回值是否为真值
      if (fillterCallback(arr[i], i, arr)) {
        // 如果条件为真，则将数组元素push到result中
        result.push(arr[i]);
      }
    }
    return result;
  }
}

let ar = filter([1, 2, 3], function (item) {
  return item > 1;
});
console.log(ar);
