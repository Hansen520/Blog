function map(arr, mapCallback) {
  // 首先检查传参是否正确
  if (!Array.isArray(arr) || !arr.length || typeof mapCallback !== 'function') {
    return [];
  } else {
    let result = [];
    // 每次调用此函数时候，我们哦都会创建一个result数组
    // 因为不想改变原来数组
    for (let i = 0, len = arr.length; i < len; i++) {
      result.push(mapCallback(arr[i], i, arr));
      // 将mapCallback返回的结果push到result数组种去
    }
    return result;
  }
}

let ar = map([1, 2, 3], function (item) {
  return item * 2;
});
console.log(ar);
