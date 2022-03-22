import React, { Component } from 'react'
import Search from './components/Search'
import List from './components/List'

export default class App extends Component {
  state = {
    users: [],
    isFirst: true,// 是否为第一次打开页面
    isLoading: false,
    err: ''// 存储错误的氢气信息
  }
  updateAppState = (stateObj) => { 
    console.log(stateObj, 13, 'app')
    this.setState(stateObj)
  }
  render() {
    return (
      <div className='container'>
        <Search updateAppState={this.updateAppState}/>
        <List {...this.state}/>
      </div>
    )
  }
}
