// import { createRouter, createWebHashHistory } from 'vue-router';
import { createRouter, createWebHashHistory } from './grouter/index';

import Home from '../views/home.vue';
import About from '../views/about.vue';
import Todolist from '../views/todolist.vue';
import Count from '../views/count.vue';

const routes = [
  {
    path: '/',
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
    path: '/count',
    name: 'Count',
    component: Count,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
