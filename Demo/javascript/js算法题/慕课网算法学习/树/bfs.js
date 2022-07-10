/**
 *广度优先入队
 * 1.新建一个队列，把根节点入队
 * 2.把对头出队并访问
 * 3.把对头的children挨个入队
 * 4.重复第二、三步，直到队列为空
 */
const tree = {
  val: 'a',
  children: [
    {
      val: 'b',
      children: [
        {
          val: 'd',
          children: [],
        },
        {
          val: 'e',
          children: [],
        },
      ],
    },
    {
      val: 'c',
      children: [
        {
          val: 'f',
          children: [],
        },
        {
          val: 'g',
          children: [],
        },
      ],
    },
  ],
};

const bfs = (root) => {
  const q = [root];
  while (q.length > 0) {
    console.log(q);
    const n = q.shift();
    console.log(n.val);
    n.children?.forEach((child) => {
      q.push(child);
    });
  }
};
bfs(tree);
