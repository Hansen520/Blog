import React, { useEffect, useState } from "react";
import * as Icons from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { getOpenKeys, findAllBreadcrumb, handleRouter } from "@/utils/util";
import { setMenuList } from "@/redux/modules/menu/action";
import type { MenuProps } from "antd";
import { Menu, Spin } from "antd";
import Logo from "./components/Logo";
import { setBreadcrumbList } from "@/redux/modules/breadcrumb/action";
import { setAuthRouter } from "@/redux/modules/auth/action";
import { getMenuList } from "@/api/modules/login";
import "./index.less";
import { connect } from "react-redux";

const LayoutMenu = (props: any) => {
  const { pathname } = useLocation(); // 刷新页面菜单保持高亮效果
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  useEffect(() => {
    setSelectedKeys([pathname]);
    props.isCollapse ? null : setOpenKeys(getOpenKeys(pathname));
  }, [pathname, props.isCollapse]);

  type MenuItem = Required<MenuProps>["items"][number];
  const getItem = (
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  };
  const navigate = useNavigate();
  // 点击当前菜单
  const clickMenu: MenuProps["onClick"] = ({ key }: { key: string }) => {
    // 跳转菜单
    navigate(key);
  };
  // 设置当前展开的 subMenu
  const onOpenChange = (openKeys: string[]) => {
    console.log(openKeys, 48);
    if (openKeys.length === 0 || openKeys.length === 1)
      return setOpenKeys(openKeys);
    const latestOpenKey = openKeys[openKeys.length - 1];
    console.log(latestOpenKey, 52);
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
    setOpenKeys([latestOpenKey]);
  };
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  const getMenuData = async () => {
    setLoading(true);
    try {
      const { data } = await getMenuList();
      if (!data) return;
      setMenuList(deepLoopFloat(data));
      // 存储处理过后的所有面包屑导航栏到redux中
      props.setBreadcrumbList(findAllBreadcrumb(data));
      // 把路由菜单处理成一维数组，存储到redux中，做菜单权限判断
      const dynamicRouter = handleRouter(data);
      props.setAuthRouter(dynamicRouter);
    } finally {
      setLoading(false);
    }
  };
  // 动态渲染Icon
  const customIcons: { [key: string]: any } = Icons;
  const addIcon = (name: string) => {
    return React.createElement(customIcons[name]);
  };
  // 返回后台返回菜单key值为antd菜单需要的key值
  const deepLoopFloat = (menuList: any, newArr: MenuItem[] = []) => {
    menuList.forEach((item: any) => {
      if (!item?.children?.length)
        return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)));
      newArr.push(
        getItem(
          item.title,
          item.path,
          addIcon(item.icon!),
          deepLoopFloat(item.children)
        )
      );
    });
    return newArr;
  };
  useEffect(() => {
    getMenuData();
  }, []);
  return (
    <div className="menu">
      <Spin spinning={loading} tip="Loading...">
        <Logo></Logo>
        <Menu
          theme="dark"
          mode="inline"
          triggerSubMenuAction="click"
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          items={menuList}
          onClick={clickMenu}
          onOpenChange={onOpenChange}
        ></Menu>
      </Spin>
    </div>
  );
};

const mapStateToProps = (state: any) => state.menu;
const mapDispatchToProps = { setMenuList, setBreadcrumbList, setAuthRouter };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutMenu);
