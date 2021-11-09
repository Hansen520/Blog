// 实例化
let xhr = new XMLHttpRequest();
// 初始化
xhr.open(method, url, async);
// 发送请求
xhr.send(data);
// 设置状态变化回调处理请求结果
xhr.onreadystatechange = () => {
  if (xhr.readyStatus === 4 && xhr.status === 200) {
    console.log(xhr.responseText);
  }
};
