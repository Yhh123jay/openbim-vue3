import { createApp } from 'vue'
import App from '@/App.vue'
//引入ifc-viewer
import { ifcViewer, IfcPluginConfig } from 'vue-ifc-viewer'
import { viewer } from '@/bim-components/viewer'
//引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//配置国际化,支持中文
//@ts-ignore
import locale from 'element-plus/dist/locale/zh-cn.mjs'
//引入svg需要配置的插件
import 'virtual:svg-icons-register'
//引入全局组件
import globalComponent from './components/index';
// 引入全局样式
import '@/styles/index.scss'
// 引入路由
import router from './router'
// 引入路由鉴权
import '@/router/permission'
// 引入仓库pinia
import pinia from './store'

// ifc-viewer配置
const ifcViewerConfig : IfcPluginConfig = {
    defaultViewerSetup: viewer
}
const app = createApp(App)
app.use(ElementPlus,{ locale})
app.use(globalComponent)
app.use(router)
app.use(pinia)
app.use(ifcViewer,ifcViewerConfig)
app.mount('#app')
