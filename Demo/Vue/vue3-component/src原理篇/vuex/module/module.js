import { forEachValue } from '../utils'
// 用class 方便对 对象进行扩展, rawModule = options
export default class Module {
  constructor(rawModule) {
    this._raw = rawModule
    this._children = {}
    this.state = rawModule.state
    // 自己是否有命名空间
    this.namespaced = rawModule.namespaced
  }

  // 方便扩展函数
  addChild(key, module) {
    this._children[key] = module
  }

  getChild(key) {
    return this._children[key]
  }

  forEachChild(fn) {
    forEachValue(this._children, fn)
  }

  forEachGetter(fn) {
    if (this._raw.getters) {
      forEachValue(this._raw.getters, fn)
    }
  }

  forEachMutation(fn) {
    if (this._raw.mutations) {
      forEachValue(this._raw.mutations, fn)
    }
  }

  forEachAction(fn) {
    if (this._raw.actions) {
      forEachValue(this._raw.actions, fn)
    }
  }
}
