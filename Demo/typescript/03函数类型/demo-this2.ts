interface UIElement {
  // 定义一个函数
  // this: void 就表示函数中的 this 是 void，因为显示地说明了，你就不能用 this.xxx，这样就避免了运行时的一些 bug。
  addClickListener(onclick: (this: void, e: Event) => void): void
}

class Handler {
  type: string
  onCLickBad = (e: Event) => {
    this.type = e.type
  }
}

let h = new Handler()
let uiElement: UIElement = {
  addClickListener() {

  }
}

uiElement.addClickListener(h.onCLickBad)