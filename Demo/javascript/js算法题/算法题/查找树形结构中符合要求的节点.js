/*
 * @Date: 2025-01-09 16:59:33
 * @Description: description
 */
function findNodes(tree, predicate) {
  const result = []; // 用于存储符合条件的节点

  function traverse(node) {
    // 判断是否符合搜索值得条件
    if (predicate(node)) {
      result.push(node); // 如果节点满⾜条件，将其添加到结果数组
    }
    for (const child of node.children) {
      traverse(child); // 递归遍历每个子节点
    }
  }

  traverse(tree); // 从根节点开始遍历
  return result; // 返回所有符合条件的节点
}

// ⽰例树结构
const tree = {
  value: "root",
  children: [
    {
      value: "child1",
      children: [
        { value: "grandchild1", children: [] },
        { value: "grandchild2", children: [] },
      ],
    },
    {
      value: "child2",
      children: [
        { value: "grandchild3", children: [] },
        { value: "grandchild4", children: [] },
      ],
    },
  ],
};

// 搜索条件，返回的值是布尔值
const predicate = (node) => node.value.startsWith("grandchild"); // ⽰例条件：节点的值以 "grandchild" 开头
const matchingNodes = findNodes(tree, predicate);

console.log(matchingNodes); // 输出所有符合条件的节点
