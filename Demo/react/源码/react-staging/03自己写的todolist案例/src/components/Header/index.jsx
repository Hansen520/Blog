import React, { Component } from 'react'
import {nanoid} from 'nanoid'
import './index.css'
export default class Header extends Component {

  // 通过回车获取文本框信息
  handleKeyUp = (event) => {
    // 解构获取keyCode，target
    const { keyCode, target } = event
    // 判断是否是回车
    if (keyCode !== 13) return
    // 添加的todo名字不能为空
    if (target.value.trim() === '') {
      alert('输入不能为空！')
      return
    }
    // 准备号一个todo对象
    const todoObj = {id:nanoid(), name: target.value, done: false }
    console.log(todoObj, 18)
    // 通过回调将todoObj传递给App
    this.props.addTodo(todoObj)
    // 清空输入
    target.value = ''
  }
  render() {
    return (
      <div className='todo-header'>
        <input onKeyUp={this.handleKeyUp} type="text" placeholder='请输入您的任务名哦，并按回车确认一下'/>
      </div>
    )
  }
}
