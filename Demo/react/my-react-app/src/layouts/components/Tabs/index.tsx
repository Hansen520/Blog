import { Tabs, message, Button, Dropdown, Menu } from "antd";
import { HomeFilled, DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.less";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";
import { setTabsList } from "@/redux/modules/tabs/action";
import { routerArray } from "@/routers";
import { searchRoute } from "@/utils/util";

const LayoutTabs = (props: any) => {
  console.log(props, 13);
  const { TabPane } = Tabs;
  const { pathname } = useLocation();
  const [activeValue, setActiveValue] = useState<string>(pathname);
  useEffect(() => {
    // 这里很巧妙，根据pathname的变化来添加tabs，而不是说通过左侧的menu去点击添加，相当于监听触发
    addTabs();
  }, [pathname]); // 监听pathname的变化

  const navigate = useNavigate();

  const tabsClick = (path: string) => {
    navigate(path);
  };

  // addTabs
  const addTabs = () => {
    const route = searchRoute(pathname, routerArray);
    let tabsList = JSON.parse(JSON.stringify(props.tabsList));
    // 没有再增
    if (props.tabsList.every((item: any) => item.path !== route.path)) {
      tabsList.push({ title: route.meta!.title, path: route.path });
    }
    props.setTabsList(tabsList);
    setActiveValue(pathname);
  };

  const delTabs = (tabPath?: string) => {
    if (pathname === HOME_URL) return;
    props.tabsList.forEach((item: Menu.MenuOptions, index: number) => {
      if (item.path !== pathname) return;
      const nextTab = props.tabsList[index + 1] || props.tabsList[index - 1];
      if (!nextTab) return;
      navigate(nextTab.path);
    });
    message.success("删除Tabs标签 😆😆😆");
    props.setTabsList(
      props.tabsList.filter((item: Menu.MenuOptions) => item.path !== tabPath)
    );
  };

  const closeMultipleTab = (tabPath?: string) => {
    const handleTabsList = props.tabsList.filter((item: Menu.MenuOptions) => {
      return item.path === tabPath || item.path === HOME_URL;
    });
    props.setTabsList(handleTabsList);
    tabPath ?? navigate(HOME_URL);
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <span>关闭当前</span>,
          onClick: () => delTabs(),
        },
        {
          key: "2",
          label: <span>关闭其它</span>,
          onClick: () => closeMultipleTab(pathname),
        },
        {
          key: "3",
          label: <span>关闭所有</span>,
          onClick: () => closeMultipleTab(),
        },
      ]}
    />
  );
  return (
    <div className="tabs">
      <Tabs
        activeKey={activeValue}
        onChange={tabsClick}
        hideAdd
        type="editable-card"
        onEdit={() => {
          delTabs();
        }}
      >
        {props.tabsList.map((item: Menu.MenuOptions) => {
          return (
            <TabPane
              key={item.path}
              tab={
                <span>
                  {item.path == HOME_URL ? <HomeFilled /> : ""}
                  {item.title}
                </span>
              }
              closable={item.path !== HOME_URL}
            ></TabPane>
          );
        })}
      </Tabs>
      <Dropdown
        overlay={menu}
        placement="bottom"
        arrow={{ pointAtCenter: true }}
        trigger={["click"]}
      >
        <Button className="more-button" type="primary" size="small">
          更多 <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return state.tabs;
};
const mapDispatchToProps = { setTabsList };

export default connect(mapStateToProps, mapDispatchToProps)(LayoutTabs);
