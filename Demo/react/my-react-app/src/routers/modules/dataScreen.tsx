import React from "react";
import lazyLoad from "@/routers/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// 数据大屏模块
const dataScreenRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    children: [
      {
        path: "/dataScreen",
        element: lazyLoad(React.lazy(() => import("@/views/dataScreen/index"))),
        meta: {
          requiresAuth: false,
          title: "数据大屏",
          key: "dataScreen",
        },
      },
    ],
  },
];

export default dataScreenRouter;
