// 1.对基础类型做一个最基本的一个拷贝；
// 2.对引用类型开辟一个新的存储，并且拷贝一层对象属性。

const shallowClone = (target) => {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = target[prop];
      }
    }
    return cloneTarget;
  }
};
