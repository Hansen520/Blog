// 数组
const arr: (number | string)[] = [1, '2', 3, undefined];
const stringArr: string[] = ['a', 'b', 'c'];
const undefinedArr: undefined[] = [undefined]

// type alias 类型别名
type User = { name: string, age: number }

const OnjectArr: User[] = [
  {
    name: 'han',
    age: 2
  }
]

// 或
class Teacher {
  name: string;
  age: number;
}
const objectArr2: Teacher[] = [
  new Teacher(),
  {
    name: 'han',
    age: 22
  }
  
]


// 元组 tuple,数量有限的数组
const teacherInfo: [string, string, number] = ['han', 'mall', 18]
// 比如说处理csv的文件(代表数组里面的元组,每项类型固定的时候)
const tracherList: [string, string, number][] = [
  ['han', 'male', 13],
  ['sun', 'female', 22]
]