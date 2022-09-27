import { Tabs, message } from "antd";
import { HomeFilled } from "@ant-design/icons";
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
    if (tabPath === pathname) {
      props.tabsList.forEach((item: Menu.MenuOptions, index: number) => {
        if (item.path !== tabPath) return;
        const nextTab = props.tabsList[index + 1] || props.tabsList[index - 1];
        if (!nextTab) return;
        navigate(nextTab.path);
      });
    }
    message.success("删除Tabs标签 😆😆😆");
    props.setTabsList(
      props.tabsList.filter((item: Menu.MenuOptions) => item.path !== tabPath)
    );
  };

  return (
    <Tabs
      activeKey={activeValue}
      onChange={tabsClick}
      hideAdd
      type="editable-card"
      onEdit={(path) => {
        delTabs(path as string);
      }}
    >
      {props.tabsList.map((item: Menu.MenuOptions) => {
        return (
          <TabPane
            key={item.path}
            tab={
              <span>
                {item.path == "/home" ? <HomeFilled /> : ""}
                {item.title}
              </span>
            }
            closable={item.path !== HOME_URL}
          ></TabPane>
        );
      })}
    </Tabs>
  );
};

const mapStateToProps = (state: any) => {
  return state.tabs;
};
const mapDispatchToProps = { setTabsList };

export default connect(mapStateToProps, mapDispatchToProps)(LayoutTabs);
