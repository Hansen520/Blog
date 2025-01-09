/*
 * @Date: 2025-01-09 09:57:27
 * @Description: description
 */
function listToTree(items, parentId = null) {
  return items
    .filter((item) => item.parentId === parentId) // 其实递归到最后，这边返回一个空的集合，那递归也就结束了
    .map((item) => ({ ...item, children: listToTree(items, item.id) }));
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
