import React, { Component } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'

export default class Search extends Component {
  search = () => { 
    // 输入用户名
    const { keyWordElement: { value: keyWord } } = this // 发送网络请求
    // 发送请求前通知List更新状态
    PubSub.publish('hansen', {isFirst: false, isLoading: true})
    axios.get(`/api1/search/users?q=${keyWord}`).then(response => {
      // 请求成功后通知List更新状态
      PubSub.publish('hansen', {isLoading: false,users:response.data.items})
    }, error => {
      console.log(error)
      // 失败过后的状态
      PubSub.publish('hansen', {isLoading: false, err: error.message})
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
