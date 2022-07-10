/*
  后序遍历
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

const preorder = (root) => {
  if (!root) {
    return;
  }

  preorder(root.left);
  preorder(root.right);
  console.log(root.val);
};
preorder(bt);
// 8
// 9
// 4
// 5
// 2
// 6
// 7
// 3
// 1

const postorder1 = (root) => {
  if (!root) {
    root;
  }
  const outputStack = [];
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    outputStack.push(n);
    if (n.left) stack.push(n.left);
    if (n.right) stack.push(n.right);
  }
  while (outputStack.length) {
    const n = outputStack.pop();
    console.log(n.val);
  }
};

postorder1(bt);
