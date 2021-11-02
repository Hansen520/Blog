// 随机生成字符串 length 截取长度
function uuid(length, chars) {
  chars =
    chars || '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  length = length || 8;
  var result = '';
  for (var i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

console.log(uuid(10));
