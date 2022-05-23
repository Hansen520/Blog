import React from 'react'
import {NavLink, Outlet} from 'react-router-dom'

export default function Home() {
	return (
		<div>
			<h3>我是Home的内容</h3>
			<div>
				<ul className="nav nav-tabs">
					<li>
						{/* 二级路由不用加斜杠 */}
						<NavLink className="list-group-item" to="news">News</NavLink>
					</li>
					<li>
						<NavLink className="list-group-item" to="message">message</NavLink>
					</li>
				</ul>
				{/* 指定路由组件呈现的位置 */}
				<Outlet />
			</div>
		</div>
	)
}
