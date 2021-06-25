// 本身不会报错，但是使用严格模式的ts则报null不能赋值为string类型等等
let s = 'foo'
s = null

let sn: string | null = 'bar'
sn = null

sn = undefined



class C {
  a: number
  b?: number
}

let c = new C()
c.a = 12
// 严格会出错
c.a = undefined

// 去掉返回null的方式
function f(sn: string | null): string {
  return sn || 'default'
}

// 具体示例
function broken(name: string | null): string {
  function postfix(epither: string) {
    // 虽然我们知道了了name一定不为null，但是编辑器编译时候是不知道的，所以采用 ! 的方式来进行类型断言
    return name!.charAt(0) + '. the ' + epither
  }
  name = name || 'Bob'
  return postfix(name)
}