import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class MyNavLink  extends Component {
  render() {
    return (
      // children相当于往子组件里面添加内容
      <NavLink activeClassName="hansen" className="list-group-item" {...this.props}></NavLink>
    )
  }
}
