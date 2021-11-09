// 使用原型式继承可以获得一份目标对象的浅拷贝，然后利用这个浅拷贝的能力再进行增强，添加一些方法，这样的继承方式就叫作寄生式继承。

let parent5 = {
  name: 'parent5',
  friends: ['p1', 'p2', 'p3'],
  getName: function () {
    return this.name;
  },
};

function clone(original) {
  let clone = Object.create(original);
  clone.getFriends = function () {
    return this.friends;
  };
  return clone;
}

let person5 = clone(parent5);
console.log(person5.getName());
console.log(person5.getFriends());
