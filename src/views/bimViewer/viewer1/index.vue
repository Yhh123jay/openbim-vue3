<script setup lang="ts">
import { reactive, onUnmounted, ref } from 'vue'
import LeftBox from '@/views/bimViewer/components/left_box.vue'
import RightBox from '@/views/bimViewer/components/right_box.vue'
import {useDialogStore} from '@/store/modules/dialog.ts'
import LeftChart from '@/views/bimViewer/viewer1/left/index.vue'
import Right from '@/views/bimViewer/viewer1/right/index.vue'
import HeaderBar from '@/views/bimViewer/components/headerBar/index.vue'
import Dialog from '@/views/bimViewer/components/Dialog/index.vue'

const dialogStore = useDialogStore()
//地区规划需要的数据，可以删除

const showLegend = ref(false)

//下面的三个小按钮
const headList = [
  {
    title: '河道相关',
    isActive: false,
    async clickFunc() {
      this.isActive = !this.isActive
      /**
      deleteRiverMarker()
      if (this.isActive) {
        //打点
        await addRiverMarker()
        await __g.camera.set(...[-1146.27625, -978.24375, 4663.395625, -28.515253, -8.418963, 1])
        await delay(1000)
        await __g.camera.playAnimation(19)
        await delay(1000)
        await __g.camera.stopAnimation()
      } else {
        //
      }*/
    }
  },
  {
    title: '治理人员',
    isActive: false,
    type: 'equipment_water',
    clickFunc() {
      this.isActive = !this.isActive
    }
  },
  {
    title: '地区规划',
    isActive: false,
    type: 'equipment_video',
    async clickFunc() {
      this.isActive = !this.isActive
    }
  }
]
const headClick = (item: typeof headList[0]) =>   {
  dialogStore.setDialogVisible(false) // 用于清除有的tab 点击了tag 出来了弹窗 但是切换tab的时候弹窗还在的情况
  headList.forEach((ele: { title: string; isActive: boolean; clickFunc: () => void }) => {
    if (ele.isActive && ele !== item) {
      ele.clickFunc()
    }
  })
  item.clickFunc()
}

onUnmounted(() => {
  headList.forEach(item => item.isActive && item.clickFunc())
  dialogStore.setDialogVisible(false)
})
</script>

<template>
  <LeftBox title="排水状况"> <LeftChart></LeftChart></LeftBox>
  <RightBox title="污水设施">
    <Right />
  </RightBox>
  <HeaderBar :list="headList" @clicks="headClick"></HeaderBar>
  <Dialog :width="380" :height="280" :title="dialogStore.content.name" v-if="dialogStore.tag == '治理人员' || dialogStore.tag == 'riverMarker'">
    <div class="content">
      <div class="content__box">
        <div class="content__box--left">
          <img :src="dialogStore.content.url" :style="{ cursor: dialogStore.content.id ? 'pointer' : '' }" alt="" />
        </div>
        <div class="content__box--right">
          <template v-for="(item, index) in dialogStore.content.data" :key="index">
            <div class="content__box--right__item">
              <div class="content__box--right__item--label">{{ item.name }}:</div>
              <div class="content__box--right__item--value">
                {{ item.value }}
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </Dialog>
  <transition name="custom-classes-transition" enter-active-class="animate__animated   animate__fadeInRight" leave-active-class="animate__animated  animate__fadeOutRight">
    <div class="people__legend" v-if="showLegend">
      <template v-for="(item, index) in colors2" :key="index">
        <div class="people__legend--item">
          <div
            class="people__legend--item__box"
            :style="{'background-color': `rgba(${item.color[0]},${item.color[1]},${item.color[2]},${item.color[3]})`}"
          ></div>
          <div class="people__legend--item__name">
            {{ item.name }}
          </div>
        </div>
      </template>
    </div>
  </transition>
</template>

<style scoped lang="scss">

</style>