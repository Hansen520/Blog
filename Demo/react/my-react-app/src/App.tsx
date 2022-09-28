import Router from "@/routers/index";
import { useState, useEffect } from "react";
import { ConfigProvider } from "antd";
import { getBrowserLang } from "@/utils/util";
import { HashRouter } from "react-router-dom";
import { RouterGuard } from "@/routers/routerGuard";
import rootRouter from "@/routers/index";
import zhCN from "antd/lib/locale/zh_CN";
import enUS from "antd/lib/locale/en_US";
import { connect } from "react-redux";
const App = (props: any) => {
  const [i18nLocale, setI18nLocale] = useState(zhCN);

  const setLanguage = () => {
    // 如果 redux 中有默认语言就设置成 redux 的默认语言，没有默认语言就设置成浏览器默认语言
    if (props.language && props.language == "zh") return setI18nLocale(zhCN);
    if (props.language && props.language == "en") return setI18nLocale(enUS);
    if (getBrowserLang() == "zh") return setI18nLocale(zhCN);
    if (getBrowserLang() == "en") return setI18nLocale(enUS);
  };
  useEffect(() => {
    setLanguage();
  }, [props.language]);
  return (
    <HashRouter>
      {/* <Router /> */}
      <ConfigProvider locale={i18nLocale}>
        <RouterGuard routes={rootRouter} />
      </ConfigProvider>
    </HashRouter>
  );
};

const mapStateToProps = (state: any) => state.global;
export default connect(mapStateToProps)(App);
