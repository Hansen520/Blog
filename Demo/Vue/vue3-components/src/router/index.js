import { createRouter, createWebHashHistory } from '@/vue-router'
import vuexHandle from '../views/vuex-test'
import Home from '../views/Home'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'a',
        component: {
          render: () => <h1>a页面</h1>
        }
      },
      {
        path: 'b',
        component: {
          render: () => <h1>b页面</h1>
        }
      }
    ]
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
