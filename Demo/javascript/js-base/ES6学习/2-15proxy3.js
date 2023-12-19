// 实现一个生成各种 DOM 节点的通用函数dom
// 我们可以用proxy去完成一些递归操作
const dom = new Proxy(
  {},
  {
    get(target, property) {
      // console.log(property, 7);
      return function (attrs = {}, ...children) {
        console.log(attrs, children, 9);
        const el = document.createElement(property);
        for (let prop of Object.keys(attrs)) {
          el.setAttribute(prop, attrs[prop]);
        }
        for (let child of children) {
          if (typeof child === 'string') {
            child = document.createTextNode(child);
          }
          el.appendChild(child);
        }
        // 最后返回整个el
        return el;
      };
    },
  }
);

const el = dom.div(
  {},
  'Hello, my name is ',
  // 在循环中触发第二次代理
  dom.a({ href: 'https://www.baidu.com' }, 'Mark'),
  '. I like:',
  dom.ul(
    {},
    dom.li({}, 'The web'),
    dom.li({}, 'Food'),
    dom.li({}, "…actually that's it")
  )
);

document.body.appendChild(el);
