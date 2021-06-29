import { forEachValue } from '../utils.js'
import Module from './module.js'
export default class ModuleCollection {
  // 实例化后执行constructor, rootModule = options
  constructor(rootModule) {
    this.root = null
    this.register(rootModule, [])
  }

  // 一个个模块，path为各个模块的key值
  register(rawModule, path) {
    const newModule = new Module(rawModule)
    // 根模块(空数组)
    if (path.length === 0) {
      this.root = newModule
      // 如果还有子模块
    } else {
      // 获取当前模块的上一级，即父亲节点(如果return空，则还是返回this.root给parent)
      const parent = path.slice(0, -1).reduce((module, current) => {
        return module.getChild(current)
      }, this.root)
      // 通过父亲给孩子添加结点
      parent.addChild(path[path.length - 1], newModule)
    }
    // 如果有modules模块
    if (rawModule.modules) {
      // 去除key-value继续递归
      forEachValue(rawModule.modules, (rawChildModule, key) => {
        this.register(rawChildModule, path.concat(key))
      })
    }
    return newModule
  }

  // 获取命名空间
  getNamespaced(path) {
    let module = this.root // [a,c] a/c
    return path.reduce((namespaceStr, key) => {
      module = module.getChild(key) // 子模块
      return namespaceStr + (module.namespaced ? key + '/' : '')
    }, '')
  }
}
