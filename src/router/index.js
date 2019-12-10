import Vue from 'vue'
import VueRouter from 'vue-router'
import meeting from '../views/meeting.vue'
import ceshi from '../views/ceshi.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'meeting',
    component: meeting
  },
  {
    path: '/ceshi',
    name: 'ceshi',
    component: ceshi
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
