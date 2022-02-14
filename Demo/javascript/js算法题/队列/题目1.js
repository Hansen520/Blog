class Queue {
  constructor() {
    this.arr = [];
  }
  push(item) {
    this.arr[this.arr.length] = item;
    return this.arr.length;
  }
  shift() {
    if (this.arr.length > 0) {
      for (let i = 0; i < this.arr.length; i++) {
        if (this.arr[i + 1]) {
          this.arr[i] = this.arr[i + 1];
        }
      }
      this.arr.length = this.arr.length - 1;
    }
  }
  peek() {
    return this.arr[0];
  }
  result() {
    return this.arr;
  }
}

let queue = new Queue();
queue.push(1);
queue.shift();
queue.push(2);
queue.push(3);
queue.push(4);
queue.push(5);
queue.shift();
queue.shift();
console.log(queue.result());
