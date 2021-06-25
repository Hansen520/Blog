// readonly
// class Person1 {
//   public readonly name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
// }
// const person1 = new Person1('han');
// // 无法分配到 "name" ，因为它是只读属性
// person1.name = 'hello';// 报错
// console.log(person1.name);// han
// ----------------------------------------
/* 抽象类, 抽象类只能被继承 */
// abstract class Geom {
//   width: number;
//   getType() {
//     return 'Geom';
//   }
//   abstract getArea(): number;
// }

// class Circle extends Geom {
//   getArea() {
//     return 123
//   }
// }
// ---------------------------------------

// 具体实例
// 定义一个共有的Person类
interface Person10 {
  name: string
}
interface Teacher extends Person {
  teachingAge: number;
}
interface Student extends Person {
  age: number
}
interface Driver {
  name: string,// 此name也可以继承Person
  age: number
}
const teacher1 = {
  name: 'jin',// 必写
  teachingAge: 2// 选写
}
const student = {
  name: 'lee',// 必写
  age: 18// 选写
}
const getUserInfo = (user: Person10) => {
  console.log(user.name);
}
getUserInfo(teacher1);
getUserInfo(student);