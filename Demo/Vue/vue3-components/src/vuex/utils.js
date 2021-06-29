// 获取key-value
export function forEachValue(obj, fn) {
  Object.keys(obj).forEach((key) => fn(obj[key], key))
}

// 判断是否为promise
export function isPromise(val) {
  return val && typeof val.then === 'function'
}
