const dom = new Proxy(
  {},
  {
    get(target, property) {
      return function (attrs = {}, ...children) {
        const el = document.createElement(property);
        console.log(attrs, 7);
        for (let prop of Object.keys(attrs)) {
          el.setAttribute(prop, attrs[prop]);
        }
        for (let child of children) {
          if (typeof child === "string") {
            child = document.createTextNode(child);
          }
          el.appendChild(child);
        }
        return el;
      };
    },
  }
);

const el = dom.div(
  {},
  "Hello, my name is ",
  dom.a({ href: "https://js.check" }, "JavaScript"),
  ". I Like:",
  dom.ul({}, dom.li({}, "The web"), dom.li({}, 'Food'), dom.li({}, '...actually that\'s it'))
);
document.body.appendChild(el);
