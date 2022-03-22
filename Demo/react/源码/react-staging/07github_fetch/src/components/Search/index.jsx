import React, { Component } from 'react'
import PubSub from 'pubsub-js'

export default class Search extends Component {
  search = async() => { 
    // 输入用户名
    const { keyWordElement: { value: keyWord } } = this // 发送网络请求
    // 发送请求前通知List更新状态
    PubSub.publish('hansen', {isFirst: false, isLoading: true})
    /*
     这里的fetch分为两步
     1. 先去通信服务器
     2. 建立连通后再进行数据的传输
    */
    // 这也是未优化的
    // fetch(`/api1/search/users1?q=${keyWord}`).then(
    //   res => {
    //     console.log('联系服务器成功')
    //     return res.json()
    //   },
    //   error => {
    //     console.log('联系服务器失败', error)
    //     // 如果失败则直接处于挂起状态, 下面的then就不会继续走了
    //     return new Promise(()=>{})
    //   }
    // ).then((res) => {
    //   console.log('获取数据成功', res)
    //   PubSub.publish('atguigu',{isLoading:false,users:res.items})
    // }, error => {
    //   console.log('获取数据失败', error)
    // })
    
    // 发起网络请求---使用fetch发送(优化)
    try {
      // 这样做可以避免上面这种连接成功，但是数据获取失败的问题
      const res = await fetch(`/api1/search/users?q=${keyWord}`)
      const data = await res.json()
      console.log(data)
      PubSub.publish('hansen', {isLoading:false,users:data.items})
    } catch (error) {
      console.log('请求出错', error)
      PubSub.publish('hansen', {isLoading:false,err:error.message})
    }
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
