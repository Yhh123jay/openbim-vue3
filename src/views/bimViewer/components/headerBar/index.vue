<template>
  <transition
    appear
    name="custom-classes-transition"
    enter-active-class="animate__animated  animate__fadeInUp"
    leave-active-class="animate__animated  animate__fadeOutDown"
  >
    <div class="header-bar" ref="headerBar">
      <div class="bar-box">
        <div
          class="bar-item"
          v-for="(item, index) in list"
          :key="index"
          @click="handleBarItemClick(item, index, list)"
          :class="{ 'bar-item-active': index === activeIndex }"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "vue";

export default defineComponent({
  name: "index",
  props: {
    list: {
      type: Array,
      default: () => [
        {
          title: "暖通空调",
        },
        {
          title: "水泵",
        },
        {
          title: "电梯",
        },
        {
          title: "供配电",
        },
        {
          title: "风机",
        },
        {
          title: "灯光",
        },
        {
          title: "停车场",
        },
      ],
    },
    isMulti: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const headerBar = ref();

    const handleBarItemClick = (
      item: any,
      index: number,
      array: typeof props.list
    ) => {
      if (self.activeIndex === index) {
        self.activeIndex = -1;
      } else {
        self.activeIndex = index;
      }

      context.emit("clicks", item, index, array);
    };
    const self = reactive({
      activeIndex: -1,
    });

    return {
      headerBar,
      handleBarItemClick,
      ...toRefs(self),
    };
  },
});
</script>

<style scoped lang="scss">
.header-bar {
  position: fixed;
  @include Bottom(100);
  // width: 100%;
  // @include wHeight(85);
  font-family: Oppo, serif;
  @include FontSize(14);
  @include wHeight(80);
  // @include Width(1529);
  @include Left(500);
  z-index: 999;
  .bar-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    @include MarginTop(25);
    position: absolute;
    left: 0;
    .bar-item {
      opacity: 0.8;
      @include FontSize(16);
      color: #ffffff;

      background: url("@/assets/images/基础/menu2_single_bg_choosen@2x.png")
      no-repeat;
      background-size: 100% 100%;
      @include Width(120);
      @include wHeight(30);
      text-align: center;
      @include LineHeight(30);
      @include LetterSpacing(0.67);
      cursor: pointer;
      transition: all 0.3s;
      @include MarginRight(16);
      @include MarginBottom(16);
      position: relative;
      text-align: center;
      &:last-child {
        margin-right: 0;
      }

      &-active,
      &:hover {
        background: url("@/assets/images/基础/menu2_single_bg@2x.png")
        no-repeat;
        background-size: 100% 100%;
        @include FontSize(16);
        color: #ffffff;
        text-align: center;
        opacity: 1;
      }
    }
  }
}
</style>
