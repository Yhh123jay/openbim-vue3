<template>
  <div class="right-container">
    <LeaseTitle>总体概览</LeaseTitle>
    <div class="valuePanel">
      <template v-for="(item, index) in leftArr" :key="index">
        <div class="valuePanel__item">
          <img
            class="valuePanel__item--img"
            :src="item.imgUrl"
          />
          <div class="valuePanel__item--label">{{ item.name }}：</div>
          <div class="valuePanel__item--num">{{ item.value }}</div>
          <div class="valuePanel__item--unit">{{ item.unit }}</div>
        </div>
      </template>
    </div>
    <LeaseTitle>环境监测</LeaseTitle>
    <!--    <V3Echarts :options="option1()" height="230"/>-->
    <div class="panel-center">
      <div class="panel-content">
        <div class="left-data">
          <div class="data-wrap">
            <div class="title">
              <img src="@/assets/img/河道长度.png" alt="" /> 温度
            </div>
            <div class="num">
              37
              <span class="dw">°C</span>
            </div>
          </div>
          <div class="data-wrap">
            <div class="title">
              <img src="@/assets/img/anhan.png" alt="" /> 湿度
            </div>
            <div class="num">
              500
              <span class="dw">m</span>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="right-data">
          <span>风速风向测量：<b> 44m/s</b> </span>
          <span>地震动：<b>0.52g</b> </span>
          <span>雨量：<b>600mm</b> </span>
        </div>
      </div>
    </div>
    <V3Echarts :options="option1()" :height="290" :top="40"/>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from "vue";
import V3Echarts from "@/components/V3Echarts/index.vue";
import { option1, option2 } from "./chartOpt";

const colors: string[] = ["rgb(159, 210, 255)", "rgb(252, 111, 55)"];
const self = reactive({
  tableList: [
    {
      workZone: "陆丰油田作业区",
      equipmentCode: "LF-13-DPP",
      isMonitoring: false,
      warningCondition: 1,
    },
    {
      workZone: "陆丰油田作业区",
      equipmentCode: "LF-13-2A WHP",
      isMonitoring: false,
      warningCondition: 0,
    },
    {
      workZone: "白云作业区",
      equipmentCode: "13-2 DPP",
      isMonitoring: false,
      warningCondition: 1,
    },
    {
      workZone: "陆丰油田作业区",
      equipmentCode: "LF-13-2A WHP",
      isMonitoring: false,
      warningCondition: 0,
    },
    {
      workZone: "惠州油田作业区",
      equipmentCode: "XJ-24-3 DPP",
      isMonitoring: false,
      warningCondition: 1,
    },
  ],
});
const leftArr = [
  {
    name: "累计长度",
    value: 5000,
    unit: "L",
    imgUrl: "/assets/images/watershed/icon_Release@2x(1).png",
  },
  {
    name: "斜拉索数量",
    value: 80,
    unit: "根",
    imgUrl: "/assets/images/watershed/icon_warning@2x(2).png",
  },
  {
    name: "总排放量",
    value: 800,
    unit: "L",
    imgUrl: "/assets/images/watershed/icon_Release@2x(2).png",
  },
  {
    name: "累计投入设备",
    value: 50,
    unit: "台",
    imgUrl: "/assets/images/watershed/icon_stations@2x(1).png",
  },
  {
    name: "总污水量",
    value: 8050,
    unit: "L",
    imgUrl: "/assets/images/watershed/icon_Release@2x(2).png",
  },
  {
    name: "累计投入人力",
    value: 150,
    unit: "人",
    imgUrl: "/assets/images/watershed/icon_Release@2x.png",
  },
];
onMounted(() => {});
onUnmounted(() => {});

</script>

<style scoped lang="scss">
.right-container {
  .panel-center {
    @include Padding(50,0,40,25);
    // @include MarginLeft(25);
    @include Width(400);
    @include wHeight(260);
    // margin-top: 10px;
    // height: 250px;
    .panel-content {
      @include Width(400);
      @include wHeight(200);
      display: flex;
      .left-data {
        @include Width(150);
        height: 100%;
        .data-wrap {
          width: 100%;
          @include wHeight(90);
          .title {
            @include FontSize(20);
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            text-align: left;
            color: #ffffff;
            @include LineHeight(20);
            @include wHeight(20);
            img {
              @include Width(22);
              @include wHeight(19);
              @include MarginRight(10);
            }
          }
          .num {
            @include wHeight(40);
            @include FontSize(22);
            @include LineHeight(50);
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            text-align: center;
            color: #72eaee;
            .dw {
              @include FontSize(14);
            }
          }
        }
      }
      .line {
        width: 1px;
        @include wHeight(180);
        background: linear-gradient(
          180deg,
          rgba(114, 234, 238, 0),
          #72eaee 47%,
          rgba(114, 234, 238, 0)
        );
      }
      .right-data {
        @include Width(220);
        @include wHeight(180);
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        span {
          display: block;
          color: #ffffff;
          @include FontSize(18);
          width: 100%;
          text-align: center;
          b {
            @include FontSize(18);
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            text-align: left;
            color: #72eaee;
            @include LineHeight(25);
            span {
              display: inline;
              color: #72eaee;
            }
          }
        }
      }
    }
  }
  .valuePanel {
    @include Width(449);
    @include wHeight(150);
     @include MarginTop(30);
    @include MarginBottom(60);
    display: flex;
    flex-wrap: wrap;
    &__item {
      @include Width(223);
      height: 40%;
      display: flex;
      align-items: center;
      &--img {
        @include Width(18);
        @include wHeight(18);
      }
      &--label {
        @include FontSize(16);
        color: #fff;
        @include MarginLeft(3);
      }
      &--num {
        @include FontSize(22);
        color: #86cdff;
      }
      &--unit {
        @include FontSize(12);
        color: #ffffff;
        @include MarginLeft(3);
      }
    }
  }
}
</style>
