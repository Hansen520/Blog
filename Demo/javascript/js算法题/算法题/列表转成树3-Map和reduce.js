/*
 * @Date: 2025-01-09 09:57:27
 * @Description: 其实做法大相径庭，就是拿出id作为key值
 */
// 为啥会有两个参数呢，这是因为我们传过来的数据的根节点可能不是null，也许是-1，0，所以我们制定一个参数作为根节点
function listToTree(list = [], parentId = null) {
  // [[key, value]], 其实原理和第一种差不多的 
  const map = new Map(list.map((item) => [item.id, { ...item, children: [] }]));
  console.log(map);
  return list.reduce((acc, item) => {
    if (item.parentId === parentId) {
      acc.push(map.get(item.id));
    } else {
      const parent = map.get(item.parentId);
      if (parent) {
        parent.children.push(map.get(item.id));
      }
    }
    return acc;
  }, []);
}

const list = [
  { id: 1, name: "Node 1", parentId: null },
  { id: 2, name: "Node 1.1", parentId: 1 },
  { id: 3, name: "Node 1.2", parentId: 1 },
  { id: 4, name: "Node 2", parentId: null },
  { id: 5, name: "Node 2.1", parentId: 4 },
  { id: 6, name: "Node 2.2", parentId: 4 },
  { id: 7, name: "Node 2.1.1", parentId: 5 },
];

const tree = listToTree(list);
console.log(tree);

// 打印树形结构
function printTree(tree, level = 0) {
  tree.forEach((node) => {
    console.log(" ".repeat(level * 2) + node.name);
    if (node.children.length > 0) {
      printTree(node.children, level + 1);
    }
  });
}

printTree(tree);
