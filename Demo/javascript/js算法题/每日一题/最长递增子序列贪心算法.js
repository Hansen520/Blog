function getSequence(arr) {
  const p = arr.slice();
  const result = [0];

  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        // 存储在result 更新前的最后一个索引的值
        p[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      // 二分搜索，查找比arrI小的节点，更新result的值
      while (u < v) {
        c = ((u + v) / 2) | 0;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  // 回溯数组p，找到最终的索引
  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }
  return result;
}
console.log(getSequence([2, 1, 5, 3, 6, 4, 8, 9, 7]));
