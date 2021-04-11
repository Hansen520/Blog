interface Bird {
  fly: boolean;
  sing: () => {};
}

interface Dog {
  fly: boolean;
  bark: () => {}
}
// 1通过类型断言方式做类型保护
function trainAnial(animal: Bird | Dog) {
  if (animal.fly) {
    (animal as Bird).sing();
  }
}
// 2in 语法做类型保护
function trainAnialSecond(animal: Bird | Dog) {
  if ('sing' in animal) {
    animal.sing();
  } else {
    animal.bark();
  }
}

// 3typeof 语法做类型保护
function add(first: string | number, second: string | number) {
  if (typeof first === 'string' || typeof second === 'string') {
    return `${first}${second}`
  }
  return first + second
}

// 4使用 instanceof 语法来做类型保护
class NumberObj {
  count: number;
}

function addSecond(first: object | NumberObj, second: object | NumberObj) {
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count
  }
  return 0;
}