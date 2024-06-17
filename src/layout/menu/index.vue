<script setup lang="ts">
import useLayoutStore from '@/store/modules/layout.ts'

let layoutStore = useLayoutStore()
//获取父组件传递的路由数据
const props = defineProps({
  menuList: {
    type: Array,
    default: () => []
  }
})
</script>
<script lang="ts">
export default{
  name: 'Menu',
}
</script>

<template>
<!--  动态生成菜单，根据路由生成-->
<!--      菜单组件-->
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
        <template v-if="true">
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
        </template>
        <el-menu-item index="/file">
          <el-icon><FolderOpened /></el-icon>
          <span slot="title">文档管理</span>
        </el-menu-item>
      </el-menu>

<!--      根据路由动态生成菜单,不太符合项目要求-->
<!--      <el-menu background-color="#545c64" text-color="white" active-text-color="orange"    -->
<!--               :collapse="layoutStore.isFold" :default-active="$route.path" router>    -->
<!--          <el-scrollbar wrap-class="scrollbar-wrapper" style="height: 100%;">-->
<!--            <template v-for="(item, index) in menuList">-->
<!--              <template v-if="!item.children">-->
<!--                <el-menu-item v-if="!item.meta.hidden" :index="item.path">-->
<!--                  <template #title>-->
<!--                    <el-icon>-->
<!--                      <component :is="item.meta.icon"></component>-->
<!--                    </el-icon>-->
<!--                    <span>{{ item.meta.title }}</span>-->
<!--                  </template>-->
<!--                </el-menu-item>-->
<!--              </template>-->
<!--              <template v-if="item.children && item.children.length==1">-->
<!--                <el-menu-item v-if="!item.children[0].meta.hidden" :index="item.children[0].path">-->
<!--                  <template #title>-->
<!--                    <el-icon>-->
<!--                      <component :is="item.children[0].meta.icon"></component>-->
<!--                    </el-icon>-->
<!--                    <span>{{ item.children[0].meta.title }}</span>-->
<!--                  </template>-->
<!--                </el-menu-item>-->
<!--              </template>-->
<!--              <template v-if="item.children && item.children.length>1">-->
<!--                <el-sub-menu :index="item.path">-->
<!--                  <template #title>-->
<!--                    <el-icon>-->
<!--                      <component :is="item.meta.icon"></component>-->
<!--                    </el-icon>-->
<!--                    <span>{{ item.meta.title }}</span>-->
<!--                  </template>-->
<!--                  <Menu :menuList="item.children"></Menu>-->
<!--                </el-sub-menu>-->
<!--              </template>-->
<!--            </template>-->
<!--    </el-scrollbar>-->
<!--  </el-menu>-->

</template>

<style scoped lang="scss">
  .el-menu {
    border:0!important;
  }
</style>