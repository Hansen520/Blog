/*
 * @Date: 2025-01-09 16:26:04
 * @Description: description
 */
function breadthFirstSearch(root) {
    if (root === null) {
        return;
    }

    // 使用队列来进行广度优先遍历
    const queue = [root];

    while (queue.length > 0) {
        const currentNode = queue.shift(); // 取出队列中的第一个节点
        console.log(currentNode.value); // 处理当前节点

        // 将当前节点的所有⼦节点加⼊队列
        for (const child of currentNode.children) {
            queue.push(child);
        }
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
  
  breadthFirstSearch(tree);