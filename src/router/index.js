import Vue from 'vue'
import VueRouter from 'vue-router'
import Sumplete from '@/components/views/Sumplete.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Sumplete
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
