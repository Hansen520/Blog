import { createRouter, createWebHashHistory } from 'vue-router';
// import { createRouter, createWebHashHistory } from './grouter/index';
import NProgress from 'nprogress';
import { getToken } from '../utils/auth';
import Home from '../views/home.vue';
import About from '../views/about.vue';
import Todolist from '../views/todolist.vue';
import Count from '../views/count.vue';
import Login from '../views/Login.vue';
import Pinia from '../views/pinia.vue'
import Welcome from '../views/Welcome.vue';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/welcome',
    name: Welcome,
    component: Welcome,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
      },
      {
        path: '/about',
        name: 'About',
        component: About,
      },
      {
        path: '/todolist',
        name: 'Todolist',
        component: Todolist,
      },
      {
        path: '/pinia',
        name: 'pinia',
        component: Pinia
      },
      {
        path: '/count',
        name: 'Count',
        component: Count,
      },
    ],
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  let token = getToken();
  console.log(token, 54);
  NProgress.start();
  if (!token) {
    next('/login');
  } else {
    next();
  }
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
