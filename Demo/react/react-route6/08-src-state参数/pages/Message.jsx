import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Message() {
    const [messages] = useState([
        {id: '0001', title: '消息1', content: '白日依山尽'},
        {id: '0002', title: '消息2', content: '黄河入海流'},
        {id: '0003', title: '消息3', content: '欲穷千里目'},
        {id: '0004', title: '消息4', content: '更上一层楼'}
    ])
    return (
        <div>
            <ul>
                {
                    messages.map((m) => {
                        return (
                            // 路由链接
                            <li key={m.id}>
                                <Link
                                    to="detail"
                                    state={{
                                        id: m.id,
                                        title: m.title,
                                        content: m.content
                                    }}
                                >{m.title}</Link>
                            </li>
                        )
                    })
                }
            </ul>
            <hr />
            {/* 指定路由组件的展示位置 */}
            <Outlet/>
        </div>
    )
}