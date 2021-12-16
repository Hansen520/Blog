function mergeSort(array) {
  // 二路归并排序
  const merge = (right, left) => {
    const result = [];
    let il = 0;
    let ir = 0;
    // 形成两个左右两边有序的数组，两两排序
    while (il < left.length && ir < right.length) {
      if (left[il] < right[ir]) {
        result.push(left[il++]);
      } else {
        result.push(right[ir++]);
      }
    }
    while (il < left.length) {
      result.push(left[il++]);
    }
    while (ir < right.length) {
      result.push(right[ir++]);
    }
    return result;
  };
  // 分治将数组无限对半切割直到一个元素的数组(因为数组只有一个元素默认有序)
  const mergeSort = (array) => {
    if (array.length === 1) {
      return array;
    }
    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid, arr.length);

    return merge(mergeSort(left), mergeSort(right));
  };
  return mergeSort(array);
}
let arr = [2, 8, 1, 14, 3, 12, 9, 10, 4, 5, 6, 7];
console.log(mergeSort(arr));
