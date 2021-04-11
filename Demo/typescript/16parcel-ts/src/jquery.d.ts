// 定义全局变量(括号内此为函数)
// declare var $: (params: () => void) => void

// 定义全局函数
interface JqueryInstance {
  html: (html: string) => JqueryInstance
}

// 函数重载
// 此为函数重载
declare function $(readyFunc: () => void): void;
// 此为字符串重载
declare function $(selector: string): JqueryInstance

// 如何对对象进行类型定义，以及对类型进行类型定义
declare namespace $ {
  namespace fn {
    class init {}
  }
}
