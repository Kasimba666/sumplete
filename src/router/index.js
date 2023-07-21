import Vue from 'vue'
import VueRouter from 'vue-router'
import Sumplete from '@/components/views/Sumplete.vue'
import BSResearch from '@/components/views/BSResearch.vue'
import Solutions from '@/components/views/Solutions.vue'
import Resolver_1 from '@/components/views/Resolver_1.vue';
import Resolver_2 from '@/components/views/Resolver_2.vue';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Sumplete',
        component: Sumplete
    },
    {
        path: '/solutions',
        name: 'Solutions',
        component: Solutions,
        children: [
            {
                path: '/r_1',
                name: 'Resolver_1',
                component: Resolver_1,
            },
            {
                path: '/r_2',
                name: 'Resolver_2',
                component: Resolver_2,
            },
        ],
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
