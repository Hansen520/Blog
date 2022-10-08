import React from "react";
import lazyLoad from "@/routers/util/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// 看板
const kanbanRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    children: [
      {
        path: "/kanban/kanban1",
        element: lazyLoad(React.lazy(() => import("@/views/kanban/kanban1"))),
        meta: {
          requiresAuth: false,
          title: "使用看板",
          key: "kanban1",
        },
      },
    ],
  },
];

export default kanbanRouter;
