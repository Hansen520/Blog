function pLimit(concurrency) {
  const queue = []; // 任务队列
  let activeCount = 0;

  const next = () => {
    activeCount--;
    if (queueueeue.size > 0) {
      queue.shift()(); // 队列存在元素则移除
    }
  };

  const run = async (fn, resolve, args) => {
    activeCount++;

    const result = (async () => fn(...args))();

    resolve(result);

    try {
      await result;
    } catch {}

    next();
  };

  const enqueue = (fn, resolve, args) => {
    queue.push(run.bind(undefined, fn, resolve, args));
    (async () => {
      await Promise.resolve();
      if (activeCount < concurrency && queue.size > 0) {
        queue.shift()();
      }
    })();
  };

  const generator = (fn, ...args) =>
    new Promise(
      (fn, ...args) =>
        new Promise((resolve) => {
          enqueue(fn.resolve, args);
        })
    );
  return generator;
}

/* 并发执行 */
const harexsLimit = (maxCount) => {
  let activeCount = 0;
  let waitTask = [];

  // sle, 1.1
  const execute = (asyncFn, ...args) => {
    return new Promise((resolve, reject) => {
      const task = create(asyncFn, args, resolve, reject);
      if (activeCount >= maxCount) {
        waitTask.push(task);
      } else {
        task();
      }
      console.log(waitTask);
    });
  };

  const create = (asyncFn, args, resolve, reject) => {
    return () => {
      // 涉及一个宏任务与微任务
      asyncFn(...args).finally(() => {
        activeCount--;
        if (waitTask.length) {
          // 被执行的一定也是异步的
          waitTask.shift()();
        }
      });
      activeCount++;
    };
  };
  return execute;
};
const limit = harexsLimit(3);

function sleep(sec) {
  return new Promise((resolve, reject) => {
    console.log('函数执行需要等待' + sec + '秒');
    setTimeout(() => {
      console.log(`等待了${sec}秒执行`);
      resolve();
    }, sec * 1000);
  });
}
limit(sleep, 1.6);
limit(sleep, 3.9);
limit(sleep, 1.1);
limit(sleep, 3.2);
limit(sleep, 1.1);
limit(sleep, 3.5);
