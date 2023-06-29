import Vue from 'vue'
import VueRouter from 'vue-router'
import Sumplete from '@/components/views/Sumplete.vue'
import BSResearch from '@/components/views/BSResearch.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Sumplete',
    component: Sumplete
  },
  {
    path: '/bs',
    name: 'BSResearch',
    component: BSResearch
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
