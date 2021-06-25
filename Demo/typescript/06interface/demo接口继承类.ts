class Control {
  private state: any
}

interface SelectableControl extends Control {
  select()
}

class Button extends Control implements SelectableControl {
  select(){}
}

class TextBox extends Control {
  select() {}
}
// 会报错， 必须要先继承Control然后才能对其抽象
// class ImageC implements SelectableControl {
//   select() { }
// }