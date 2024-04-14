<template>
  <div class="alease_title_left">
    <div class="title-text">
      <span><slot>设备状态</slot></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  left: {
    type: Number,
    default: 20,
  },
  imgSrc: {
    type: String,
    default: "icon_data@2x.png",
  },
});
</script>
<style lang="scss" scoped>
.alease_title_left {
  position: relative;
  font-family: Oppo;
  font-weight: 500;
  color: #ffffff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 100;
  @include Width(407);
  @include wHeight(27);
  @include FontSize(16);
  color: #ffffff;
  @include LetterSpacing(1);
  @include MarginBottom(5);
  overflow: hidden;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  background: url("@/assets/images/基础/tiltle_bg.png") no-repeat;
  background-size: 100% 100%;
  //@include PaddingLeft(32.6);
  //@include MarginLeft(14.9);
  box-sizing: border-box;

  .title-text {
    flex: 1;
    //@include MarginLeft(9);
    position: relative;
    @include Top(1);
    width: fit-content;
    @include MarginTop(-10);
    span {
      color: #ffffff;
      @include FontSize(18);

      font-family: OPPOSans-M;
      // @include wHeight(21);
      // @include LineHeight(21);
      // font-weight: 600;
    }
  }
}
</style>
