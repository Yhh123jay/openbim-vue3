<template>
  <div>
    <LeaseTitle>{{ hollowCircle.theme }}</LeaseTitle>
    <div class="hollow">
      <V3Echarts
        id="main"
        :options="options"
        height="250"
        container="equi_status"
      />
      <div class="right">
        <div class="swith" v-if="hollowCircle.boolean">
          <span class="hollowTitle">{{ hollowCircle.booleanName }}</span>
          <el-switch
            v-model="value1"
            active-color="#2AE8D2"
            inactive-color="#32375F"
          >
          </el-switch>
        </div>
        <div
          class="progress"
          v-for="(item, index) in hollowCircle.data"
          :key="'progress' + index"
        >
          <div class="title">
            {{ item.name }}: {{ item.value }}{{ item.unit }}
          </div>
          <div class="slider">
            <div class="slideClider" :style="'width:' + item.value + '%'">
              <!-- {{ item.value }}% -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  hollowCircle: {
    type: Object,
  },
});
const that = props;
let value1 = ref(true);
let options = {
  title: {
    text: that.hollowCircle.text,
    top: "31%",
    left: "center",
    textStyle: {
      fontSize: "27",
      color: "#2AE8D2",
    },
    itemGap: 3,
  },
  grid: {
    top: -140,
  },
  series: [
    {
      type: "pie",
      radius: ["55%", "70%"],
      center: ["50%", "39%"],
      avoidLabelOverlap: false,
      startAngle: 270 - Number(that.hollowCircle.numerical) * 1.8,
      label: {
        show: false,
        position: "center",
      },
      labelLine: {
        show: false,
      },
      data: [
        {
          value: 100 - that.hollowCircle.numerical,
          itemStyle: {
            color: "transparent",
          },
        },
        {
          value: that.hollowCircle.numerical,
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#2B5678", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#2AE8D2", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
    },
  ],
};
</script>

<style lang="scss" scoped>
.hollow {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  // @include PaddingLeft(20);
  #main {
    @include MarginLeft(10);
    @include Width(170);
    @include wHeight(180);
  }
  .right {
    @include Margin(15, 0, 0, 0);
    .swith,
    .progress {
      display: flex;
      justify-content: flex-start;
      .hollowTitle {
        color: #2ae8d2;
        // margin-right: 5px;
        @include MarginRight(10);
      }
    }
    .progress {
      color: #2ae8d2;
      width: 100%;
      flex-direction: column;
      @include LineHeight(40);
      @include MarginBottom(10);
      .title {
        display: flex;
        justify-content: flex-start;
        @include FontSize(16);
      }
      .slider {
        background: linear-gradient(to right, #bec6cd2e 50%, #48474708 50%);
        background-size: 5px 100%;
        @include wHeight(10);
        width: 100%;
        .slideClider {
          @include wHeight(10);
          display: flex;
          justify-content: flex-end;
          text-align: right;
          @include FontSize(12);
          @include LineHeight(20);
          @include PaddingRight(5);
          background: linear-gradient(to right, #2ae8d2 50%, #48474708 50%);
          background-size: 5px 100%;
        }
      }
    }
  }
}

/* .progress div{
  margin: 5px 0 0 0;
} */
//  <!-- 这部分是最开始学习模仿的需求里面的css  使用率很低 -->
// .progress .characteristic {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   color: #fff;
//   font-size: 12px;
//   margin-top: 15px;
//   padding-left: 20px;
//   /* padding:0 23px; */
// }
// .characteristic span {
//   display: inline-block;
// }
// .borders,
// .characteristicOne {
//   width: 43px;
//   height: 19px;
// }

// .borders {
//   border: 1px solid #6464f5;
//   background: rgba(0, 0, 0, 0);
// }

// .characteristicOne {
//   /* width: ; */
//   line-height: 19px;
//   font-size: 11px;
//   background: #08b4f2;
// }
</style>
