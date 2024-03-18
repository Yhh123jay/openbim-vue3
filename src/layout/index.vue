<script setup lang="ts">
  import Menu from '@/layout/menu/index.vue'
  import TabBar from '@/layout/tabBar/index.vue'
  import Logo from '@/layout/logo/index.vue'
  import useLayoutStore from '@/store/modules/layout.ts'
  import { nextTick, ref, watch } from 'vue'

  // 刷新页面方法
  let layoutStore = useLayoutStore()
  let flag = ref(true)
  watch(()=> layoutStore.refresh,
    ()=>{
    flag.value = false
    nextTick(()=>{
      flag.value = true
    })
  })

</script>

<template>
  <div class="layout_container">
    <!--顶部导航-->
    <div class="layout_header">
      <Logo />
      <TabBar />
    </div>
    <div class="layout_footer">
      <!--左侧菜单-->
      <div class="layout_menu" :class="{ isFold: layoutStore.isFold }">
        <el-scrollbar class="scrollbar">
        <!--菜单组件-->
          <Menu></Menu>
        </el-scrollbar>
      </div>
      <!--右侧内容-->
      <div class="layout_content">
        <router-view v-if="flag"></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .layout_container {
    width: 100%;
    height: 100vh;
    background: #13c2c2;
    display: flex;
    flex-direction: column;
    .layout_header {
      background-color: white;
      height: 80px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      //字体颜色
      color: black;
      //字体大小
      font-size: 20px;
      //字体粗细
      font-weight: bold;
    }
    .layout_footer {
      flex: 1;
      height: 100%;
      display: flex;
      background: #faad14;
      .layout_menu {
        width: $base_menu_width;
        height: 100%;
        background-color: #545c64;
        &.isFold {
          width: $base_menu_width_fold;
        }
        .scrollbar {
          width: 100%;
          height: 100%;
        }
      }
      .layout_content {
        flex: 1;
        background-color: grey;
        //圆角
        border-radius: 5px;
      }
    }
  }
</style>