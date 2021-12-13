// 手写jsonStingify
function jsonStringify(data) {
  let type = typeof data;

  if (type !== 'object') {
    let result = data;
    // data 可能是基础数据类型的情况
    if (Number.isNaN(data) || data === Infinity) {
      // Nan 和Infinity 序列化返回 'null
      return 'null';
    } else if (
      type === 'function' ||
      type === 'undefined' ||
      type == 'symbol'
    ) {
      // 由于function序列化返回undefined，因此和undefined、symbol一起处理
      return undefined;
    } else if (type === 'string') {
      result = '"' + data + '"';
    }
    return String(result);
  } else if (type === 'object') {
    if (data === null) {
      // typeof null 为'object'的特殊情况
      return 'null';
    } else if (data.toJSON && typeof data.toJSON === 'function') {
      // 转换值如果有toJSON()方法，该方法定义什么值将被序列化
      return jsonStringify(data.toJSON());
    } else if (data instanceof Array) {
      let result = [];
      // 如果是数组，那么数组里面的每一项类型又有可能是多样的
      data.forEach((item, index) => {
        if (
          typeof item === 'undefined' ||
          typeof item === 'function' ||
          typeof item === 'symbol'
        ) {
          result[index] = null;
        } else {
          // 数组里面嵌套数组递归
          result[index] = jsonStringify(item);
        }
      });
      result = '[' + result + ']';
      // 把单引号改为双引号
      return result.replace(/'/g, '"');
    } else {
      // 处理普通对象
      let result = [];
      Object.keys(data).forEach((item, index) => {
        if (typeof item !== 'symbol') {
          // key 如果是symbol对象，忽略
          if (
            data[item] !== undefined &&
            typeof data[item] !== 'function' &&
            typeof data[item] !== 'symbol'
          ) {
            // 键值如果是undefined、function、symbol为属性值，忽略
            result.push('"' + item + '"' + ':' + jsonStringify(data[item]));
          }
        }
      });
      // 包装称一层对象
      return ('{' + result + '}').replace(/'/g, '"');
    }
  }
}

// 测试用例
const test = jsonStringify({
  // 以下是基础类型
  a: undefined,
  b: true,
  c: 100,
  d: Symbol(),
  e: null,
  f: 'qq',
  g: NaN,
  h: Infinity,
  // 以下是对象引用类型
  i: function () {
    return true;
  },
  j: [
    2,
    'wy',
    undefined,
    function () {
      return true;
    },
    Symbol(66),
  ],
  k: /\a/,
  l: new Date(),
  toJSON: function () {
    return 123;
  },
  m: {
    a: Symbol(77),
    b: 22,
  },
});

console.log(test); // "WTF" 会被序列化称"WTF"
