function fast_sort(arr, from, to) {
  let i = from,
    j = to,
    key = arr[from]; // 基数位
  if (i >= j) {
    return false;
  }
  while (i < j) {
    while (arr[j] > key && i < j) {
      j--;
    }
    while (arr[i] <= key && i < j) {
      i++;
    }
    if (i < j) {
      // let temp = arr[i];
      // arr[i] = arr[j];
      // arr[j] = temp;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  arr[from] = arr[i];
  arr[i] = key;
  fast_sort(arr, from, i - 1);
  fast_sort(arr, i + 1, to);
}

let arr = [3, 5, 6, 1, 2, 3, 4, 5, 6, 7];
console.log(arr);
fast_sort(arr, 0, arr.length - 1);
console.log(arr);
