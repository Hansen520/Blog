import React from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'

export default function Detail() {
    const [search, setSearch] = useSearchParams()
    const id = search.get('id')
    const title = search.get('title')
    const content = search.get('content')
    const x = useLocation()
    /*
        hash: ""
        key: "jt5j4mud"
        pathname: "/home/message/detail"
        search: "?id=0003&title=%E6%B6%88%E6%81%AF3&content=%E6%AC%B2%E7%A9%B7%E5%8D%83%E9%87%8C%E7%9B%AE"
        state: null
    */
    console.log('useLocation', x)
    return (
        <ul>
            <li>
                {/* 这句话相当于给当前路由传参 */}
                <button onClick={() => setSearch('id=3256&title=拜拜您嘞&content=您来了')}>点我更新一下收到的search参数</button>
            </li>
            <li>消息编号: {id}</li>
            <li>消息标题: {title}</li>
            <li>消息内容: {content}</li>
        </ul>
    )
}