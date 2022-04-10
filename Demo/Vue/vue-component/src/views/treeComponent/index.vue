<template>
  <div>1</div>
</template>

<script>
import { getTreeList } from '@/api/api.js';
export default {
  async mounted() {
    let { data } = await getTreeList();
    console.log(data);
    // 1) 扁平化的数组如何变成 多层数据 递归数据
    let AllData = [...data.parent, ...data.child];
    // {1: {name: '文件夹1', pid: 0, id: }}
    let treeMapList = AllData.reduce((memo, current) => {
      current.label = current.name;
      memo[current['id']] = current;
      return memo;
    }, {});
    console.log(treeMapList, 18);
    let result = AllData.reduce((arr, current) => {
      let pid = current.pid;
      // 父级数据
      let parent = treeMapList[pid];
      if (parent) {
        // 形成树形菜单
        parent.children
          ? // 父级数据推送当前数据
            parent.children.push(current)
          : (parent.children = [current]); // 这些个都是比较常用的
      } else if (pid === 0) {
        // 跟着文件夹
        arr.push(current);
      }
      return arr;
    }, []);
    console.log(result, 30);
  },
};
</script>

<style></style>
