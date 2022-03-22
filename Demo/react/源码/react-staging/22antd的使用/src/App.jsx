import React, { Component } from 'react'
import { Button,Radio,Divider,Steps,Calendar  } from 'antd';
import { WechatOutlined, WeiboOutlined, SearchOutlined } from '@ant-design/icons'
import './App.less'
export default class App extends Component {
	state = {
    size: 'large',
  };
	handleSizeChange = e => { 
		this.setState({size: e.target.value})
	}
	onPanelChange = (value, mode) => {
		console.log(value.format('YYYY-MM-DD'), mode);
	}
	render() {
		const { size } = this.state
		const { Step } = Steps
		return (
			<div>
				hansen的app
				<Button size={size} type="primary">基本使用</Button>
				<Button size={size} type="link">Link Button</Button>
				<Button size={size} danger type='primary'>Default</Button>
				<Button size={size} ghost={true} type='primary'>Default</Button>
				<WechatOutlined />
				<WeiboOutlined />
				<SearchOutlined />
				<Radio.Group value={size} onChange={this.handleSizeChange}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
				</Radio.Group>
				<Divider />
				<Steps current={1}>
					<Step title="Finished" description="This is a description." />
					<Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
					<Step title="Waiting" description="This is a description." />
				</Steps>
				<Calendar onPanelChange={this.onPanelChange} />
			</div>
		)
	}
}
