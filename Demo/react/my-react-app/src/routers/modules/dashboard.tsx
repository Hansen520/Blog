import React from "react";
import lazyLoad from "@/routers/util/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// dashboard 模块
const dashboardRouter: Array<RouteObject> = [
  {
    path: "/dashboard",
    element: <LayoutIndex />, // 这个是主题结构是必须要有的
    meta: {
      title: "Dashboard",
    },
    children: [
      {
        path: "/dashboard/dataVisualize",
        element: lazyLoad(
          React.lazy(() => import("@/views/dashboard/dataVisualize"))
        ),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "数据可视化",
          key: "dataVisualize",
        },
      },
      {
        path: "/dashboard/embedded",
        element: lazyLoad(
          React.lazy(() => import("@/views/dashboard/embedded"))
        ),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "内嵌页面",
          key: "embedded",
        },
      },
    ],
  },
];

export default dashboardRouter;
