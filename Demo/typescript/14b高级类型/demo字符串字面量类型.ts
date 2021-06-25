type Easing = 'ease-in' | 'ease-out' | 'ease-in-out'

class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === 'ease-in') { }
    else if (easing === 'ease-out') { }
    else if (easing === 'ease-in-out') { }
    else { }
  }
}

let button = new UIElement()
button.animate(0, 0, 'ease-in')
// button.animate(0, 0, 's')// 类型“"s"”的参数不能赋给类型“Easing”的参数
button.animate(0, 0, null)// null在严格模式下也会报错
