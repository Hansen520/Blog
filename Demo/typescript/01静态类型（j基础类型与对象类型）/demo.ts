// 基础类型null、undefined、symbol、boolean、void
const count: number = 123456;
const teacherName: string = 'Han'

// 对象类型
class Person { }

const teacher: {
  name: String,
  age: Number
} = {
  name: 'han',
  age: 11
};

// 以number类型的数组
const numbers: number[] = [1, 2, 3, 4, 5];

const han: Person = new Person();

const getTotal: () => number = () => {
  return 111;
}