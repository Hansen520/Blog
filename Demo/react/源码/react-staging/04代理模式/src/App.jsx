import React, { Component } from 'react'
import axios from 'axios'

export default class App extends Component {
  getData = () => {
    axios.get('/api1/students').then((res) => {
      console.log('成功了', res)
    }, (err) => {
      console.log('失败了', err)
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.getData}>点我获取相关数据</button>
      </div>
    )
  }
}
