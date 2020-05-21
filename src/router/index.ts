import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '../views/Layout/Index.vue'

Vue.use(VueRouter);

  export const asyncRouterMap = [
    {
      path: '/',
      name: 'dashboard',
      component: Layout,
      hidden: true,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          meta: {
            title: '首页',
            icon: 'fa fa-home',
          },
          component: () => import('@/views/Home.vue')
        }
      ]
    },
    {
      path: '/dataManage',
      name: 'dataManage',
      component: Layout,
      hidden: true,
      meta: {
        title: '数据管理',
        icon: 'fa fa-database'
      },
      redirect: '/tableData',
      children: [
        {
          path: '/tableData',
          name: 'tableData',
          meta: {
            title: '表格管理',
            icon: 'fa fa-table'
          },
          component: () => import('@/views/DataManage/TableData.vue')
        },
        {
          path: '/chartsData',
          name: 'chartsData',
          meta: {
            title: '图表管理',
            icon: 'fa fa-bar-chart'
          },
          component: () => import('@/views/DataManage/ChartsData.vue')
        },
        {
          path: '/formData',
          name: 'formData',
          meta: {
            title: '表单管理',
            icon: 'fa fa-file-text-o'
          },
          component: () => import('@/views/DataManage/FormData.vue')
        }
      ]
    },
    {
      path: '/userManage',
      name: 'usermanage',
      component: Layout,
      hidden: true,
      redirect: '/accountData',
      children: [
        {
          path: '/accountData',
          name: 'accountData',
          meta: {
            title: '账户管理',
            icon: 'fa fa-user-plus'
          },
          component: () => import('@/views/UserManage/AccountData.vue')
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: Layout,
      hidden: false,
      redirect: '/userInfo',
      children: [
        {
          path: '/userInfo',
          name: 'userInfo',
          meta: {
            title: '个人中心'
          },
          component: () => import('@/views/UserManage/UserInfo.vue')
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      hidden: false,
      meta: {
        title: '404',
      },
      component: () => import('@/views/404.vue')
    },
    {
      path: '/login',
      name: 'Login',
      hidden: false,
      meta: {
        title: '系统登录',
      },
      component: () => import('@/views/Login/Login.vue')
    },
    {
      path: '/password',
      name: 'Password',
      hidden: false,
      meta: {
        title: '找回密码',
      },
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
