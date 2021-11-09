function flatten(arr) {
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
console.log(flatten([1, 2, 3, [4, 5, 6, [7, 8, 9]]]));
