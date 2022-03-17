import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/pages/Login.vue';
import Wrapper from '@/pages/Wrapper.vue';
import Accounts from '@/pages/Accounts.vue';

const routes: Array<RouteRecordRaw> = [
    { path: '', name: 'Login', component: Login },

    {
        path: '',
        component: Wrapper,
        children: [{ path: '/accounts', component: Accounts }]
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
