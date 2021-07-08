const target = {
  a: 1,
  b: {
    c: {
      d: {
        e: {
          f: 1,
          m: 2
        }
      }
    }
  }
}
const source = {
  b: 4,
  n: {
    c: {
      d: {
        e: {
          f: 2
        }
      }
    }
  }
}

// 这个只是浅拷贝，只能遍历一层
// 源数据是undefined,null，对目标元素不起作用
// 如果目标数据是undefined,null则会报错
// Object.assign("目标数据","源数据")
const returnedTarget = Object.assign(target, source)
console.log(target)
console.log(returnedTarget)
