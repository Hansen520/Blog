import { createRouter, createWebHashHistory } from '@/vue-router';
import vuexHandle from '../views/vuex-test.vue';
import Home from '../views/Home.vue';
import Homea from '../views/HomeComponents/Homea.vue';
import Homeb from '../views/HomeComponents/Homeb.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      console.log('beforeEnter-home', to);
      next();
    },
    children: [
      {
        path: 'a',
        name: 'Homea',
        component: Homea,
        beforeEnter: (to, from, next) => {
          console.log('beforeEnter-homea', to);
          next();
        },
        // component: {
        //   render: () => <h1>a页面</h1>
        // }
      },
      {
        path: 'b',
        name: 'Homeb',
        component: Homeb,
        beforeEnter: (to, from, next) => {
          console.log('beforeEnter-homeb', to);
          next();
        },
        // component: {
        //   render: () => <h1>b页面</h1>
        // }
      },
    ],
  },
  {
    path: '/vuex',
    name: '/vuex',
    component: vuexHandle,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {
  console.log('beforeEach', to, from);
});
router.beforeResolve((to, from) => {
  console.log('beforeResolve', to, from);
});
router.afterEach((to, from) => {
  console.log('afterEach', to, from);
});

export default router;
