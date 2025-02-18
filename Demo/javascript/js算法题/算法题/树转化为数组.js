/*
 * @Date: 2025-01-10 11:03:43
 * @Description: description
 */
function treeToArray(tree, result = [], level = 0, parent = null) {
    if (!Array.isArray(tree)) {
      throw new Error('Expected an array for the tree structure.');
    }
  
    tree.forEach(node => {
      // 这里可以根据需要添加额外的属性，例如层级(level)和父节点(parent)
      const newNode = {
        ...node,
        level: level,
        parent: parent
      };
  
      // 将当前节点添加到结果数组中
      result.push(newNode);
  
      // 如果当前节点有子节点，递归调用treeToArray
      if (node.children && node.children.length > 0) {
        treeToArray(node.children, result, level + 1, newNode);
      }
    });
  
    return result;
  }
  
  // 示例树结构
  const tree = [
    {
      id: 1,
      name: '节点1',
      children: [
        {
          id: 2,
          name: '节点1-1',
          children: [
            {
              id: 4,
              name: '节点1-1-1'
            }
          ]
        },
        {
          id: 3,
          name: '节点1-2'
        }
      ]
    }
  ];
  
  // 调用函数并打印结果
  const array = treeToArray(tree);
  console.log(array);
  