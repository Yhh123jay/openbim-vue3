<!-- Tools -->
<template>
  <div class="tools">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(["width", "height"]);
</script>
<style lang="scss" scoped>
.tools {
  position: absolute;
  @include boxWidth(v-bind("props.width"));
  @include boxhHeight(v-bind("props.height"));
  @include MarginBottom(10);
  @include BorderRadius(8);
  @include FontSize(14);
  @include hLineHeight(18);
  @include LetterSpacing(0.5);
  @include Right(380);
  @include Bottom(20);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.37);
}
</style>
