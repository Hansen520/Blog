import React, { Component } from 'react'
import MyNavLink from '../../components/MyNavLink'
import {Route, Switch, Redirect} from 'react-router-dom'
import News from './News'
import Message from './Message'

export default class Home extends Component {
  render() {
    return (
      <div>
        <h3>我是Home的内容哦</h3>
        <div>
          <ul className="nav nav-tabs">
            <li>
              <MyNavLink replace to="/home/news">News</MyNavLink>
            </li>
            <li>
              <MyNavLink replace to="/home/message">Message</MyNavLink>
            </li>
          </ul>
          <Switch>
            <Route path="/home/news" component={News}/>
            <Route path="/home/message" component={Message}/>
            <Redirect to="/home/news"/>
          </Switch>
        </div>
      </div>
    )
  }
}
