/*
 * @Author: hansen
 * @Date: 2022-10-09 14:57:54
 * @LastEditors: hansen
 * @LastEditTime: 2022-10-09 15:11:29
 */
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { Button, Dropdown, Menu } from "antd";
function Container1() {
  return (
    <div>
      <PageContainer
        content="欢迎使用 ProLayout 组件"
        tabList={[
          {
            tab: "基本信息",
            key: "base",
          },
          {
            tab: "详细信息",
            key: "info",
          },
        ]}
        extra={[
          <Button key="3">操作</Button>,
          <Button key="2">操作</Button>,
          <Button key="1" type="primary">
            主操作
          </Button>,
        ]}
        footer={[
          <Button key="rest">重置</Button>,
          <Button key="submit" type="primary">
            提交
          </Button>,
        ]}
      ></PageContainer>
    </div>
  );
}

export default Container1;
