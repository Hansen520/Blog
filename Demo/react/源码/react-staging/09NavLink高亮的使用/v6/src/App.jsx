import React, { Component } from 'react'
import {NavLink, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

export default class App extends Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-xs-offset-2 col-xs-8">
						<div className="page-header"><h2>React Router Demo</h2></div>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-2 col-xs-offset-2">
						<div className="list-group">

							{/* 原生html中，靠<a>跳转不同的页面 */}
							{/* <a className="list-group-item" href="./about.html">About</a>
							<a className="list-group-item active" href="./home.html">Home</a> */}

              {/* 在React中靠路由链接实现切换组件--编写路由链接 */}
              {/* 通过NavLink进行高亮显示 activeclassname全为小写*/}
							<NavLink className="list-group-item" to="/about">About</NavLink><br/>
              <NavLink className="list-group-item" to="/home">Home</NavLink>
						</div>
					</div>
					<div className="col-xs-6">
						<div className="panel">
							<div className="panel-body">
                {/* 注册路由新的写法 */}
                <Routes>
                  <Route path="/about" element={<About/>}/>
                  <Route path="/home" element={<Home/>} />
                </Routes>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
