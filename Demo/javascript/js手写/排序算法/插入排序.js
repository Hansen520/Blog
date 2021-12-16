// 插入排序
function insertionSort(arrSort) {
  let arr = arrSort.slice();
  // 从前往后推进
  for (let i = 1; i < arr.length; i++) {
    insert(arr, i);
  }
  return arr;
  // 插入排序
  function insert(arr, n) {
    // 取值存储
    let el = arr[n];
    // 从后往前对比
    while (arr[n - 1] > el) {
      arr[n] = arr[n - 1];
      n--;
      // 防止数组越界
      if (n === 0) {
        break;
      }
    }
    // 最后赋值
    arr[n] = el;
  }
}

const arr = [9, 1, 2, 3, 6, 5, 7, 8, 4];
console.log(insertionSort(arr));
