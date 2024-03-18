<script setup lang="ts">

import { HomeFilled, OfficeBuilding,Monitor } from '@element-plus/icons-vue'
import useLayoutStore from '@/store/modules/layout.ts'

let layoutStore = useLayoutStore()

</script>

<template>
      <!--菜单组件-->
      <el-menu background-color="#545c64" text-color="white" active-text-color="orange"
               :collapse="layoutStore.isFold" :default-active="$route.path" router>
        <el-menu-item index="/home">
          <el-icon><HomeFilled /></el-icon>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/bimViewer">
          <el-icon><OfficeBuilding /></el-icon>
          <span slot="title">模型展示</span>
        </el-menu-item>
        <el-sub-menu index="/manage">
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/manage/user">
            <el-icon><HomeFilled /></el-icon>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/manage/menu">
            <el-icon><HomeFilled /></el-icon>
            <span slot="title">菜单管理</span>
          </el-menu-item>
          <el-menu-item index="/manage/log">
            <el-icon><HomeFilled /></el-icon>
            <span slot="title">日志管理</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
</template>

<style scoped lang="scss">
  .el-menu {
    border:0!important;
  }
</style>