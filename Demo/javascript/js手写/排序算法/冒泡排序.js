// 冒泡排序, 升序, 两两交换排序
const a = [3, 1, 4, 5, 3, 6, 7, 55, 22, 167, 438, 216, 2];
// 写法一
function bubbleSort1(arr) {
  // console.log(a);
  if (arr.length < 2) {
    return arr;
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      // 因为走了一遍后，两者比较之前的数字一定是小于arr[i]的
      if (arr[i] < arr[j]) {
        let temp;
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
    }
    // console.log(arr);
  }
  return arr;
}
console.log(bubbleSort1(a));

// 写法二
function bubbleSort2(arr) {
  for (i = 0; i < arr.length; i++) {
    for (j = 0; j < arr.length - i; j++) {
      if (a[j] > a[j + 1]) {
        const temp = a[j];
        a[j] = a[j + 1];
        a[j + 1] = temp;
      }
    }
  }
  return arr;
}
console.log(bubbleSort2(a));
