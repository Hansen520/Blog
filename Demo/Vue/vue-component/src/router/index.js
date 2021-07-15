import Vue from 'vue';
import VueRouter from 'vue-router';
// import longList from '../views/longList/index'
import Hello from '../views/router-trans-params/Hello';

Vue.use(VueRouter);

function dynamicPropsFn(route) {
  return {
    name: new Date().getFullYear() + parseInt(route.params.years) + '!',
  };
}

export default new VueRouter({
  mode: 'history',
  routes: [
    // {
    //   path: '/longList',
    //   name: 'longList',
    //   component: longList
    // }
    // 没有传参  所以组件什么都拿不到
    { path: '/', component: Hello },
    //布尔模式: props 被设置为 true，此时route.params (即此处的name)将会被设置为组件属性。
    { path: '/hello/:name', component: Hello, props: true },
    // 对象模式: 此时就和params没什么关系了.此时的name将直接传给Hello组件.注意:此时的props需为静态!
    { path: '/static', component: Hello, props: { name: 'world' } },
    // 函数模式: 1,这个函数可以默认接受一个参数即当前路由对象.2,这个函数返回的是一个对象.3,在这个函数里你可以将静态值与路由相关值进行处理.
    { path: '/dynamic/:years', component: Hello, props: dynamicPropsFn },
    { path: '/attrs', component: Hello, props: { name: 'attrs' } },
  ],
});
