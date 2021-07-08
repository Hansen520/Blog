//1导入变量
// import {list, name, time} from "./2-18module_export"
// console.log(list, name, time)

//2导入函数
// import {run} from "./2-18module_export"
// run()
//或
// import {sayHi, fn} from "./2-18module_export"
// sayHi("你好阿")
// fn()

//3导入 Object对象
//导出默认对象
// import obj from "./2-18module_export"
// console.log(obj)

//导出多个对象，可以用解构赋值，但是需要拿出来写，不能直接写在import后面
// import obj from "./2-18module_export"
// let {data, res} = obj
// console.log(data, res)

// 4导入类
// import { Test } from "./2-18module_export"
// let test = new Test()
// console.log(test.id)

//5用*号全部的引入
// import * as mod from "./2-18module_export"
// console.log(mod.cname)
// console.log(mod.addr)
// console.log(mod.list)
