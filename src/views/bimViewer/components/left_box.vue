<!-- left_box -->
<template>
  <transition
    appear
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__faster  animate__fadeInLeft "
    leave-active-class="animate__animated animate__faster animate__fadeOutLeft "
  >
    <div class="left_box">
        <div class="block"></div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>


</script>
<style lang="scss" scoped>
.left_box {
  position: absolute;
  @include Width(469);
  @include wHeight(1080);
  @include Top(0);
  @include Left(0);
  box-sizing: border-box;
 // background-color: rgba($color: #000, $alpha: 0.45);

  background: url("@/assets/images/watershed/left_bg.png") no-repeat center/cover;
  @include Padding(120, 10, 30, 10);
  z-index: 3;
    
  .block {
        cursor: pointer;
        position: fixed;
        @include Width(330);
        @include wHeight(50);
        // background: red;
        z-index: 99999999;
        @include MarginTop(-105);
        @include MarginLeft(-10);
    }
  .content {
    box-sizing: border-box;
    position: relative;

    overflow: hidden;
  }
}
</style>
