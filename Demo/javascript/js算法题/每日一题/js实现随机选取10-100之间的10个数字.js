function randomNub(aArray, len, min, max) {
  if (len >= max - min) {
    return (
      '超过' + min + '-' + max + '之间的个数范围' + (max - min - 1) + '个的总数'
    );
  }
  if (aArray.length >= len) {
    aArray.sort(function (a, b) {
      return a - b;
    });
    return aArray;
  }
  var nowNub = parseInt(Math.random() * (max - min - 1)) + (min + 1);
  for (var j = 0; j < aArray.length; j++) {
    // 避免取到相同的值
    if (nowNub == aArray[j]) {
      randomNub(aArray, len, min, max);
      return;
    }
  }
  aArray.push(nowNub);
  randomNub(aArray, len, min, max);
  return aArray;
}
var arr = [];
randomNub(arr, 10, 10, 100);
