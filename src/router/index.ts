import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { AuthLayout, MainLayout } from '@/layout'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    component: AuthLayout,
    children: [
      {
        name: 'Login',
        path: '/login',
        meta: {
          title: '登录'
        },
        component: () => import('@/views/Login/index.vue')
      },
      {
        name: 'ForgetSecret',
        path: '/forgetSecret',
        meta: {
          title: '忘记密码'
        },
        component: () => import('@/views/ForgetSecret/index.vue')
      },
      {
        name: '404',
        path: '/404',
        meta: {
          title: '404'
        },
        component: () => import('@/views/Others/404.vue')
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: '/404'
      }
    ]
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        name: 'Home',
        path: '/home',
        meta: {
          title: '首页'
        },
        component: () => import('@/views/Home/index.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
