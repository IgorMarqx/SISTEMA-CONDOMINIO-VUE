import { createRouter, createWebHistory } from 'vue-router'
import Guard from '../services/middleware';

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    beforeEnter: Guard.auth,
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: '/users',
        name: 'users',
        beforeEnter: Guard.auth,
        component: () => import('../views/UsersView.vue'),
      },
      {
        path: '/users/create',
        name: 'users/create',
        beforeEnter: Guard.auth,
        component: () => import('../components/UsersCreateComponent.vue'),
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
