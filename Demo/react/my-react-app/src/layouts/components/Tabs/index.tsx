import { Tabs, message } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.less";
import { HOME_URL } from "@/config/config";

const LayoutTabs = () => {
  const { TabPane } = Tabs;
  const { pathname } = useLocation();
  const [activeValue, setActiveValue] = useState(pathname);
  const [tabsList, setTabsList] = useState([
    {
      title: "首页",
      path: "/home",
    },
    {
      title: "数据大屏",
      path: "/dataScreen",
    },
    {
      title: "使用 Hooks",
      path: "/proTable/useHooks",
    },
    {
      title: "使用 Component",
      path: "/proTable/useComponent",
    },
    {
      title: "数据可视化",
      path: "/dashboard/dataVisualize",
    },
  ]);

  useEffect(() => {
    setActiveValue(pathname);
  }, [pathname]);

  const navigate = useNavigate();

  const tabsClick = (path: string) => {
    console.log(path);
    navigate(path);
  };

  const delTabs = (tabPath?: string) => {
    if (tabPath === HOME_URL) return;
    if (pathname === tabPath) {
      tabsList.forEach((item: any, index: number) => {
        // 循环里面找不到则直接退出
        if (item.path !== pathname) return;
        const nextTab = tabsList[index + 1] || tabsList[index - 1];
        if (!nextTab) return;
        navigate(nextTab.path);
      });
    }
    message.success("你删除了Tabs标签 😆😆😆");
    setTabsList(tabsList.filter((item: any) => item.path !== tabPath));
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
      {tabsList.map((item) => {
        return (
          <TabPane
            key={item.path}
            tab={
              <span>
                {item.path == "/home" ? <HomeFilled /> : ""}
                {item.title}
              </span>
            }
            closable={item.path !== "home"}
          ></TabPane>
        );
      })}
    </Tabs>
  );
};

export default LayoutTabs;
