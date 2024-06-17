// 对外暴露插件对象
import SvgIcon from './SvgIcon/index.vue';
// import Icon from './Icon/index.vue';
import V3Echarts from '@/components/V3Echarts/index.vue'
import LeaseTitle from '@/components/LeaseTitle/index.vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import type { App, Component } from 'vue';
const components: { [name: string]: Component } = { SvgIcon, V3Echarts, LeaseTitle};
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      // 将组件注册为全局组件
      app.component(key, components[key]);
    })
    // 注册element-plus的图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  }
}