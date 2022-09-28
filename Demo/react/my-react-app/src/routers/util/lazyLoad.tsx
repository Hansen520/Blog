import { Suspense } from "react";
import { Spin } from "antd";
// 路由懒加载Loading
const LazyLoad = (Comp: React.LazyExoticComponent<any>) => {
  return (
    <Suspense
      fallback={
        <Spin
          size="large"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        />
      }
    >
      <Comp />
    </Suspense>
  );
};

export default LazyLoad;
