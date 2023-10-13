/*
 * @Author: Hansen
 * @Date: 2023-06-06 09:47:47
 * @LastEditors: Hansen
 * @LastEditTime: 2023-06-06 09:49:37
 * @FilePath: \lz-frontend-screend:\project\Blog\Demo\TEST\0011while循环.js
 * @Description: description
 */
function sort(arr, begin, end) {
  if (begin < end) {
    let i = begin;
    let j = end;
    let empty = arr[begin];
    while (i < j) {
      while (arr[j] > empty && i < j) {
        j--;
      }
      arr[i] = arr[j];
      while (arr[i] < empty && i < j) {
        i++;
      }
      arr[j] = arr[i];
    }
    arr[i] = empty;
    sort(arr, begin, i - 1);
    sort(arr, i + 1, end);
  } else {
    return;
  }
}

let arr = [2, 3, 1, 4, 8, 7, 9, 6];
sort(arr, 0, 7);
console.log(arr);
