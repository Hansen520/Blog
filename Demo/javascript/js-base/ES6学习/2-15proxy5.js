// 只要读写的属性名的第一个字符是下划线，一律抛错，从而达到禁止读写内部属性的目的。

const handler = {
  get(target, key) {
    invariant(key, 'get');
    return target[key];
  },
  set(target, key, value) {
    invariant(key, 'set');
    target[key] = value;
    return true;
  },
};

function invariant(key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}

const target = {};
const proxy = new Proxy(target, handler);
proxy._prop;
proxy._prop = 'c';
