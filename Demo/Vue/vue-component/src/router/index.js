import Vue from 'vue'
import VueRouter from 'vue-router'
import longList from '../views/longList/index'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/longList',
      name: 'longList',
      component: longList
    }
  ]
})
