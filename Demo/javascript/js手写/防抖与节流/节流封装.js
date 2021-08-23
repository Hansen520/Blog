// 节流就是说，在触发时候是没有的，只有规定的时间内才触发事件，然后想要触发时候触再进入到这个函数体
function throttle(fn, delay = 500) {
  let timer = null;
  return function () {
    if (timer) {
      return false;
    }
    timer = setTimeout(() => {
      //要采用箭头函数，采用ES5写法则this会指向window
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}

// test
const oDiv1 = document.getElementById('div1');
oDiv1.addEventListener(
  'drag',
  throttle(function (e) {
    console.log(e.offsetX, e.offsetY);
  }, 1000)
);
