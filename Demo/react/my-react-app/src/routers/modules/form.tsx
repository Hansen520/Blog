/*
 * @Author: hansen
 * @Date: 2022-09-26 11:15:52
 * @LastEditors: hansen
 * @LastEditTime: 2022-10-09 15:33:04
 */
import React from "react";
import lazyLoad from "@/routers/util/lazyLoad";
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
      {
        path: "/form/validateForm",
        element: lazyLoad(
          React.lazy(() => import("@/views/form/validateForm"))
        ),
        meta: {
          requiresAuth: false,
          title: "超级表单",
          key: "validateForm",
        },
      },
    ],
  },
];

export default dataScreenRouter;
