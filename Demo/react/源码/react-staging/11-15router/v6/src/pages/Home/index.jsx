import React, { Component } from 'react'
import MyNavLink from '../../components/MyNavLink'
import { Route, Routes } from 'react-router-dom'
import News from './News'
import Message from './Message'

export default class Home extends Component {
  render() {
    return (
      <div>
        <h3>我是Home相关的内容哦，嘿嘿黑~~~~~</h3>
        <div>
          <ul className="nav nav-tabs">
            <li>
              <MyNavLink to="/home/news">News</MyNavLink>
            </li>
            <li>
              <MyNavLink to="/home/message">Message</MyNavLink>
            </li>
          </ul>
          {/* 注册路由 */}
          <Routes>
            <Route>
              <Route path="/news" element={<News/>}/>
            </Route>
            <Route>
              <Route path="/message" element={<Message/>}/>
            </Route>
          </Routes>
        </div>
      </div>
    )
  }
}
