/*
 * @Date: 2025-06-11 11:23:16
 * @Description: description
 */
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      // 触发了后，定时器在limit时间里执行
      setTimeout(() => (inThrottle = false), limit); // 不受其他的影响
    }
  };
}

const oDiv1 = document.getElementById("div1");
oDiv1.addEventListener(
  "drag",
  throttle((e) => {
    console.log(e.offsetX, e.offsetY);
  }, 2000)
);
