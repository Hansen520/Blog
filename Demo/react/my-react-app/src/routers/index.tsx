import React from "react";
import { useRoutes, Navigate, RouteObject } from "react-router-dom";
import NotFound from "@/components/ErrorMessage/404";
import LayoutIndex from "@/layouts/index";
import Login from "@/views/login/index";
// import Home from "@/views/home/index";
import lazyLoad from "./lazyLoad";
// import UseHooks from "@/views/proTable/useHooks/index";

const rootRouter: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <LayoutIndex name="我是参数" />,
    children: [
      {
        path: "/home",
        element: lazyLoad(React.lazy(() => import("@/views/home/index"))),
      },
      {
        path: "/proTable/useHooks",
        element: lazyLoad(
          React.lazy(() => import("@/views/proTable/useHooks/index"))
        ),
      },
      {
        path: "/form/basicForm",
        element: lazyLoad(
          React.lazy(() => import("@/views/form/basicForm/index"))
        ),
      },
      {
        path: "/table/table1",
        element: lazyLoad(
          React.lazy(() => import("@/views/table/Table1/index"))
        ),
      },
      {
        path: "/assembly/selectIcon",
        element: lazyLoad(
          React.lazy(() => import("@/views/assembly/selectIcon"))
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;
