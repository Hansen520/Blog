var source = [
  {
    id: 1,
    pid: 0,
    name: 'body',
  },
  {
    id: 2,
    pid: 1,
    name: 'title',
  },
  {
    id: 3,
    pid: 1,
    name: 'div',
  },
  {
    id: 4,
    pid: 3,
    name: 'span',
  },
  {
    id: 5,
    pid: 3,
    name: 'icon',
  },
  {
    id: 6,
    pid: 4,
    name: 'subspan',
  },
];

function toTree(data) {
  // 拷贝一份
  const newData = deepClone(data);
  let result = [];
  if (!Array.isArray(newData)) {
    return result;
  }
  newData.forEach((item) => {
    delete item.children;
  });
  let map = {};
  newData.forEach((item) => {
    map[item.id] = item;
  });
  newData.forEach((item) => {
    let parent = map[item.pid];
    // 如果找到parent就往parent里面添加孩子节点
    // delete item.pid; // 删除了pid后(因为与后台对接不需要pid)，此函数只能调用1次，否则就会找不到pid
    if (parent) {
      // 这种写法要牢牢记住了
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });
  return result[0];
}
console.log(toTree(source));
