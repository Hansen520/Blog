const data = new Array(10000).fill(0).map((_, i) => i);
const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  const consumer = (item, i) => {
    const div = document.createElement("div");
    div.style.display = "inline-block";
    div.textContent = i;
    document.body.appendChild(div);
  };
  // 由这个函数决定函数什么时候执行
  const chunkSplitor = (task) => {
    setTimeout(() => {
        // 空闲时间小于16ms说明可以执行
        task((time) => time < 16);
    }, 30);
  };
  performChunk(data, consumer, chunkSplitor);

  // 定义一个函数performChunk，用于处理数据块
function performChunk(data, consumer, chunkSplitor) {
    // 利用下归一化思想
    if (typeof data === "number") {
      data = new Array(data);
    }

    // chunkSplitor的参数用于决定剩余时间是否由自己定义
    if (!chunkSplitor && globalThis.requestIdleCallback) {
        chunkSplitor = (task) => {
            requestIdleCallback(idle => {
                task(() => idle.timeRemaining() > 0);
            });
        }
    }
  
    if (data.length === 0) return;
  
    let i = 0;
  
    // 定义一个函数_run
    function _run() {
      // 如果i等于data的长度，则返回
      if (i === data.length) return;
  
      chunkSplitor((hasTime) => {
        const now = Date.now();
        while (hasTime(Date.now() - now) && i < data.length) {
          // 就是说执行代码后的时间是否还在当前时间内
          // 如果当前时间减去now的时间小于hasTime的时间，并且i小于data的长度，则执行任务
          console.log("空闲时间", Date.now() - now);
          // 这一帧存在空闲时间
          const item = data[i];
          // 执行任务
          consumer(item, i);
          i++;
        }
        _run(); // 继续执行
      });
    }
    _run();
  }
});

