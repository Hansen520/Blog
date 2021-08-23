const oDiv1 = document.getElementById('div1');
let timer = null;
oDiv1.addEventListener('drag', function (e) {
  if (timer) {
    return false; //事件停止执行并跳出函数
  }
  // timer也可以是执行的次数
  timer = setTimeout(function () {
    // console.log(timer)
    console.log(e.offsetX, e.offsetY);
    // 因为timer为null，这个定时器才能持续运行
    timer = null; // 因为是null，所以继续执行这个计时器
  }, 500); // 500秒后执行函数体，此时timer有值了，如果此时停止滑动，则执行判断语句
});
