/*
 * @Date: 2025-01-09 16:12:39
 * @Description: 深度优先遍历，从第⼀个节点开始，遍历其⼦节点，直到它的所
有⼦节点都被遍历完毕，然后再遍历它的兄弟节点
 */
function depthFirstSearch(root) {
  if (root === null) {
    return;
  }
  console.log(root.value);

  for (let i = 0; i < root.children.length; i++) {
    depthFirstSearch(root.children[i]);
  }
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

depthFirstSearch(tree);