// 此方法结合了1中的原型链的继承又结合了2中构造函数继承
function Parent3() {
  this.name = 'parent3';
  this.play = [1, 2, 3];
}

Parent3.prototype.getName = function () {
  return this.name;
};

function Child3() {
  // 第二次调用Parent3
  Parent3.call(this);
  this.type = 'child3';
  console.log(this, 15);
}

// 第一次调用Parent3()
Child3.prototype = new Parent3();
// 手动挂上构造器，指向自己的构造函数
Child3.prototype.constructor = Child3;
var s3 = new Child3();
var s4 = new Child3();
s3.play.push(4);
console.log(s3.getName()); // 正常输出'parent3'
console.log(s4.getName()); // 正常输出'parent3'

// 缺点
// 通过注释我们可以看到 Parent3 执行了两次，第一次是改变Child3 的 prototype 的时候，
// 第二次是通过 call 方法调用 Parent3 的时候，那么 Parent3 多构造一次就多进行了一次性能开销，
// 这是我们不愿看到的。
// 所以我们看看解决办法4有说明更好的办法把
