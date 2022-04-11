/*
  1. 返回的属性具有什么特性？
  2. 包括继承的属性吗？
  3. 返回的属性顺序是什么样的？
  4. 属性中有负数和小数，返回的顺序是什么样的？
  5. 属性中有Symbol值，返回的顺序是什么样的？
  6. Object.keys(null) && Object.keys(undefined)
  7. Object.keys(123)
  8. Object.keys('123')
*/

// 1. 返回的属性具有什么特性？
// 代码段1
const obj1 = {
  a: 'aa',
  b: 'bb',
  c: 'cc',
};
Object.keys(obj1); // ['a', 'b', 'c']

// 代码段2
const obj2 = Object.create(
  {},
  {
    getFoo: {
      value: () => this.foo,
      enumerable: true, // 为true可以枚举getFoo
    },
  }
);
obj2.foo = 1;
Object.keys(obj2); // ['getFoo', 'foo']

// 2. 包括继承的属性吗？
class A {
  constructor(name) {
    this.name = name;
  }
}
class B extends A {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
}
const b = new B('cat', 18);
Object.keys(b); // ['name', 'age']

// 3.返回的属性顺序是什么样的？
// 5. 属性中有Symbol值，返回的顺序是什么样的？
/*
  Number: 大于0的整数，进行排序返回
  string: 按照定义的顺序返回
  Symbol: 过滤掉，不返回
*/
const sa = Symbol('a');
const obj3 = {
  5: '5',
  a: 'a',
  1: '1',
  c: 'c',
  3: '3',
  b: 'b',
};
obj3[sa] = 'sa';
Object.keys(obj3); // 数字会在前 ['1', '3', '5', 'a', 'c', 'b']

// 4.属性中有负数和小数，返回的顺序是什么样的？
/*
  Number: 大于等于0的整数，进行排序返回(对于负数和小数，不进行排序，当作字符串处理)
  string: 按照定义的顺序返回
  Symbol: 过滤掉，不返回
*/
Object.keys({
  3: '3',
  0: '0',
  1: '1',
  '-1': '-1',
  '-2': '-2',
  0.2: '0.2',
}); // ['1', '3', '-1', '-2', '0.2']

// 6.Object.keys(null) && Object.keys(undefined)
Object.keys(null); // Cannot convert undefined or null to object
Object.keys(undefined);

// 7.Object.keys(123)
// Number -> Number(123)
Object.keys(123); // []

// 8.Object.keys('123')
// 字符串->String(字符串)
Object.keys('123'); // ['0', '1', '2']
