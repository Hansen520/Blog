/*
 * @Author: hansen
 * @Date: 2022-10-09 15:01:39
 * @LastEditors: hansen
 * @LastEditTime: 2022-10-09 15:02:51
 */
import React from "react";
import lazyLoad from "@/routers/util/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// 超级布局
const dataScreenRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    children: [
      {
        path: "/container/container1",
        element: lazyLoad(
          React.lazy(() => import("@/views/container/container1"))
        ),
        meta: {
          requiresAuth: false,
          title: "超级布局",
          key: "container1",
        },
      },
    ],
  },
];

export default dataScreenRouter;
