<script setup lang="ts">
//施工阶段界面
import GanttChart from '@/components/GanttChart/index.vue'
import {useViewersManager}  from 'vue-ifc-viewer'
import { useBimStore } from '@/store/modules/bimScene.ts'
import { ref, watch } from 'vue'
import {findTasks,extractRelatedObjects} from '@/bim-components/4DTool/extractElementByDate.ts'
import { FragmentManager } from 'openbim-components/src/fragments/FragmentManager'
import { FragmentHider } from 'openbim-components'
import { FragmentIdMap } from 'bim-fragment'

const viewersManager = useViewersManager()
const viewer = viewersManager.get()
const bimStore = useBimStore()
const fragmentManager = viewer.tools.get(FragmentManager)
const hider = viewer.tools.get(FragmentHider)

//监听bimStore中currentTime的数据变化
// 监听 currentTime 的变化
watch(() => bimStore.currentTime, (newTime, oldTime) => {
  // console.log('currentTime changed from', oldTime, 'to', newTime);
  // 在这里执行您想要的操作
  const tasks = findTasks(bimStore.ScheduleData.tasks, newTime)
  // console.log('tasks', tasks)
  const objectIds = extractRelatedObjects(tasks)
  // console.log('objectIds', objectIds)
  const result: FragmentIdMap = {}
  const fragmentList = fragmentManager.list

  for (const fragmentId in fragmentList) {
    const fragment = fragmentList[fragmentId]
    result[fragmentId] = new Set();
    fragment.instanceToItem.forEach((item, instances) => {
      //如果objectIds中包含item，则将这个对应的Map其加入到result中
      if (objectIds.includes(item)) {
        result[fragmentId].add(item)
      }
    })
    if (result[fragmentId].size === 0) {
      delete result[fragmentId]
    }
  }
  requestAnimationFrame(() => hider.isolate(result));
  // hider.isolate(result)
});


</script>

<template>
  <div class="bottom-box">
    <gantt-chart></gantt-chart>
  </div>

</template>

<style scoped lang="scss">
  .bottom-box {
    position: absolute;
    @include Width(1920);
    @include wHeight(300);
    @include Top(78);
    @include Left(0);
    background-color: white;
    z-index: 3;
  }
</style>