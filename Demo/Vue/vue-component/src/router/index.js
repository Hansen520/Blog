import Vue from 'vue';
import VueRouter from 'vue-router';
// import longList from '../views/longList/index'
import Hello from '../views/router-trans-params/Hello';
import HelloRoute from '../views/router-trans-params/HelloRoute';
import getTree from '../views/treeComponent';
import test from '../views/test1/test';
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);

function dynamicPropsFn(route) {
  return {
    name: new Date().getFullYear() + parseInt(route.params.years) + '!',
  };
}
const router = new VueRouter({
  mode: 'history',
  routes: [
    // {
    //   path: '/longList',
    //   name: 'longList',
    //   component: longList
    // }
    // 没有传参  所以组件什么都拿不到
    {
      path: '/',
      component: Hello,
      children: [
        //布尔模式: props 被设置为 true，此时route.params (即此处的name)将会被设置为组件属性。
        { path: 'hello/:name', component: HelloRoute, props: true },
        // 对象模式: 此时就和params没什么关系了.此时的name将直接传给HelloRoute组件.注意:此时的props需为静态!
        { path: 'static', component: HelloRoute, props: { name: 'world' } },
        // 函数模式: 1,这个函数可以默认接受一个参数即当前路由对象.2,这个函数返回的是一个对象.3,在这个函数里你可以将静态值与路由相关值进行处理.
        {
          path: 'dynamic/:years',
          component: HelloRoute,
          props: dynamicPropsFn,
        },
        { path: 'attrs', component: HelloRoute, props: { name: 'attrs' } },
      ],
    },

    // 树形组件菜单
    { path: '/getTree', component: getTree },
    { path: '/test', component: test },
  ],
});

router.beforeEach((to, from, next) => {
  console.log(to, from);
  if (to.path === '/getTree') {
    setTimeout(() => {
      const result = prompt('请输入你的跳转秘密啊:', '123456');
      if (result === '123456') {
        alert('密码正确！');
        next();
      } else {
        alert('密码错误！');
        Promise.reject('禁止跳到树形菜单，请输入密码');
      }
    }, 0);
  } else {
    next();
  }
});
export default router;
