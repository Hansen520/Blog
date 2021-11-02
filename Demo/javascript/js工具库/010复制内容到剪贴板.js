// 要触发按钮才行
function copyToBoard(value) {
  const element = document.createElement('textarea');
  document.body.appendChild(element);
  element.value = value;
  element.select();
  if (document.execCommand('copy')) {
    document.execCommand('copy');
    document.body.removeChild(element);
    return true;
  }
  document.body.removeChild(element);
  return false;
}

copyToBoard('你好啊');
