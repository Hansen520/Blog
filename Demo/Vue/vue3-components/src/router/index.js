import { createRouter, createWebHashHistory } from 'vue-router'
import vuexHandle from '../views/vuex-test'
const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/vuex'
  },
  {
    path: '/vuex',
    name: '/vuex',
    component: vuexHandle
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
