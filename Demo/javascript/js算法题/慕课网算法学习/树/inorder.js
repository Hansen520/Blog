/*
  中序遍历
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
  console.log(root.val);
  preorder(root.right);
};
preorder(bt);
// 8
// 4
// 9
// 2
// 5
// 1
// 6
// 3
// 7

const inorder1 = (root) => {
  if (!root) {
    return;
  }
  const stack = [];
  let p = root;
  while (stack.length || p) {
    // 把p左节点全都推入栈中
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const n = stack.pop();
    console.log(n.val);
    p = n.right;
  }
};
inorder1(bt);
