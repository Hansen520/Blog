let timer = null;
let oInput = document.getElementById('input');
oInput.addEventListener('keyup', function () {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(function () {
    console.log(oInput.value);
  }, 500);
});
