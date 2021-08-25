// 链式调用版 promise
// 挂起状态
const PENDING = 'PENDING';
// 成功状态
const FULFILLED = 'FULFILLED';
// 失败状态
const REJECTED = 'REJECTED';
// 在编写代码时候， 如果typeof xxx.then === 'function' 就姑且认为他是promise， 没法细分了
const resolvePromise = (x, promise2, resolve, reject) => {
  // 处理x导致的peomise是成功还是失败
  // 如果x是普通值 直接调用promise2的resolve
  // 如果x是一个promise 那么就采用x的状态。并且将结果继续调用promise2的resolve和reject向下传递
  if (promise2 === x) {
    return reject(new TypeError('不能自己等待自己完成, 出错了！'));
  }
  // 别人家的promise可以是函数
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    // 加上一个变量boolean，防止调用成功后又调用失败
    let called;
    // 才有可能是一个promise，有promise才可以.then
    try {
      // 因为用户返回的可能有一个then属性，一取值就报错了
      let then = x.then;
      // 无法在细化了, 有then说明就是promise了
      if (typeof then === 'function') {
        // 这里就是promise了，获取promise成功的值或者是失败的值
        then.call(
          x, // x代表还没有.then的promise这个对象
          (y) => {
            if (called) return;
            called = true;
            console.log(y, 27);
            // 因为y有可能是promise， 看前面的3， 所以要递归
            // 不停的解析直到是一个普通值为止就else出去
            resolvePromise(y, promise2, resolve, reject);
            // resolve(y);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        ); //用上次就好， 不要写成 x.then(), 因为如果then方法是通过defineProperty来定义的就会再次调用get方法
      } else {
        // x做为普通值
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      // 那么直接用x做为成功的结果
      reject(e);
    }
  } else {
    // 否则一定是一个普通的值，那么就直接让这个promise变成成功态
    resolve(x);
  }
};
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
      // 执行器，调用后传函数，入口
      executor(resolve, reject);
    } catch (e) {
      // 如果执行时发生了异常就会将异常做为失败传送出去
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    // 可选参数的含义就是用户不给，就用默认的， v是前面用户随意给的值， 也可以不给值
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err;
          };
    // 记住，Promise是立即执行函数， 这样子可以产生一个全新的Promise,然下一次then时候是全新的
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        // 再包一层定时器(进入异步队列)，避免传入promise2时候未初始化
        setTimeout(() => {
          // 异步时候出错的时候
          try {
            // then的返回值
            let x = onFulfilled(this.value);
            // 传入(then中返回的值， 当前promise对象, 当前的resolve, 当前的reject)
            resolvePromise(x, promise2, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          // 异步出错的时候
          try {
            let x = onRejected(this.reason);
            // 传入(then中返回的值， 新的promise对象, 当前的resolve, 当前的reject)
            resolvePromise(x, promise2, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      // 如果.then时候还是挂起状态，则应该是触发了异步逻辑
      if (this.status === PENDING) {
        // 可以采用发布订阅, 走的异步逻辑, 因为这个时候用户没有调用成功或者失败  没有resolve和reject
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            // 处理异常错误的时候
            try {
              console.log('自定义逻辑success');
              let x = onFulfilled(this.value);
              resolvePromise(x, promise2, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            // 处理异常错误的时候
            try {
              console.log('自定义逻辑error');
              let x = onRejected(this.reason);
              resolvePromise(x, promise2, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }
}

// 默认测试的时候会调用次方法， 会检测这个方法返回的对象是不是符合规范，需要又promise的resolve和reject
// 测试 npm i promises-aplus-tests -g
Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
module.exports = Promise;
