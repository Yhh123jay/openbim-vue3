// 通过vue-router配置路由
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from '@/router/routes.ts'

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
  // 路由跳转后滚动条置顶
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

export default router