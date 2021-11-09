// 解决普通对象的继承问题的 Object.create 方法，我们在前面这几种继承方式的优缺点基础上进行改造，得出了寄生组合式的继承方式，这也是所有继承方式里面相对最优的继承方式

function clone(parent, child) {
  // 这里改用 Object.create 就可以减少组合继承中多进行一次构造的过程
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

function Parent6() {
  this.name = 'parent6';
  this.play = [1, 2, 3];
}
Parent6.prototype.getName = function () {
  return this.name;
};
function Child6() {
  // 这步阻断new多次带来的影响，不共用一块内存
  Parent6.call(this);
  this.friends = 'child6';
}
// Object.create类似于原型和原型链去继承父级的属性
clone(Parent6, Child6);

Child6.prototype.getFriends = function () {
  return this.friends;
};
let person6 = new Child6();
console.log(person6);
console.log(person6.getName());
console.log(person6.getFriends());
