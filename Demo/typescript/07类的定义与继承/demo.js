// 定义一个Person类
class Person {
  name = 'hello';
  getName() {
    return this.name;
  }
}
// Teacher类 继承Person类, 那么Person里有的，Teacher也会有
class Teacher extends Person {
  getTeacherName() {
    return 'Teacher';
  }
  // 对Person类中的getName进行重写
  getName() {
    // super指向父级,为调用父级的getName方法
    return super.getName() + ' world';
  }
}
// 实例化Teacher
const teacher = new Teacher();
console.log(teacher.getName()); // hello world
