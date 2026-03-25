import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home.vue'

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
  ],
})

export default router
