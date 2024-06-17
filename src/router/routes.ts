// 对外暴露配置路由
export const constantRoute = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout', // 路由名称
    redirect: '/home',
    meta: {
      title: '',
      hidden: true,
      icon: '',
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        }
      },
      {
        path:'/file',
        component: () => import('@/views/fileSystem/index.vue'),
        name: 'file',
        meta: {
          title: '文件管理',
          hidden: false,
          icon: 'FolderOpened',
        }
      },
    ]
  },
  {
    path: '/bimViewer',
    component: () => import('@/views/bimViewer/index.vue'),
    name: 'bimViewer',
    meta: {
      title: '模型展示',
      hidden: false,
      icon: 'Platform',
    },
    children:[
      {
        name: "viewer1",
        path: "/bimViewer/viewer1",
        component: () => import("@/views/bimViewer/viewer1/index.vue"),
        meta:{
          title:'模型展示1',
          hidden: false,
          icon: 'Platform',
        }
      },
      {
        name: "viewer2",
        path: "/bimViewer/viewer2",
        component: () => import("@/views/bimViewer/viewer2/index.vue"),
        meta:{
          title:'模型展示2',
          hidden: false,
          icon: 'Platform',
        }
      },
      {
        name: "viewer3",
        path: "/bimViewer/viewer3",
        component: () => import("@/views/bimViewer/viewer3/index.vue"),
        meta:{
          title:'模型展示3',
          hidden: false,
          icon: 'Platform',
        }
      }
    ]
  },
  {
    path: '/manage',
    //只有这样使用才能在layout布局中
    component: () => import('@/layout/index.vue'),
    name: 'manage', // 路由名称
    meta: {
      title: '系统管理',
      hidden: false,
      icon: 'Setting',
    },
    redirect: '/manage/user',
    children: [
      {
        path: '/manage/user',
        component: () => import('@/views/manage/user/index.vue'),
        name: 'user',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User'
        }
      },
      {
        path: '/manage/menu',
        component: () => import('@/views/manage/menu/index.vue'),
        name: 'menu',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Menu'
        }

      },
      {
        path: '/manage/log',
        component: () => import('@/views/manage/log/index.vue'),
        name: 'log',
        meta: {
          title: '日志管理',
          hidden: false,
          icon: 'Log'
        }
      },
    ]
  },

  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录',
      hidden: true,
      icon: 'Promotion', //菜单文字左侧的图标,支持element-plus全部图标
    }
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'notFound',
    meta: {
      title: '任意路由',
      hidden: true
    }
  }
]

//异步路由
export const asnycRoute = [
  {
    path: '/manage',
    //只有这样使用才能在layout布局中
    component: () => import('@/layout/index.vue'),
    name: 'manage', // 路由名称
    meta: {
      title: '系统管理',
      hidden: false,
      icon: 'Setting',
    },
    redirect: '/manage/user',
    children: [
      {
        path: '/manage/user',
        component: () => import('@/views/manage/user/index.vue'),
        name: 'user',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User'
        }
      },
      {
        path: '/manage/menu',
        component: () => import('@/views/manage/menu/index.vue'),
        name: 'menu',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Menu'
        }

      },
      {
        path: '/manage/log',
        component: () => import('@/views/manage/log/index.vue'),
        name: 'log',
        meta: {
          title: '日志管理',
          hidden: false,
          icon: 'Log'
        }
      },
    ]
  },
]