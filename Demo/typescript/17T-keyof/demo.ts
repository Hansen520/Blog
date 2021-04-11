interface Person {
  name: string;
  age: number;
  gender: string
}

class Teacher {
  constructor(private info: Person) {}
  getInfo<T extends keyof Person>(key: T): Person[T]{
    return this.info[key]
  }
}

/*
  代码解释，通过循环,
  第一次
  type T = 'name' name类型
  所以: 参数key 也是name类型 key: name
  返回值就是Person['name']

  第二次
  type T = 'age' 类型
  所以: 参数key 也是age类型
  返回值就是Person['age']

  第三次
  type T = 'gender' 类型
  所以: 参数key 也是gender类型
  返回值就是Person['gender']
*/


const teacher = new Teacher({
  name: 'han',
  age: 18,
  gender: 'male'
})
// 如果没有<T extends keyof Person> 对person的循环，我们就不知道test是何种类型了
// 但是多了这个之后, 我们就可以传入参数就可以对应相对应的类型
const test = teacher.getInfo('name')