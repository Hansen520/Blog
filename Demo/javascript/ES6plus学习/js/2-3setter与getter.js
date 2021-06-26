let _age = 10
class Animal{
  constructor(type){
    this.type = type
  }
  get age () {
    return 4
  }
  set age (val) {
    this.realAge = val  // this.realAge是个自定义属性
  }

  get age () {
    return _age
  }
  set age (val) {
    // 可以加上条件才能修改内容的阻止
    if(val > 10){
      _age = val
    }
  }


}

let dog = new Animal('cat')
console.log(dog.age) // 10
dog.age = 9
console.log(dog.age) // 10
dog.age = 12
console.log(dog.age) // 12



// 2
// 案例,可以拿有id="main"的网站试验，如慕课网首页
// class CustomHTMLElement1 {
//   constructor (element) {
//     this.element = element
//   }
//   get html () {
//     return this.element.innerHTML
//   }
//   set html (value) {
//     this.element.innerHTML = value
//   }
// }
// let Omain = document.getElementById('main')
// let oId = new CustomHTMLElement1(Omain)
// oId.html = 'aaaaa'

// 3改为原生ES5的
function fn(element){
  this.element = element;
}

fn.prototype = {
  get Num() {
    console.log("get")
    return this.element.innerHTML
  },
  set Num(value) {
    console.log("set")
    this.element.innerHTML = value
  }
}

let oMain = document.getElementById('main');
let nn = new fn(oMain);
nn.Num = "aaa"


