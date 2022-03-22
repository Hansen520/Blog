// 创建外壳组件App
import React, { Component } from 'react'
import Hello from './components/Hello'
import Welcome from './components/Welcome'

// 创建并暴露App组件
export default class App extends Component {
  render() {
    return (
      <div>
        <Hello></Hello>
        <Welcome></Welcome>
      </div>)
    }
}