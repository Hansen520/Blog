/*
 * @Date: 2025-01-09 09:57:27
 * @Description: ⼆叉查找树-判断⼀个数组，是否为某⼆叉查找树的"前序"遍历结果，⼆叉查找树特点是所有的左节
 * 点⽐⽗节点的值⼩，所有的右节点⽐⽗节点的值⼤
 * 
 * 这段代码的工作原理是：

使用一个栈来维护可能的根节点值。
遍历前序遍历数组，对于每个元素：
如果当前元素小于栈顶元素，那么它不能是该栈顶元素的右子节点，因此返回false。
如果当前元素大于栈顶元素，那么它可能是栈顶元素的右子节点，我们需要找到合适的根节点。我们不断弹出栈顶元素，直到找到一个比当前元素小的值，或者栈为空。
将当前元素推入栈中，作为未来子树的潜在根节点。

其实就是依托右子树找大于根节点的值
 */

function isValidPreOrder(preOrder) {
  let stack = [];
  let root = Number.MIN_SAFE_INTEGER; // -(2^53 - 1) = -9007199254740991

  for (let i = 0; i < preOrder.length; i++) {
    // 如果当前元素小于栈顶元素，说明它不可能是栈顶元素的右子节点
    if (preOrder[i] < root) {
      return false;
    }
    // 找到当前子树的根节点，即当前元素应该小于的值
    while (stack.length > 0 && preOrder[i] > stack[stack.length - 1]) {
      root = stack.pop();
    }

    // 将当前元素推入栈中，作为下一个子树的潜在根节点
    stack.push(preOrder[i]);
  }

  return true;
}
// i
// 0,1,2,3,4
// root
// -(2^53 - 1),5        
// stack
// 8,7

// ⽰例
const preOrderTraversal = [8, 5, 1, 7, 10, 12];
const notPreOrderTraversal = [8, 5, 10, 1, 7, 12];
console.log(isValidPreOrder(preOrderTraversal)); // 应该输出 true
console.log(isValidPreOrder(notPreOrderTraversal)); // 应该输出 false
