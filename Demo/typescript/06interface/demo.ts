// 1.interface 和type相类似，但是不完全一致
interface Person14 {
  readonly id: string //只读属性不可写
  name1: string;
  // 接口中的属性不全是必需的，只是在可选属性名字定义的后面加一个 ? 符号
  age?: number;
  // 有时候我们希望接口允许有任意的属性,如下面的sex就是新增的任意属性
  [propName: string]: any;
  // 定义函数类型
  say(): string
}

// 继承接口，那么继承的Teacher1里面必需有老的还必需有新的东西
interface Teacher1 extends Person14 {
  teach(): string
}


// 定义两个函数
const getPersonName = (person2: Person14): void => {
  console.log(person2.name1);
};
const setPersonName = (person2: Teacher1, name: string): void => {
  person2.name1 = name
};
// 数据必需和定义时候保持一致
const person15 = {
  id: '1',
  name1: 'han',
  sex: 'male',
  say() {
    return ''
  },
  teach() {
    return 'teach'
  }
}
// 传参
getPersonName(person15)
setPersonName(person15, 'lee')

// 2.类类型，我们希望类的实现必须遵循接口定义
class User1 implements Person14 {
  id: '1';
  name1 = 'han';
  say() {
    return 'hello'
  }
}


// 3.定一个函数类型
interface SayHi {
  (word: string): string
}
// 使用函数类型接口
const say: SayHi = (word: string) => {
  return 'word'
}