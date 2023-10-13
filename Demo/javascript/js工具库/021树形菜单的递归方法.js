
/* react生成动态路由 */
function generateRoutes(menus) {
  return menus.map((menu) => {
    let route = {
      path: menu.path,
      component: !menu.hasChildren ? lazy(() => import(`@/pages${menu.component}`)) : undefined,
    };
    /* 去掉多余的空组件 */
    if (!route.component) {
      delete route.component;
    }
    if (menu.children) {
      route.children = generateRoutes(menu.children);
    }
    return route;
  });
}

console.log(generateRoutes(asideMenuConfig), 20);


let menu = [];
//配置路由，这是铺平的办法
let formatRoute = function (routerMenu, menu){
  for(let i = 0; i < routerMenu.length; i++){
    let temp = {
      path: routerMenu[i].path,
      name: routerMenu[i].name,
      component: resolve => require([`@/views/${routerMenu[i].component}`], resolve)
    };
    menu.push(temp);
    if(routerMenu[i].children && routerMenu[i].children.length > 0){
    //递归生成子菜单的路由
      formatRoute(routerMenu[i].children,menu);
    }
  }
}