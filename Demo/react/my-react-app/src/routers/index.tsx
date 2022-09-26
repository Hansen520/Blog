import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { RouteObject } from "@/routers/interface";
import NotFound from "@/components/ErrorMessage/404";
import LayoutIndex from "@/layouts/index";
import Login from "@/views/login/index";
import Home from "@/views/home/index";
import lazyLoad from "./lazyLoad";
// import UseHooks from "@/views/proTable/useHooks/index";

// 导入所有router
const metaRouters = import.meta.globEager("./modules/*.tsx");
console.log(Object.keys(metaRouters), 13);

// 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach((item) => {
  Object.keys(metaRouters[item]).forEach((key: any) => {
    routerArray.push(...metaRouters[item][key]);
  });
});
console.log(routerArray, 21);
const rootRouter: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      requiresAuth: false,
      title: "登录页",
      key: "login",
    },
  },
  ...routerArray,
  // {
  //   path: "*",
  //   element: <Navigate to="/404" />,
  // },
];

const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
};

export default Router;
