import { Tabs } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.less";

const LayoutTabs = () => {
  const { TabPane } = Tabs;
  const { pathname } = useLocation();
  const [activeValue, setActiveValue] = useState(pathname);
  const [tabsList] = useState([
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

  const delTabs = (path: string) => {
    console.log(path);
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
