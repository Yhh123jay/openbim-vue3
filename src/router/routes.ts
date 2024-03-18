// 对外暴露配置路由
export const constantRoute = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout', // 路由名称
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页'
        }
      },
      {
        path: '/bimViewer',
        component: () => import('@/views/bimViewer/index.vue'),
        name: 'bimViewer',
        meta: {
          title: '模型展示'
        }
      },
    ]
  },
  {
    path: '/manage',
    component: () => import('@/layout/index.vue'),
    name: 'manage', // 路由名称
    meta: {
      title: '系统管理',
    },
    redirect: '/manage/user',
    children: [
      {
        path: '/manage/user',
        component: () => import('@/views/manage/user/index.vue'),
        name: 'user',
        meta: {
          title: '用户管理'
        }
      },
      {
        path: '/manage/menu',
        component: () => import('@/views/manage/menu/index.vue'),
        name: 'menu',
        meta: {
          title: '菜单管理'
        }

      },
      {
        path: '/manage/log',
        component: () => import('@/views/manage/log/index.vue'),
        name: 'log',
        meta: {
          title: '日志管理'
        }
      },
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login'
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'notFound'
  }
]