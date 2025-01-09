/*
 * @Date: 2025-01-09 09:57:27
 * @Description: description
 */
// 为啥会有两个参数呢，这是因为我们传过来的数据的根节点可能不是null，也许是-1，0，所以我们制定一个参数作为根节点
function listToTree(list, parentId = null) {
  if(Object.prototype.toString.call(value) !== '[object Array]') {
    throw new Error('list must be an array')
  } 

  const map = {};
  const roots = [];
  for (let i = 0; i < list.length; i++) {
    map[list[i].id] = { ...list[i], children: [] };
  }

  for (let i = 0; i < list.length; i++) {
    const mappedItem = map[list[i].id]; // ** 获取当前节点, 其实这边map已经将指针指向node了，所以后续的map[node.parentId].children里面推送后，map里面推进的值就也就在roots里面了
    if (list[i].parentId === parentId) {
      roots.push(mappedItem);
    } else {
      map[list[i].parentId].children.push(mappedItem);
    }
  }
  return roots;
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