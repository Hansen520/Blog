/*
  先序遍历
*/
const bt = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: {
        val: 8,
        left: null,
        right: null,
      },
      right: {
        val: 9,
        left: null,
        right: null,
      },
    },
    right: {
      val: 5,
      left: null,
      right: null,
    },
  },
  right: {
    val: 3,
    left: {
      val: 6,
      left: null,
      right: null,
    },
    right: {
      val: 7,
      left: null,
      right: null,
    },
  },
};

// const preorder = (root) => {
//   if (!root) {
//     return;
//   }
//   console.log(root.val);
//   preorder(root.left);
//   preorder(root.right);
// };
// preorder(bt);
// 1
// 2
// 4
// 8
// 9
// 5
// 3
// 6
// 7

// 非递归版本的
const preorder1 = (root) => {
  if (!root) {
    return;
  }
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    console.log(n.val);
    // 这里要考虑栈的原则
    if (n.right) stack.push(n.right);
    if (n.left) stack.push(n.left);
  }
};

preorder1(bt);
