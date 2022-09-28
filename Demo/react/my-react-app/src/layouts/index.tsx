import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Layout } from "antd";
import { useEffect } from "react";
import { setAuthButtons } from "@/redux/modules/auth/action";
import { updateCollapse } from "@/redux/modules/menu/action";
import { getAuthorButtons } from "@/api/modules/login";
import LayoutMenu from "./components/Menu";
import LayoutHeader from "./components/Header";
import LayoutTabs from "./components/Tabs";
import LayoutFooter from "./components/Footer";
import { connect } from "react-redux";
import "./index.less";

const LayoutIndex = (props: any) => {
  const { Sider, Content } = Layout;
  const { pathname } = useLocation();

  // 获取按钮权限列表
  const getAuthButtonsData = async () => {
    const { data } = await getAuthorButtons();
    props.setAuthButtons(data);
  };

  // 监听窗口大小的变化
  const listeningWindow = () => {
    window.onresize = () => {
      return (() => {
        let screenWidth = document.body.clientWidth;
        if (props.isCollapse === false && screenWidth < 1200) props.up;
        if (props.isCollapse === false && screenWidth > 1200)
          props.updateCollapse(false);
      })();
    };
  };

  useEffect(() => {
    getAuthButtonsData();
    listeningWindow();
  }, []);
  return (
    <>
      {/* 这里可以不用layout，因为可能会造成闪屏的bug */}
      <section className="layout-container">
        <Sider trigger={null} collapsible={props.isCollapse} collapsed={false}>
          <LayoutMenu></LayoutMenu>
        </Sider>
        <Layout>
          <LayoutHeader></LayoutHeader>
          <LayoutTabs></LayoutTabs>
          <Content>
            <TransitionGroup className="container">
              {/* exit：表示退出当前页面的时候是否有动画 */}
              <CSSTransition
                key={pathname}
                timeout={200}
                classNames="fade"
                exit={false}
              >
                <Outlet></Outlet>
              </CSSTransition>
            </TransitionGroup>
          </Content>
          <LayoutFooter></LayoutFooter>
        </Layout>
      </section>
    </>
  );
};
// * react-redux写法(高阶组件)
// * connect具有两个参数，第一个参数是mapStateToProps，第二个参数是mapDispatchToProps
const mapStateToProps = (state: any) => state.menu;
const mapDispatchToProps = { setAuthButtons, updateCollapse };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutIndex);
