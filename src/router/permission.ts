//路由鉴权
import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import pinia from '@/store'
import useUserStore from '@/store/modules/user.ts'

// 获取token，判断用户是否登录
let userStore = useUserStore(pinia)

// 路由白名单

// 全局前置守卫
//@ts-ignore
router.beforeEach(async (to, from, next) => {
  nprogress.start()
  // 路由的放行函数
  if(to.path == '/file/readFileToByte') next()
  let token = userStore.token
  // 在路由守卫中发送请求获取用户信息
  let userInfo = userStore.userInfo
  // 如果用户已经登录
  if (token) {
    // 如果用户访问的是登录页面
    if (to.path === '/login') {
      next('/')
    } else {
      // 如果用户信息存在
      if (userInfo.username) {
        next()
      } else {
        // 如果用户信息不存在,发送请求获取用户信息
        await userStore.getUserInfo().then(() => {
          console.log('用户信息获取成功')
          next()
        }).catch(async (error) => {
          //token过期或者失效，退出登录
          console.log(error)
          await userStore.logout()
          next({ path: '/login', query: { redirect: to.path } })
        })
      }
    }
  }
  // 如果用户未登录
  else {
    // 如果用户访问的是登录页面
    if (to.path === '/login') {
      next()
    } else {
      next({path:'/login',query:{redirect:to.path}})
    }
  }
})

// 全局后置守卫
//@ts-ignore
router.afterEach((to, from) => {
  nprogress.done()
  document.title = to.meta.title as string || 'vue3-ts-cms';
})

//路由组件：login/404/layout/home/acl/bimViewer/...
//用户未登录，只能访问login
//用户已登录，可以访问任何页面，但不能访问login，跳转首页