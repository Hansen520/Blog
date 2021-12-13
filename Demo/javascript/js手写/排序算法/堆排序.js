// 堆排序
function heapSort(arr) {
  if (arr == null && arr.length === 0) {
    return;
  }
  // 要拷贝一份，以免外界受到影响
  const tree = arr.slice();
  const len = tree.length;
  build_heap(tree, len); // 入口函数
  // 最后将堆取出排序, 执行一次循环后默认就是升序排序了
  for (let i = len - 1; i >= 0; i--) {
    swap(tree, i, 0);
    heapify(tree, i, 0);
  }
  // 返回最后排序后的数组
  return tree;

  // 交换顺序
  function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  // 比较二叉树的节点并交换
  function heapify(tree, n, i) {
    if (i >= n) {
      return false;
    }
    // 先根据堆性值，找出它左右节点的索引
    let c1 = 2 * i + 1;
    let c2 = 2 * i + 2;
    // 默认当前节点(父节点非叶子节点)是最大值()
    let max = i;
    // 如果有左节点，并且左节点的值更大，更新最大值的索引
    if (c1 < n && tree[c1] > tree[max]) {
      max = c1;
    }
    // 如果有右节点，并且右节点的值更大，更新最大值的索引
    if (c2 < n && tree[c2] > tree[max]) {
      max = c2;
    }
    if (max !== i) {
      // 如果最大值不是当前非叶子节点的值，那么就把当前节点和最大值的子节点值互换
      swap(tree, max, i);
      // 因为互换之后，子节点的值变大，如果该子节点也有自己的子节点，仍需要再次调整
      heapify(tree, n, max);
    }
  }
  // 建立 一个堆的结构(从末尾开始)
  function build_heap(tree, n) {
    let last_node = n - 1;
    let parent = (last_node - 1) / 2; // 找到最后一个非叶子节点
    for (let i = parent; i >= 0; i--) {
      // 2,1,0
      heapify(tree, n, i);
    }
  }
}
const arr = [2, 5, 3, 1, 10, 4];
const newArr = heapSort(arr);
console.log(newArr);
