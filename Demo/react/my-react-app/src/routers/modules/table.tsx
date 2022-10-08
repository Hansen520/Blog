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
        path: "/table/table1",
        element: lazyLoad(React.lazy(() => import("@/views/table/Table1"))),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "表格",
          key: "Table1",
        },
      },
      {
        path: "/table/table2",
        element: lazyLoad(React.lazy(() => import("@/views/table/Table2"))),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "表格1",
          key: "Table2",
        },
      },
      {
        path: "/table/table3",
        element: lazyLoad(React.lazy(() => import("@/views/table/Table3"))),
        meta: {
          keepAlive: true,
          requiresAuth: true,
          title: "表格3",
          key: "Table3",
        },
      },
    ],
  },
];

export default homeRouter;
