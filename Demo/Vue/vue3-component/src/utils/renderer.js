import { createRenderer } from '@vue/runtime-core';

let ctx;
function draw(ele, isChild) {
  if (!isChild) {
    ctx.clearRect(0, 0, 500, 500);
  }
  ctx.fillStyle = ele.fill || 'white';
  ctx.fillRect(...ele.pos);
  if (ele.text) {
    ctx.fillStyle = ele.color || 'white';
    ele.fontSize = ele.type === 'h1' ? 20 : 12;
    ctx.font = (ele.fontSize || 18) + 'px serif';
    ctx.fillText(ele.text, ele.pos[0] + 10, ele.pos[1] + ele.fontSize);
  }
  ele.child &&
    ele.child.forEach((c) => {
      console.log('child:::', c);
      draw(c, true);
    });
}

let { createApp: originCa } = createRenderer({
  insert: (child, parent, anchor) => {
    if (typeof child === 'string') {
      parent.text = child;
    } else {
      child.parent = parent;
      if (!parent.child) {
        parent.child = [child];
      } else {
        parent.child.push(child);
      }
      if (parent.nodeName) {
        draw(child);
        if (child.onClick) {
          ctx.canvas.addEventListener(
            'click',
            () => {
              child.onClick();
              setTimeout(() => {
                draw(child);
              });
            },
            false
          );
        }
      }
    }
  },
  createElement(type, isSVG, isCustom) {
    return {
      type,
    };
  },
  setElementText(node, text) {
    node.text = text;
  },
  patchProp(el, key, prev, next) {
    el[key] = next;
  },
});

function createApp(...args) {
  let app = originCa(...args);
  return {
    mount(selector) {
      let canvas = document.createElement('canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      document.querySelector(selector).appendChild(canvas);
      ctx = canvas.getContext('2d');
      app.mount(canvas);
    },
  };
}
export { createApp };
