import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/unresolvedPage',
      name: 'unresolvedPage',
      component: () => import('@/views/unresolvedPage/index.vue'),
    },
    {
      path: '/ocrRecord',
      name: 'ocrRecord',
      component: () => import('@/views/ocrRecord/index.vue'),
    },
    {
      path: '/online',
      name: 'online',
      component: () => import('@/views/online/index.vue'),
    },
  ],
});

export default router;
