// 计算最近请求次数
// 输入: inputs = [[], [1], [100], [3001], [3002]];
// 输出: [(null, 1, 2, 3)];
// 有新请求就入队，3000ms前发出的请求出队
// 队列的长度就是最近请求次数

var RecentCounter = function () {
  this.q = [];
};

RecentCounter.prototype.ping = function (t) {
  this.q.push(t);
  // 就是小于3000mm的请出队列，以请求最近3000mm内的请求次数
  while (this.q[0] < t - 3000) {
    this.q.shift();
  }
  return this.q.length;
};

var recentCounter = new RecentCounter();
console.log(recentCounter.ping(1));
console.log(recentCounter.ping(100));
console.log(recentCounter.ping(3001));
console.log(recentCounter.ping(3002));
console.log(recentCounter.ping(3009));
console.log(recentCounter.ping(4009));
console.log(recentCounter.ping(6009));
console.log(recentCounter.ping(6010));

// 时间复杂度 o(n) 空间复杂度  o(n) n是最近的请求的次数
