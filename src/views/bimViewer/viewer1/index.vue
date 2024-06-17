<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import LeftBox from '@/views/bimViewer/components/left_box.vue'
import RightBox from '@/views/bimViewer/components/right_box.vue'
import {useDialogStore} from '@/store/modules/dialog.ts'
import LeftChart from '@/views/bimViewer/viewer1/left/index.vue'
import Right from '@/views/bimViewer/viewer1/right/index.vue'
import HeaderBar from '@/views/bimViewer/components/headerBar/index.vue'
import Dialog from '@/views/bimViewer/components/Dialog/index.vue'
import {useViewersManager}  from 'vue-ifc-viewer'
import * as OBC from 'openbim-components'
import * as THREE from 'three'
import makeTextSprite from '@/utils/spriteUtil.ts'

const dialogStore = useDialogStore()
//获取viewer
const viewersManager = useViewersManager()
const viewer = viewersManager.get()

const fragmentManager = viewer.tools.get(OBC.FragmentManager)
const fragmentClassifier = viewer.tools.get(OBC.FragmentClassifier)

const logModelCount = () => {
  const fragmentManager = viewer.tools.get(OBC.FragmentManager)
  const modelsCount = fragmentManager.groups.length
  alert(`Your current model count is: ${modelsCount}. Try to load some more!`)
}

//给所有的传感器添加精灵Sprite
const addSensorSprite = async() => {
  // 定义过滤器
  const filter = {
    entities: ['IFCSENSOR'],
  };
  //不能使用propsFind类的find方法
  const result = fragmentClassifier.find(filter)
  console.log(result)
  //const expressIDs: number[] = [];
  const fragmentIds: string[] = [];
  for (const fragmentID in result) {
    if (result.hasOwnProperty(fragmentID)) {
      fragmentIds.push(fragmentID);
      // for (const num of result[fragmentID]) {
      //   expressIDs.push(num);
      // }
    }
  }
  //console.log(expressIDs);
  console.log(fragmentIds);
  //得到所有的mesh的position,expressIDs对应的是每个sensor的id，要得到与expressIDs对应的position
  const positions: any[] = [];
  for (const fragmentID of fragmentIds) {
    const fragment = fragmentManager.list[fragmentID];
    fragment.instanceToItem.forEach((item, instances) => {
      console.log('item', item);
      console.log('instance', instances);
      //expressID=fragmentID[i][instances]
      let instanceMatrix = new THREE.Matrix4();
      // 得到每个实例的变换矩阵
      fragment.mesh.getMatrixAt(instances, instanceMatrix);
      let position = new THREE.Vector3();
      position.setFromMatrixPosition(instanceMatrix);
      positions.push(position);
    });
  }
    // 创建精灵对象Sprite
    for (let i = 0; i < positions.length; i++) {
      const sprite = makeTextSprite(`Sensor`, {});
      if (!sprite) return;
      sprite.scale.set(10, 10, 10);
      sprite.position.set(positions[i].x, positions[i].y + 10, positions[i].z);
      viewer.scene.get().add(sprite);
    }
}
const showLegend = ref(false)

//下面的三个小按钮
const headList = [
  {
    title: '测点标记',
    isActive: false,
    async clickFunc() {
      this.isActive = !this.isActive
      await addSensorSprite()
    }
  },
  {
    title: '模型数量',
    isActive: false,
    type: 'equipment_water',
    clickFunc() {
      this.isActive = !this.isActive
      logModelCount()
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
  <LeftBox title="总体概况"> <LeftChart></LeftChart></LeftBox>
  <RightBox title="传感器状态">
    <Right />
  </RightBox>
  <HeaderBar :list="headList" @clicks="headClick"></HeaderBar>
  <Dialog :width="380" :height="280" :title="dialogStore.content.name" v-if="dialogStore.tag == '传感器' || dialogStore.tag == 'riverMarker'">
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