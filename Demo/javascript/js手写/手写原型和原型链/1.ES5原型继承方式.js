// 1原型链继承
function Parent1() {
  this.name = 'parent1';
  this.play = [1, 2, 3];
}
function Child1() {
  this.type = 'child2';
}
Child1.prototype = new Parent1();
console.log(new Child1());

// 缺点
var s1 = new Child1();
var s2 = new Child1();
s1.play.push(4);
console.log(s1.play, s2.play);
// 因为两个实例使用的是同一个原型对象。
// 它们的内存空间是共享的，当一个发生变化的时候，另外一个也随之进行了变化，
// 这就是使用原型链继承方式的一个缺点。

// 解决方案看2 构造器继承
