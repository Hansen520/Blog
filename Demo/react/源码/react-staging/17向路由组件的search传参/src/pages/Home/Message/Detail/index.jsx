import React, { Component } from 'react'
import qs from 'qs'

const DetailData = [
  {id:'01',content:'你好，杭州'},
	{id:'02',content:'你好，亚运会'},
	{id:'03',content:'你好，体育创想未来'}
]

export default class Detail extends Component {
  render() {
    console.log(this.props, 11)
    // 接收params参数
    // const { id, title } = this.props.match.params

    // 接收search参数
    const { search } = this.props.location
    const {id, title} = qs.parse(search.slice(1))
    // 找到选中的那一条数据
    const findResult = DetailData.find((detailObj) => {
      return detailObj.id === id
    })
    console.log(findResult, 17)
    return (
      <ul>
        <li>Id:{id}</li>
        <li>TITLE:{title}</li>
        <li>CONTENT:{findResult.content}</li>
      </ul>
    )
  }
}
