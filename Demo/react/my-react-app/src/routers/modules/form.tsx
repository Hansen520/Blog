import React from "react";
import lazyLoad from "@/routers/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// 表单模块
const dataScreenRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    children: [
      {
        path: "/form/basicForm",
        element: lazyLoad(React.lazy(() => import("@/views/form/basicForm"))),
        meta: {
          requiresAuth: false,
          title: "表单",
          key: "basicForm",
        },
      },
    ],
  },
];

export default dataScreenRouter;
