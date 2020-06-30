/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import More from '../views/More.vue'
import Read from '../views/Read.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/more/:id',
    name: 'More',
    component: More
  },
  {
    path: '/read/:id',
    name: 'Read',
    component: Read
  },
  {
    path: '/fenlei',
    name: 'Fenlei',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Fenlei.vue')
  }
]

const router = new VueRouter({
  mode:'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
