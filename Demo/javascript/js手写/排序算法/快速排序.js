// // 快速排序,找到基准，然后以基准排序
// // 写法一

// function fast_sort1(arr, from, to) {
//   let i = from,
//     j = to,
//     key = arr[from]; // 基数位
//   if (i >= j) {
//     return false;
//   }
//   while (i < j) {
//     while (arr[j] > key && i < j) {
//       j--;
//     }
//     while (arr[i] <= key && i < j) {
//       i++;
//     }
//     if (i < j) {
//       // let temp = arr[i];
//       // arr[i] = arr[j];
//       // arr[j] = temp;
//       [arr[i], arr[j]] = [arr[j], arr[i]];
//     }
//   }
//   arr[from] = arr[i];
//   arr[i] = key;
//   fast_sort1(arr, from, i - 1);
//   fast_sort1(arr, i + 1, to);
// }

// let arr = [3, 5, 6, 1, 2, 3, 4, 5, 6, 7];
// fast_sort1(arr, 0, arr.length - 1);

// 写法二
const a = [6, 8, 2, 11, 17, 100, 16, 34, 87, 5];
function quickSort(array) {
  function sort(arr, left = 0, right = arr.length - 1) {
    // 如果左边的索引大于等于右边的索引说明整理完毕
    if (left >= right) {
      return;
    }
    let i = left;
    let j = right;
    // 取数组最后一个数为基准值
    const baseVal = arr[j];
    // 把所有比基准值小的数放在左边，而大的数 放在右边
    while (i < j) {
      // 找到一个比基准值大的数交换
      while (i < j && arr[i] <= baseVal) {
        i++;
      }
      // 将较大的值放在右边，如果没有比基准值大的数就是将自己赋值给自己(i 等于 j)
      arr[j] = arr[i];
      // 找到一个比基准值小的数交换
      while (j > i && arr[j] >= baseVal) {
        j--;
      }
      // 将较小的值放在左边，如果没有找到比基准值小的数就是将自己赋值给自己(i 等于 j)
      arr[i] = arr[j];
    }
    // 将基准值放至中央位置完成一次循环(这个时候j等于i)
    arr[j] = baseVal;
    // 将左边的无序数组重复上面的操作
    sort(arr, left, j - 1);
    // 将右边的无序数组重复上面的操作
    sort(arr, j + 1, right);
  }
  const newArr = array.concat(); // 为了保证这个函数是纯函数拷贝一次数组
  sort(newArr);
  return newArr;
}
console.log(quickSort(a));
