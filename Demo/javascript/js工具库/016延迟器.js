// 单次执行
// async function sleep(delay) {
//   return new Promise((resolve) => setTimeout(resolve, delay));
// }
// async function foo(x) {
//   const t0 = Date.now();
//   await sleep(x); // 停留x毫秒
//   console.log(Date.now() - t0);
// }
// foo(1500);

// 多条执行
async function radomDelay(id) {
  // 延迟0~1000毫秒
  const delay = Math.random() * 1000;
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(id + ' finished');
      resolve();
    }, delay)
  );
}
async function foo() {
  const t0 = Date.now();
  /* ----------顺序执行--------- */
  // await radomDelay(0);
  // await radomDelay(1);
  // await radomDelay(2);
  // await radomDelay(3);
  // await radomDelay(4);

  // for (let i = 0; i < 5; i++) {
  //   await radomDelay(i);
  // }

  /*------------随机执行-------------*/
  // 就是这串代码先全部执行一遍，肯定有快有慢
  // const p0 = radomDelay(0);
  // const p1 = radomDelay(1);
  // const p2 = radomDelay(2);
  // const p3 = radomDelay(3);
  // const p4 = radomDelay(4);
  // 因为reslove后的结果需要await支持
  // await p0;
  // await p1;
  // await p2;
  // await p3;
  // await p4;

  const promises = Array(5)
    .fill(null)
    .map((_, i) => radomDelay(i));
  for (const p of promises) {
    await p;
  }
  console.log(`${Date.now() - t0}ms elapsed`);
}

foo();
