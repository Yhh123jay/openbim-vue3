<!-- right_box -->
<template>
  <transition
    appear
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__faster  animate__fadeInRight"
    leave-active-class="animate__animated animate__faster animate__fadeOutRight"
  >
    <div  class="right_box">
      <div class="right">
        <div class="content">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>


</script>

<style lang="scss" scoped>
.right_box {
  position: absolute;
  @include Width(469);
  @include wHeight(1080);
  @include Top(0);
  @include Right(0);
 // background-color: rgba($color: #000, $alpha: 0.45);
  background: url("@/assets/images/watershed/right_bg.png") no-repeat center/cover;
  z-index: 3;
  //@include Padding(56, 26, 40, 26);
  box-sizing: border-box;

  .close-bg {
    background: url("@/assets/images/基础/关闭_default@2x.png") no-repeat;
    background-size: 100% 100%;
    @include Width(50);
    @include wHeight(50);
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(20%, 50%);
    cursor: pointer;
  }

  .right {
    @include Padding(120, 10, 30, 10);
    position: relative;

    .title {
      position: absolute;
      @include FontSize(24);
      @include PaddingLeft(85);
      @include LetterSpacing(2);
      @include Top(55);
      @include Left(30);
      font-family: HYb3gj;
    }

    .content {
      // border: 1px solid rgba(255, 255, 255, 0.527);
      box-sizing: border-box;
      position: relative;

      overflow: hidden;
      //@include Padding(16.5, 28.6, 0, 14.9);
    }
  }
}
</style>
