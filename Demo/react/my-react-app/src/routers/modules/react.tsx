import React from "react";
import lazyLoad from "@/routers/util/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// 首页模块
const homeRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    children: [
      {
        path: "/react/learn",
        element: lazyLoad(React.lazy(() => import("@/views/react/learn"))),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "react学习",
          key: "react-learn",
        },
      },
    ],
  },
];

export default homeRouter;
