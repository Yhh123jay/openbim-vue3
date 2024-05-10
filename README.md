# bimapp-vue3项目
项目涉及技术：vue3+TypeScript+vue-router+pinia+element-plus+axios+echarts
            +openBim-components
本项目主要是以尚硅谷的硅谷甄选项目为框架搭建，结合openBIM组件库，实现了一个BIM应用的前端项目。
项目主要包括了登录、首页、项目管理、项目详情、项目成员、项目文件、项目模型、项目进度、项目质量、项目安全、项目成本、项目环境、项目设备、项目材料、项目人员、项目通知、项目日志、项目报表等模块。

# 1、vue3组件通信复习
1. props
2. $emit
3. $parent/$children
4. $attrs/$listeners
5. provide/inject
6. EventBus
7. v-model
8. pinia
9. slot

# 2、项目搭建

## 2.1 项目初始化
一个项目要有统一的规范，需要使用eslint+stylelint+prettier来对我们的代码质量做检测和修复，
需要使用husky来做commit拦截，需要使用commitlint来统一提交规范，需要使用preinstall来统一包管理工具。

通过`pnpm run lint`去检测语法，如果出现不规范格式,通过`pnpm run fix` 修改

当我们运行`pnpm run format`的时候，会把代码直接格式化

## 2.2 项目集成

### 2.2.1 集成element-plus

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

### 2.2.7 集成echarts

## 2.3 项目目录结构

```
