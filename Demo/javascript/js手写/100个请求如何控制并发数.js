/*
 * @Author: Hansen
 * @Date: 2023-05-17 16:19:01
 * @LastEditors: Hansen
 * @LastEditTime: 2023-05-17 17:43:11
 * @FilePath: \lz-frontend-screend:\project\Blog\Demo\javascript\js手写\100个请求如何控制并发数.js
 * @Description: description
 */

/*
    并发：并发是多个任务同时交替的执行（因为cpu执行指令的速度非常之快，它可以不必按顺序一段代码一段代码的执行，这样效率反而更加低下），这样看起来就是一起执行的，所以叫并发。
    并行：可以理解为多个物理cpu或者有分布式系统，是真正的'同时'执行
    并发控制：意思是多个并发的任务，一旦有任务完成，就立刻开启下一个任务
    切片控制：将并发任务切片的分配出来，比如10个任务，切成2个片，每片有5个任务，当前一片的任务执行完毕，再开始下一个片的任务，这样明显效率没并发控制那么高了
*/

/*
    循环去启动能执行的任务
    取出任务并且推到执行器执行
    执行器内更新当前的并发数，并且触发捞起任务
    捞起任务里面可以触发最终的回调函数和调起执行器继续执行任务
*/

// 设计一个函数，可以限制请求的并发，同时请求结束之后，调用callback函数
// sendRequest(requestList:,limits,callback):void
/* 函数执行 */
sendRequest(
  [() => request("1"), () => request("2"), () => request("3"), () => request("4")],
  3, //并发数
  (res) => {
    console.log(res, 100);
  }
);

// request函数
function request(url, time = 1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("请求结束" + url);
      // 下面时请求结束后的继续执行
      if (Math.random() > 0.5) {
        resolve("成功");
      } else {
        reject("失败");
      }
    }, time * 1e3);
  });
}
// 实现一
function sendRequest(requestList, limits, callback) {
  // 定义执行队列，表示所有待执行的任务
  const promises = requestList.slice(); // 浅拷贝一次
  // 定义开始时执行的并发数量
  const concurrentNum = Math.min(limits, requestList.length);
  let concurrentCount = 0; // 当前并发数
  // 启动初次能执行的任务
  const runTaskNeeded = () => {
    let i = 0;
    while (i < concurrentNum) {
      i++;
      // 同步调用runTask三次
      runTask();
    }
  };

  // 取出任务并推送到执行器
  const runTask = async () => {
    // 取出任务
    const task = promises.shift();
    task && runner(task);
  };

  // 执行器，这里去执行任务
  const runner = async (task) => {
    try {
      // 并发数量++
      concurrentCount++;
      // 只有这个微任务执行完毕后才能跳到下一步
      await task();
    } catch (error) {
      console.log(error, 82);
    } finally {
      // 并发数量--
      concurrentCount--;
      // 捞起下一个任务
      picker();
    }
  };

  // 捞起下一个任务
  const picker = () => {
    // 任务队列里还有任务并且此时还有剩余并发数的时候，执行
    if (concurrentCount < limits && concurrentCount > 0) {
      // 继续执行任务,继续冲任务队列里面shift后执行task任务
      runTask();
    } else if (promises.length == 0 && concurrentCount == 0) {
      // 执行结束
      callback && callback("全部执行结束");
    }
  };

  
  // 开始执行
  runTaskNeeded();
}

// 实现二
async function sendRequest(requestList, limits, callback) {
    // 维护一个promise队列
    const promises = [];
    // 当前的并发池， 用Set方便操作
    const pool = new Set();
    // 开始并发执行所有的任务
    for (let request of requestList) {
      // 开始执行前，先用await 判断 当前的并发任务是否操过限制
      if (pool.size >= limits) {
        // 这里因为没有try catch， 所以要捕获一下错误，不然影响下面的微任务执行
        // 利用await Promise.race这个pool，不就知道是否有任务执行完毕
        await Promise.race(pool).catch((error) => {
            console.log(error, 121);
            return error;
        });
      }
      const promise = request(); // 拿到promise
      // 删除请求结束后，从pool里面移除
      const cb = () => {
        pool.delete(promise);
      };
      // 注册下then任务， 无论成功和失败都去执行
      promise.then(cb, cb);
      // 增加任务
      pool.add(promise);
      // 推进任务
      promises.push(promise);
    }
    // 等最后一个for await 结束，这里是属于最后一个 await 后面的 微任务
    // 注意这里其实是在微任务当中了，当前的promises里面是能确保所有的promise都在其中(前提是await那里命中了if)
    Promise.allSettled(promises).then(callback, callback);
  }
