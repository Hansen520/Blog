// 只针对对象  数组没有使用deefineProperty

let arrayProto = Array.prototype; // 数组原型上的方法
let proto = Object.create(arrayProto);
['push', 'shift', 'splice'].forEach((method) => {
  // 这个数组应该也被监控
  proto[method] = function (...args) {
    // 默认插入新的数据
    let inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      // 数组的splice 只有传递三个参数才会有追加效果
      case 'splice':
        // slice(2) 为第三个参数
        inserted = args.slice(2);
      default:
        break;
    }
    console.log('视图更新');
    // 如果进来的还是数据继续包一层走响应式
    ArrayObserver(inserted);
    // Array.prototype.push.call([1,2,3], 4,5,6), 真正能执行push等方法的
    // Array.prototype.push.call([1,2,3], 4,5,6), 真正能执行push等方法的
    arrayProto[method].call(this, ...args);
  };
});
// 监听数组并且响应式
function ArrayObserver(obj) {
  for (let i = 0; i < obj.length; i++) {
    let item = obj[i];
    // 如果是对象会被继续defineReactive
    observer(item);
  }
}

function observer(obj) {
  if (typeof obj !== 'object' || obj == null) {
    return obj;
  }
  if (Array.isArray(obj)) {
    console.log(obj, proto, 42);
    // 方法设置一个指定的对象的原型 ( 即, 内部[[Prototype]]属性）到另一个对象或  null
    // 上面处理的是数组格式 push shift splice(如果调用这三个方法)应该把这个值判断一下是否是对象
    Object.setPrototypeOf(obj, proto);
    ArrayObserver(obj);
  } else {
    // 下面的是处理对象的
    for (let key in obj) {
      // 默认只循环第一层
      defineReactive(obj, key, obj[key]);
    }
  }
}

function defineReactive(obj, key, value) {
  // 嵌套的还是对象走递归
  observer(value);
  Object.defineProperty(obj, key, {
    get() {
      return value;
    },
    // 给某个key设置值的时候，可能也是一个对象
    set(newValue) {
      if (value !== newValue) {
        observer(newValue);
        value = newValue;
        console.log('视图更新', 61);
      }
    },
  });
}
// let testData = {
//   a: 1,
//   b: 2,
//   c: 3,
// };
// observer(testData);
// testData.a = 10;
// ----------------------
let data = {
  d: [1, 2, 3, { name: 'zf' }],
};
observer(data);
data.d.push({ name: 'zf' });
// data.d[4].name = 'jw';

// 特点: 使用对象的时候 必须先声明属性，这个属性才是响应式的
// 1. 增加不存在的属性 不能更新视图(vm.$set)
// 2.默认会递归增加 getter和setter
// 3. 数组里套对象 对象是支持响应式变化的， 如果式常量则没有效果
// 4. 修改数组索引和长度 是不会导致视图更新的
// 5. 如果新增的数据 vue中也会帮你监控(对象类型)
