// setTimeout是过了一段事件后触发函数体
function debounce(fn, delay = 500) {
  // 给闭包使用
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    // 采用箭头函数，如果采用ES5的写法，则this会指向Window
    timer = setTimeout(() => {
      // function(){console.log(oInput.value)}指向this
      // this执行dom元素
      fn.apply(this, arguments);
    }, delay);
  };
}

let oInput = document.getElementById('input');
// 要知道传进去什么，然后返回什么
oInput.addEventListener(
  'keyup',
  debounce(function () {
    console.log(oInput.value);
  }, 600)
);
