class Polygon {
  constructor(height, width) {
    this.name = 'Polygon';
    this.height = 1;
    this.width = 1;
  }
  sayName() {
    console.log('Hi, I am a ', this.name + '.');
  }
}

class Square extends Polygon {
  constructor(width, height) {
    super(height, width)
    // this.height = 10;
    // ReferenceError，super 需要先被调用！
    
/*
   这里，它调用父类的构造函数的, 
   作为Polygon 的 width
    super(length, length);
    
/*
    注意: 在派生的类中, 在你可以使用'this'之前, 必须先调用super()。
    忽略这, 这将导致引用错误。
*/
    this.name = 'Square';
  }

  get area() {
    return this.height * this.width;
  }

  set area(value) {
    this.area = value;
  } 
}
var fn = new Square(1,2)
// 因为写死了width和height都是1
ChromeSamples.log('Hi. I was created with a Class expression. My name is ' +
fn.area);
console.log(fn.area) // 1
console.log(fn) // Square {name: "Square", height: 1, width: 1}