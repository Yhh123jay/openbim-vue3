<script setup lang="ts">
  import IFCViewer from 'vue-ifc-viewer'
  //import Sidebar from "@/components/Sidebar.vue"
  import TopRight from "@/views/bimViewer/components/topRight/index.vue"
  import Header from "@/views/bimViewer/components/header/index.vue"
</script>

<template>
<!--  <Sidebar />-->
  <IFCViewer class="viewer"/>
<!--  <img src="@/assets/images/bridge.png" alt="示例图片" class="overlay-image"/>-->
  <Header class="header"/>
  <TopRight class="top-right"/>
  <router-view></router-view>
</template>

<style scoped lang="scss">
.viewer-container {
  position: relative;
  height: 100vh; /* 确保容器有足够的高度 */
}
.viewer {
  width: 100%;
  height: 100%;
}
.overlay-image, button {
  position: absolute;
  top: 10px; /* 根据需要调整位置 */
  right: 10px; /* 根据需要调整位置 */
//  设置透明度
  opacity: 0.5;
  z-index: 1;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid #fff;
  background-color: #fff;
  cursor: pointer;
}

.top-right{
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
}

</style>