// 选择排序, 锁定一个值，往后找到最小的值然后替换
const a = [3, 1, 4, 5, 3, 6, 7, 55, 22, 167, 438, 216, 2];
function selectSort(array) {
  const len = array.length;
  let minIndex;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      // 往后找最小值的那个索引然后替换
      if (array[j] <= array[minIndex]) {
        minIndex = j;
      }
    }
    const temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }
  return array;
}
console.log(selectSort(a));
