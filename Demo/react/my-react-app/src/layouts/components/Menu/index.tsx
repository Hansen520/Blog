import { useEffect, useState } from "react";
import {
  HomeOutlined,
  TableOutlined,
  PieChartOutlined,
  FileTextOutlined,
  AreaChartOutlined,
  FundOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import "./index.less";

const LayoutMenu = () => {
  const { pathname } = useLocation();
  const [menuActive, setMenuActive] = useState(pathname);
  const menuList = [
    {
      label: "首页",
      key: "/home",
      danger: false,
      icon: <HomeOutlined />,
    },
    {
      label: "数据大屏",
      key: "/dataScreen",
      icon: <AreaChartOutlined />,
    },
    {
      label: "超级表格",
      key: "/proTable",
      icon: <TableOutlined />,
      children: [
        {
          label: "使用 Hooks",
          key: "/proTable/useHooks",
          icon: <AppstoreOutlined />,
        },
        {
          label: "使用 Component",
          key: "/proTable/useComponent",
          icon: <AppstoreOutlined />,
        },
      ],
    },
    {
      label: "Dashboard",
      key: "/dashboard",
      icon: <FundOutlined />,
      children: [
        {
          key: "/dashboard/dataVisualize",
          label: "数据可视化",
          icon: <AppstoreOutlined />,
        },
        {
          key: "/dashboard/embedded",
          label: "内嵌页面",
          icon: <AppstoreOutlined />,
        },
      ],
    },
    {
      label: "表单 Form",
      key: "/form",
      icon: <FileTextOutlined />,
      children: [
        {
          key: "/form/basicForm",
          label: "基础 Form",
          icon: <AppstoreOutlined />,
        },
        {
          key: "/form/validateForm",
          label: "校验 Form",
          icon: <AppstoreOutlined />,
        },
        {
          key: "/form/dynamicForm",
          label: "动态 Form",
          icon: <AppstoreOutlined />,
        },
      ],
    },
    {
      label: "表格 table",
      key: "/table",
      icon: <FileTextOutlined />,
      children: [
        {
          key: "/table/table1",
          label: "基础 table",
          icon: <AppstoreOutlined />,
        },
      ],
    },
    {
      label: "Echarts",
      key: "/echarts",
      icon: <PieChartOutlined />,
      children: [
        {
          key: "/echarts/waterChart",
          label: "水型图",
          icon: <AppstoreOutlined />,
        },
        {
          key: "/echarts/columnChart",
          label: "柱状图",
          icon: <AppstoreOutlined />,
        },
        {
          key: "/echarts/lineChart",
          label: "折线图",
          icon: <AppstoreOutlined />,
        },
        {
          key: "/echarts/pieChart",
          label: "饼图",
          icon: <AppstoreOutlined />,
        },
        {
          key: "/echarts/radarChart",
          label: "雷达图",
          icon: <AppstoreOutlined />,
        },
        {
          key: "/echarts/nestedChart",
          label: "嵌套环形图",
          icon: <AppstoreOutlined />,
        },
      ],
    },
    {
      label: "常用组件",
      key: "/assembly",
      icon: <ShoppingOutlined />,
      children: [
        {
          key: "/assembly/selectIcon",
          label: "Icon 选择",
          icon: <AppstoreOutlined />,
        },
        {
          key: "/assembly/batchImport",
          label: "批量导入数据",
          icon: <AppstoreOutlined />,
        },
      ],
    },
  ];
  const getSubMenuAction = () => {
    menuList.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => {
          if (child.key === pathname) {
            setMenuActive(item.key);
          }
        });
      }
    });
  };

  useEffect(() => {
    getSubMenuAction();
    setMenuActive(pathname);
  }, [pathname]);

  const navigate = useNavigate();
  // 点击当前菜单
  const clickMenu: MenuProps["onClick"] = (e) => {
    console.log(e.key);
    // 跳转菜单
    navigate(e.key);
  };
  const [subMenuActive, setSubMenuActive] = useState("");
  console.log(subMenuActive, 166);
  // 设置当前展开的 subMenu
  const openSubMenu = (openKeys: any) => {
    console.log(openKeys);
    if (openKeys.length == 0) return setSubMenuActive("");
    setSubMenuActive(openKeys[1]);
  };
  return (
    <div className="menu">
      <Menu
        theme="dark"
        mode="inline"
        triggerSubMenuAction="click"
        selectedKeys={[menuActive]}
        openKeys={[subMenuActive]}
        items={menuList}
        onClick={clickMenu}
        onOpenChange={openSubMenu}
      ></Menu>
    </div>
  );
};
export default LayoutMenu;
