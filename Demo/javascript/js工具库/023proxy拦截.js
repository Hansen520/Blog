var person = {
  name: "张三",
};

var proto = new Proxy(person, {
  get: function (target, key, receiver) {
    if (key in target) {
      console.log(target[key]);
      return target[key];
    } else {
      // 发现不存在的属性，抛出错误
      throw new ReferenceError('Prop name "' + key + '" does not exist.');
    }
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  },
});

// 拦截读取继承属性
let obj = Object.create(proto);
obj.name
obj.add
