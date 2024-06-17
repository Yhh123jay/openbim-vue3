# bimapp-vue3项目
# 1、项目概述

项目涉及技术：vue3+TypeScript+vue-router+pinia+element-plus+axios+echarts
            +openBim-components
本项目主要是以尚硅谷的硅谷甄选项目为框架搭建，结合openBIM组件库，实现了一个BIM应用的前端项目。
项目主要包括了登录、首页、项目管理、项目详情、项目成员、项目文件、项目模型、项目进度、项目质量、项目安全、项目成本、项目环境、项目设备、项目材料、项目人员、项目通知、项目日志、项目报表等模块。



# 2、项目搭建

## 2.1 项目初始化
一个项目要有统一的规范，需要使用eslint+stylelint+prettier来对我们的代码质量做检测和修复，
需要使用husky来做commit拦截，需要使用commitlint来统一提交规范，需要使用preinstall来统一包管理工具。

通过`pnpm run lint`去检测语法，如果出现不规范格式,通过`pnpm run fix` 修改

当我们运行`pnpm run format`的时候，会把代码直接格式化

## 2.2 项目集成

### 2.2.1 集成element-plus

全局引入element-plus

```ts
//引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//配置国际化,支持中文
//@ts-ignore
import locale from 'element-plus/dist/locale/zh-cn.mjs'
```

### 2.2.2 集成sass

### 2.2.3 集成axios

新建utils/request.ts对axios进行二次封装，管理axios请求的基础路径，请求拦截器，相应拦截器等基本配置

新建api文件夹，配置axios请求的api规则，以后直接使用其中写好的请求函数即可。

### 2.2.4 集成vue-router

新建views，里面存放路由组件

新建router，通过vue-router实现路由配置

### 2.2.5 集成pinia

新建store文件夹，里面存放pinia的store文件

### 2.2.6 集成openBIM组件库

需要引入web-ifc、bim-fragment、openbim-components、vue-ifc-viewer这几个组件库。

目前使用的openbim-components为1.4.5版本，更换为1.5.0版本出现bug。后期需要更换为2.0以上，使用新UI。

openbim组件库主要是安装了一个ifcViewer插件，其在viewer中初始化界面，然后通过该插件提供的composable (useViewersManager)可以使用该IFCViewer

```ts
<template>
  <IFCViewer />
</template>

<script setup lang="ts">
import * as OBC from "openbim-components"
import { onMounted } from 'vue';
import IFCViewer from 'vue-ifc-viewer' //This is the VueJS component that will render the IFCViewer in your app.
import { useViewersManager } from 'vue-ifc-viewer' //This is a VueJS composable that lets you access the viewer instance.

const viewersManager = useViewersManager()
const viewer = viewersManager.get()

onMounted(() => {
  const ifcLoader = viewer.tools.get(OBC.FragmentIfcLoader)
  ifcLoader.onIfcLoaded.add(model => {
    console.log(`${model.name} loaded!`)
  })
})
</script>
```

Vue-ifc-viewer relies on the provide/inject api from VueJS in order to [provide](https://github.com/HoyosJuan/vue-ifc-viewer/blob/main/lib/index.ts#L15) to the whole app with a [ViewersManager](https://github.com/HoyosJuan/vue-ifc-viewer/blob/main/lib/composables/useViewerManager.ts#L8). The ViewersManager lets you create and access different instances of an OpenBIM Components viewer (yes! you can create more than one viewer at the time). The plugin comes with a default ready to go viewer setup, but you can customize it as you want to suit the needs of your app.

**(1)自定义viewer**

When you use the plugin in your app, you've the chance to pass an **optional configuration** object to customize the viewer logic. This can be done as the following:

当使用 IFCViewer 组件时，它将使用上述配置来初始化查看器。

```ts
import * as OBC from "openbim-components"
import { createApp } from "vue"
import { ifcViewer, IfcPluginConfig, ViewerSetup } from "vue-ifc-viewer"
import App from "./components/App.vue"

//You can create this function in other file and import it here
const customViewer: ViewerSetup = async (viewer: OBC.Components, container: HTMLDivElement) => {

  //Initialize the viewer with some basics
  const sceneComponent = new OBC.SimpleScene(viewer)
  sceneComponent.setup()
  viewer.scene = sceneComponent

  const renderer = new OBC.PostproductionRenderer(viewer, container)
  viewer.renderer = renderer
  const camera = new OBC.OrthoPerspectiveCamera(viewer)
  viewer.camera = camera

  const raycaster = new OBC.SimpleRaycaster(viewer)
  viewer.raycaster = raycaster

  await viewer.init()
  camera.updateAspect()
  renderer.postproduction.enabled = true

  //You can start to add tools as you want!
  //Refer to the official documentation at docs.thatopen.com to know more, in the tutorials section you can see many examples.
}

const ifcPluginConfig: IfcPluginConfig = {
  defaultViewerSetup: viewer
}

createApp(App).use(ifcViewer, ifcPluginConfig).mount("#app")
```

**(2)访问Viewer**

通过useViewersManager 来访问

```ts
<script setup lang="ts">
import { useViewersManager } from 'vue-ifc-viewer'

const viewersManager = useViewersManager()
const viewer = viewersManager.get()
//Do whatever you want with the viewer instance, like using other tools.
</script>
```



(3)创建多个Viewer

You can use the IFCViewer component from vue-ifc-viewer as many times as you want in order to create multiple viewers, the only thing to keep in mind is to give them unique names.

```ts
<template>
  <IFCViewer name="viewer-a" />
  <IFCViewer name="viewer-b" />
</template>

<script setup lang="ts">
import IFCViewer from 'vue-ifc-viewer'
</script>
```

如果您没有为查看器指定任何名称，它将被命名为“default”。此外，所有查看器都将使用您在插件配置中设置的相同设置进行初始化。

### 2.2.7 集成echarts

借鉴智慧水利中echats的集成方式，将echarts注册为全局组件。

## 2.3 项目目录结构

```
vite-project
```

# 3、项目功能

## 3.1 用户登录与授权 -- 已实现

仿照硅谷甄选的项目完成

## 3.2 BIM模型展示 -- 已实现

通过初始化viewer来展示bim模型。

## 3.2 监测数据展示 -- 已实现

1、找出所有的监测点

2、给监测点添加一个Sprite，并给予一个点击事件

3、点击监测点，弹出监测点的监测数据

## 3.3 4D施工阶段模拟 -- 已实现

1、提取IFCTask的信息

2、将构件进行分组

3、编写相关类

4、实现功能

## 3.4 模型轻量化 -- 已实现



## 3.5 文档管理 -- 已实现

已完成

## 3.6 监测设备管理



## 3.7 机器学习模块



## 3.8 养护流程

使用后端flowable提供的服务

