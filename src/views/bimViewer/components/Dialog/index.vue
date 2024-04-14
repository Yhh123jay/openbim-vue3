<script setup lang="ts">
// 水平 Horizontal
// 竖 vertical
import {computed, defineEmits, ref} from 'vue'
import {useDialogStore} from '@/store/modules/dialog'
// import {nextZIndex} from '@/utils/common'

const emit = defineEmits(['close'])
const props = defineProps({
  width: {
    type: Number,
    default: 620,
  },
  height: {
    type: Number,
    default: 400,
  },
  title: {
    type: String,
    default: '详细信息',
  },
  visible: {
    type: Boolean,
    default: false,
  },
  XY: {
    type: Array,
    default: () => [0, 0],
  },
})

const currentDom = ref()
const contentSize = computed(() => ({
  width: props.width - 15,
  height: props.height - 15 - 68,
}))
const dialogStore = useDialogStore()
const close = () => {
  dialogStore.setDialogVisible(false)
  emit('close')
}

const dialogPosition = computed(() => {
  const moveContainer = document.body

  let flag = props.XY?.some(item => item)
  if (flag) return props.XY
  //手动填写的位置不做处理
  let result = dialogStore.XY
  let left: number = result[0]
  let top: number = result[1]

  const mw = moveContainer.offsetWidth
  const mh = moveContainer.offsetHeight
  if (!currentDom.value) return result
  const ew = currentDom.value.offsetWidth
  const eh = currentDom.value.offsetHeight
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  currentDom.value.style.zIndex = nextZIndex()
  if (left < 0) {
    left = 0
  }
  if (top < 0) {
    top = 0
  }
  if (left > mw - ew) {
    left = mw - ew
  }
  if (top > mh - eh) {
    top = mh - eh
  }

  // console.log(mw, mh, currentDom.value)
  return [left, top]
})
</script>

<template>
  <transition name="el-fade-in-linear">
    <div
      v-drag
      class="preViewBox"
      v-if="dialogStore.dialogVisible"
      :style="{
      left: dialogPosition[0] + 'px',
      top: dialogPosition[1] + 'px',
    }"
      ref="currentDom"
    >
      <div class="header">
        {{ title }}
      </div>
      <div class="close" @click="close" @mousedown.stop></div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">

</style>