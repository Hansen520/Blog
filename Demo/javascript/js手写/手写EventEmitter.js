/*
  EventEmitter用于Node.js的事件进行统一管理。因为Node.js采用了事件驱动机制，而
  EventEmitter就是Node.js事件驱动的基础。在EventEmitter基础上，node.js几乎所有模块
  都继承了这个类，以实现异步事件驱动架构
  用法有很多，如addListener，emit等等
*/
// 基本使用1
// var events = require('events')
// var eventEmitter = new events.EventEmitter();
// // 'say'要一样
// eventEmitter.on('say', function (name) {
//   console.log('Hello', name)
// })
// eventEmitter.emit('say', 'Jonh')

// 基本使用2, 解绑事件
// var events = require('events')
// var emitter = new events.EventEmitter()
// function hello1(name) {
//   console.log('hello 1', name)
// }
// function hello2(name) {
//   console.log('hello 2', name)
// }
// emitter.addListener('say', hello1)
// emitter.addListener('say', hello2)
// emitter.emit('say', 'John')
// emitter.removeListener('say', hello1)
// emitter.emit('say', 'John!!!')


// 要想会这个订阅发布少不了
// 下面我们写一个简单版的吧(源码实现)

/* 正式开始 */
// EventEmitter的初始化代码
function EventEmitter() {
  // 用来存储自定义事件
  this.__events = {}
}
EventEmitter.VERSION = '1.0.0';

// EventEmitter的on方法
EventEmitter.prototype.on = function (eventName, listener) {
  if (!eventName || !listener) {
    return;
  }
  // console.log(listener, 48)
  // 判断回调的listener是否为函数, once时候listener.listener还是函数
  if (!isValidListener(listener)) {
    throw new TypeError('listener must be a function');
  }
  var events = this.__events
  var listeners = events[eventName] = events[eventName] || []

  var listenerIsWrapped = typeof listener === 'object'
  // 不重复添加事件，判断是否有一样的
  if (indexOf(listeners, listener) === -1) {
    listeners.push(listenerIsWrapped ? listener : {
      listener: listener,
      once: false
    })
  }
  // console.log(listeners, this.__events)
  return this
}
// 判断是否使合法的listener
function isValidListener(listener) {
  if (typeof listener === 'function') {
    return true
  } else if (listener && typeof listener === 'object') {
    return isValidListener(listener.listener)
  } else {
    return false
  }
}

// 判断新增自定义事件是否存在
function indexOf(array, item) {
  var result = -1
  item = typeof item === 'object' ? item.listener : item
  // console.log(array, item, 81)
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i].listener === item) {
      result = i
      break
    }
  }
  // console.log(result)
  return result
}

// emit触发效果
EventEmitter.prototype.emit = function (eventName, ...args) {
  // 直接通过内部对象获取对应自定义事件的回调函数
  var listeners = this.__events[eventName];
  if (!listeners) {
    return;
  }
  // console.log(eventName, args, 95)
  // 需要考虑多个listener的情况
  for (var i = 0; i < listeners.length; i++) {
    var listener = listeners[i];
    if (listener) {
      // console.log(listener, 104)
      listener.listener.apply(this, args || [])
      // 给listener中once为true的进行特殊处理
      if (listener.once) {
        this.off(eventName, listener.listener)
      }
    }
  }
  return this;
}
EventEmitter.prototype.off = function (eventName, listener) {
  var listeners = this.__events[eventName];
  if (!listeners) {
    return;
  }
  // console.log(this.__events[eventName], 120)
  var index;
  for (var i = 0, len = listeners.length; i < len; i++) {
    if (listeners[i] && listeners[i].listener === listener) {
      index = i;
      break;
    }
  }
  // off的关键
  if (typeof index !== 'undefined') {
    listeners.splice(index, 1, null)
  }
  return this;
}

EventEmitter.prototype.once = function (eventName, listener) {
  // 直接调用on方法，once参数传入
  return this.on(eventName, {
    listener: listener,
    once: true
  })
}
// 测试用例
var eventEmitter = new EventEmitter()
eventEmitter.on('say', function (name) {
  console.log('Hello', name)
})
eventEmitter.emit('say', 'Jonh')
eventEmitter.emit('say', 'Hansen')
eventEmitter.once('see', function (name) {
  console.log('hi', name)
})
eventEmitter.emit('see', 'Zhejiang')
eventEmitter.emit('see', '江苏')