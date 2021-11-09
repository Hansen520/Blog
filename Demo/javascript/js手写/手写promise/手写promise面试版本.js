function myPromise(constructor) {
  let self = this;
  self.status = 'pending'; // 定义了状态改变前的初始状态
  self.value = undefined; // 定义了状态未resolved的时候的状态
  self.reason = undefined; // 定义了状态未rejected的时候的状态
  function resolve(value) {
    // 两个==='pending',保证了状态的改变是不可逆的
    if (self.status === 'pending') {
      self.value = value;
      self.status = 'resolved';
    }
  }
  function reject(reason) {
    // 两个==='pending',保证了状态的改变是不可逆的
    if (self.status === 'pending') {
      self.reason = reason;
      self.status = 'rejected';
    }
  }
  // 捕获构造异常
  try {
    constructor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

// 定义链式调用then的方法
myPromise.prototype.then = function (onFullfilled, onRejected) {
  let self = this;
  switch (self.status) {
    case 'resolved':
      onFullfilled(self.value);
      break;
    case 'rejected':
      onRejected(self.reason);
      break;
    default:
  }
};
