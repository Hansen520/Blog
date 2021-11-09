// ES5 里面的 Object.create 方法，这个方法接收两个参数：一是用作新对象原型的对象、二是为新对象定义额外属性的对象（可选参数）
let parent4 = {
  name: 'parent4',
  friends: ['p1', 'p2', 'p3'],
  getName: function () {
    return this.name;
  },
};

let person4 = Object.create(parent4);
person4.name = 'tom';
person4.friends.push('jerry');

let person5 = Object.create(parent4);
person5.friends.push('lucy');

console.log(person4.name);
console.log(person4.name === person4.getName());
console.log(person5.name);
console.log(person4.friends);
console.log(person5.friends);

// 缺点
// 多个实例的引用类型属性指向相同的内存，存在篡改的可能
