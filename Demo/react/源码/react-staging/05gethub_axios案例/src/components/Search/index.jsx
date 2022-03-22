import React, { Component } from 'react'
import axios from 'axios'

export default class Search extends Component {
  search = () => { 
    // 输入用户名
    const { keyWordElement: { value: keyWord } } = this
    // 发送请求前通知App更新状态
    this.props.updateAppState({ isFirst: false, isLoading: true })
    // 发送网络请求
    axios.get(`/api1/search/users?q=${keyWord}`).then(response => {
      // 请求成功后通过App更新状态
      this.props.updateAppState({
        isLoading: false,
        users: response.data.items
      })
    }, error => {
      console.log(error)
      // 失败过后的状态
      this.props.updateAppState({isLoading:false,err:error.message})
    })
  }
  render() {
    return (
      <section>
        <h3>搜素github用户</h3>
        <div>
          <input ref={ c => this.keyWordElement = c} type="text" placeholder="输入关键词点击搜索"/>
          <button onClick={this.search}>搜索</button>
        </div>
      </section>
    )
  }
}
