// 用ES6的class 封装一个Stack类，包括push、pop、peek, 并用此栈的结构将100这个十进制转为二进制
class Stack {
  constructor() {
    this.arr = [];
  }
  // 推入
  push(...args) {
    this.arr = this.arr.concat(args);
    return this.arr.length;
  }
  // 删除
  pop() {
    if (this.arr.length > 0) {
      const deleteVal = this.arr[this.arr.length - 1];
      this.arr.length = this.arr.length - 1;
      return deleteVal;
    }
  }
  // 查看栈顶元素
  peek() {
    if (this.arr.length > 0) {
      return this.arr[this.arr.length - 1];
    }
  }
  // 返回最后结果
  result() {
    return this.arr;
  }
}

function changeTenToSec(num) {
  const stack = new Stack();
  let result = '';
  while (num) {
    stack.push(num % 2);
    num = Math.floor(num / 2);
  }
  while (stack.result().length) {
    result += stack.pop();
  }
  return Number(result);
}
console.log(changeTenToSec(100));
