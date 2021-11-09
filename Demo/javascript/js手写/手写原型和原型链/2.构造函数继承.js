function Parent1() {
  this.name = 'parent1';
  this.play = [1, 2, 3];
}

Parent1.prototype.getName = function () {
  return this.name;
};

function Child1() {
  Parent1.call(this);
  this.type = 'child1';
}

let child = new Child1();
let child1 = new Child1();

child.play.push(4);
console.log(child); // 对
console.log(child.play); // [ 1, 2, 3, 4 ]
console.log(child1.play); // [ 1, 2, 3 ]
console.log(child.getName()); // 报错 child.getName is not a function
// 缺点
// 虽然解决了1中的问题，但是父类原型对象中一旦存在父类之前自己定义的方法，那么子类将无法继承这些方法。
