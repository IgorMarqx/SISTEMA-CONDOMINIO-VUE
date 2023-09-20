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
        path: '/home',
        name: 'home',
        component: () => import('../views/CondominiumView.vue'),
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('../views/UsersView.vue'),
      },
      {
        path: '/users/create',
        name: 'users/create',
        component: () => import('../components/users/UsersCreateComponent.vue'),
      },
      {
        path: '/users/:id/edit',
        name: 'users/edit',
        component: () => import('../components/users/UsersEditComponent.vue'),
      },
      {
        path: '/users/:id/delete',
        name: 'users/delete',
        component: () => import('../components/users/UsersDeleteComponent.vue'),
      },
      {
        path: '/users/:id/show',
        name: 'users/show',
        component: () => import('../components/users/UsersShowComponent.vue'),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
