import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '../views/Layout/Index.vue'

Vue.use(VueRouter);

  export const asyncRouterMap = [
    {
      path: '/',
      name: 'dashboard',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/Home.vue')
        }
      ]
    },
    {
      path: '/dataManage',
      name: 'dataManage',
      component: Layout,
      redirect: '/tableData',
      children: [
        {
          path: '/tableData',
          name: 'tableData',
          component: () => import('@/views/DataManage/TableData.vue')
        },
        {
          path: '/formData',
          name: 'formData',
          component: () => import('@/views/DataManage/FormData.vue')
        },
        {
          path: '/chartsData',
          name: 'chartsData',
          component: () => import('@/views/DataManage/ChartsData.vue')
        }
      ]
    },
    {
      path: '/userManage',
      name: 'usermanage',
      component: Layout,
      redirect: '/accountData',
      children: [
        {
          path: '/accountData',
          name: 'accountData',
          component: () => import('@/views/UserManage/AccountData.vue')
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: Layout,
      redirect: '/userInfo',
      children: [
        {
          path: '/useriInfo',
          name: 'userInfo',
          component: () => import('@/views/UserManage/UserInfo.vue')
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login/Login.vue')
    },
    {
      path: '/password',
      name: 'Password',
      component: () => import('@/views/Login/Password.vue')
    },
    {
      path: '*',
      redirect: '/404'
    },
  ]

  const routes: Array<RouteConfig> = asyncRouterMap;

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 设置请求拦截
router.beforeEach((to: any, from: any, next: any) => {
  const isLogin = localStorage.tsToken ? true : false;
  if (to.path == '/login' || to.path == '/password') {
    next();
  } else {
    isLogin ? next() : next('/login');
  }
})

export default router;
