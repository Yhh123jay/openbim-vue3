// 对外暴露插件对象
import SvgIcon from './SvgIcon/index.vue';
import type { App, Component } from 'vue';
const components: { [name: string]: Component } = { SvgIcon };
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      // 将组件注册为全局组件
      app.component(key, components[key]);
    })
  }
}