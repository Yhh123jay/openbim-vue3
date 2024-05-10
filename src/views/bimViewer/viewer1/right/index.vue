<template>
  <div class="right-container">
    <LeaseTitle>传感器</LeaseTitle>
      <V3Echarts :options="option1()" :height="220" :top="30" class="paishui"/>
    <LeaseTitle>源头排查</LeaseTitle>
    <!--    <V3Echarts :options="option1()" height="230"/>-->
      <div class="details">
        <div class="table-box">
          <div class="table-head">
            <div class="head-item">类别名称</div>
            <div class="head-item">更新日期</div>
            <!--          <div class="head-item">起飞</div>-->
            <div class="head-item">数量</div>
            <div class="head-item">处理状况</div>
          </div>
          <div class="table-body">
            <div class="table-body-warp">
              <div class="row" v-for="(item,index) in self.tableList" :key="index">
                <div class="col">{{ item.name }}</div>
                <div class="col">{{ item.time }}</div>
                <div class="col">{{ item.index }}</div>
                <div class="col">{{ item.id > 2 ? '已检测' : '未监测' }}</div>
                <!-- <div class="col">

                  <div class="radius" :style="'background-color:'+ colors[item.warningCondition] "></div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    
    <LeaseTitle>传感数据-应变</LeaseTitle>
      <V3Echarts :options="option3()" :height="280" :top="30"/>
  </div>
</template>

<script lang="ts" setup>
import {defineComponent, onMounted, onUnmounted, reactive, toRefs} from "vue";
import LeaseTitle from '@/components/LeaseTitle/index.vue'
import V3Echarts from '@/components/V3Echarts/index.vue'
import { option1, option2, option3 } from './chartOpt'
// import {startMarquee} from "@/utils";
    const colors: string[] = ['rgb(159, 210, 255)', 'rgb(252, 111, 55)']
    //表格数据
    const self = reactive({
      tableList:  [
        {
          id:1,
          name: "隔油池",
          index: 858,
          time: "12/03",
        },
        {
          id:2,
          name: "化粪池",
          index: 1223,
          time: "12-03",
        },
        {
          id:3,
          name: "垃圾池",
          index: 982,
          time: "12-03",
        },
        {
          id:4,
          name: "立管",
          index: 200,
          time: "12-03",
        },
        {
          id:5,
          name: "重点面源",
          index: 64,
          time: "12-03",
        },
        {
          id:6,
          name: "工业废水",
          index: 455,
          time: "12-03",
        }
        ,
        {
          id:3,
          name: "垃圾池",
          index: 982,
          time: "12-03",
        },
        {
          id:4,
          name: "立管",
          index: 200,
          time: "12-03",
        },
        {
          id:5,
          name: "重点面源",
          index: 64,
          time: "12-03",
        },
        {
          id:6,
          name: "工业废水",
          index: 455,
          time: "12-03",
        }
      ]
    })
    onMounted(() => {
      // startMarquee('table-body-warp', '.row')
    })
    // onUnmounted(()=>{
    //   __g.polygon3d.clear();
    //   __g.marker.clear()
    // })
</script>

<style scoped lang="scss">
.right-container {
.paishui{
  @include MarginBottom(30)
}
  .details {
     @include MarginTop(20);
    @include hHeight(260);
    display: flex;
    flex-direction: column;
    @include PaddingBottom(40);
    //@include MarginBottom(20);

    .table-box {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      @include FontSize(14);
      @include MarginTop(15);

      .table-head {
        height: 2em;
        display: flex;
        background: #ffffff00;
        line-height: 2em;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        .head-item {
          flex: 1;
          text-align: center;
        }

        color: #B6D9FF;
      }

      .table-body {
        flex: 1;
        overflow-y: hidden;
        //@include wHeight(252);
        @include FontSize(12);

        .row {
          display: flex;
          width: 100%;
          @include Padding(8, 0, 8, 0);
          box-sizing: border-box;

          .col {
            flex: 1;
            text-align: center;

          }

          .radius {
            border-radius: 50%;
            @include Width(10);
            @include wHeight(10);
            margin: 0 auto;
          }

          &:nth-child(even) {
            background: #00000050;
          }
        }
      }
    }
  }
}
</style>