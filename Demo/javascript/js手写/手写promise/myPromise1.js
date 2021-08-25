// 基础班promise
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
class Promise {
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;
    this.status = 'PENDING';
    // 存储回调用于发布订阅, 用来存储then中的回调
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    // 函数在调用时候执行
    const resolve = (value) => {
      // 防止变化状态
      if (this.status == PENDING) {
        this.value = value;
        this.status = FULFILLED;
        // 发布
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      if (this.status == PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        // 发布
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      // 执行器，调用后传函数
      executor(resolve, reject);
    } catch (e) {
      // 如果执行时发生了异常就会将异常做为失败传送出去
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status == FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.status == REJECTED) {
      onRejected(this.reason);
    }
    // 如果.then时候还是挂起状态，则应该是触发了异步逻辑
    if (this.status === PENDING) {
      // 可以采用发布订阅, 走的异步逻辑, 因为这个时候用户没有调用成功或者失败  没有resolve和reject
      this.onResolvedCallbacks.push(() => {
        console.log('自定义逻辑');
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}

module.exports = Promise;

// node 默认不支持
