<script setup lang="ts">
  import {GanttChart, addDays} from '4d-gantt-chart'
  import {minmax,dayDiff} from '4d-gantt-chart/src/utils/helper.ts'
  import {Tasks} from '4d-gantt-chart/src/classes/tasks.ts'
  import {scheduleData} from './data.ts'
  import { useBimStore } from '@/store/modules/bimScene.ts'
  import { onMounted } from 'vue'

  let data1 = scheduleData
  let gantt:GanttChart
  const bimStore = useBimStore()
  let timer:any = undefined

  //监听store中的数据变化
  onMounted(() => {
    let container = document.getElementById("ganttChart");
    //@ts-ignore
    container.innerHTML = "";
    let options:any = {
      container: container,
      showBaseline: true,
      dataDate: new Date(2022, 0, 15),
      gridScale: 4,
      gridColor: "black",
      data: data1,
      titleOptions: "Music",
      rowHeight: 20,//表格和时间线行高
      timeLineColumnWidth: 20,//时间线列宽
      timeLineBackgroundColor: "#fbecde",
      timeLineHeight: 60,//表格上面的高度（id，name一行）
      tableWidth: 300,
      table: {
        width: 600,
      },
      barColor: "lightgreen",
      barColorHover: "red",
      colors: ["#a55ca5", "#67b6c7", "#bccd7a", "#eb9743"],

    };
    gantt = new GanttChart(options);
    gantt.gridDiv.style.position = 'relative';
    gantt.gridDiv.appendChild(gantt.svg);
    //@ts-ignore
    gantt.svg.style.position = 'absolute'
    gantt.draw();

    gantt.on("taskClicked", async (task:any) => {
      //计算出当前点击的任务的开始时间和结束时间
      //let startTime = new Date(task.start);
      let endTime = new Date(task.end);
      //更新gantt图
      gantt.dataDate = endTime;
      await updateGantt1()
      //将endTime存储在pinia仓库中
      bimStore.setCurrentTime(endTime)
    });
  })
  function add(){
    console.log('add')
    gantt.dataDate = addDays(gantt.dataDate, 20);
    //@ts-ignore
    //gantt.options.dataDate = addDays(gantt.options.dataDate, counter);
    bimStore.setCurrentTime(gantt.dataDate)
    gantt.timeLine.yearEl.innerHTML =  ""
    gantt.timeLine.grid.innerHTML = ""
    updateGantt()
  }
  function play() {
    if (timer) {
      clearInterval(timer);
      timer = undefined;
      return;
    }
    let counter = 0;
    timer = setInterval(() => {
      if (timer && ++counter >= 10000) {
        clearInterval(timer);
      }
      gantt.dataDate = addDays(gantt.dataDate, 20);
      //@ts-ignore
      gantt.options.dataDate = addDays(gantt.options.dataDate, counter);
      bimStore.setCurrentTime(gantt.dataDate)

      // 使用setTimeout将gantt.update放入事件队列中
      requestAnimationFrame(async () =>{
        // gantt.timeLine.yearEl.innerHTML =  ""
        // gantt.timeLine.grid.innerHTML = ""
        await updateGantt1()
      });
    }, 2000);
  }

  async function updateGantt() {
    const current_scroll = gantt.tablediv.scrollTop;
    gantt.svg.innerHTML = "";
    const contWidth =
      gantt.container.clientWidth -
      gantt.tablediv.clientWidth -
      gantt.splitter.clientWidth -
      50;
    gantt.chartDiv.style.overflow = "auto";
    gantt.chartDiv.style.width = `${contWidth}px`;
    gantt.chartDiv.style.margin = "0px";
    gantt.visibleTasks = [];
    for (let task of gantt.options.data) {
      if (task.visible !== false) {
        gantt.visibleTasks.push(task);
      }
    }
    //@ts-ignore
    gantt.svg.setAttribute("height", (gantt.options.rowHeight * gantt.visibleTasks.length).toString());
    let maxmin = minmax(gantt.visibleTasks);
    gantt.maxValue = maxmin[1].getTime();
    gantt.minValue = maxmin[0].getTime();
    gantt.minDate = addDays(maxmin[0], -7);
    gantt.maxDate = addDays(maxmin[1], 31);
    gantt.tasks = [];
    //@ts-ignore
    gantt.dateLine = null;
    //@ts-ignore
    gantt.svg.setAttribute("width", ((dayDiff(gantt.minDate, gantt.maxDate) + 1) * gantt.options.timeLineColumnWidth).toString());
    // this.drawGridLines();
    gantt.drawDateLine();
    gantt.drawTimeLine();
    gantt.tasksData = new Tasks(gantt.options.data, gantt);
    scrollToCurrentTimeLine();
    gantt.tablediv.scrollTop = current_scroll;
    gantt.chartDiv.scrollTop = current_scroll;
  }
  async function updateGantt1() {
    console.log('updateGantt1')
    gantt.svg.innerHTML = "";
    //@ts-ignore
    gantt.dateLine = null;
    gantt.drawDateLine();
    scrollToCurrentTimeLine()
  }

  function scrollToCurrentTimeLine() {
    const currentDate = gantt.dataDate; // 当前的日期
    const startDate = addDays(gantt.minDate,7); // 时间线的开始日期
    const timeLineColumnWidth = gantt.options.timeLineColumnWidth; // 每个时间单元的宽度
    console.log('currentDate',currentDate)
    console.log('startDate',startDate)
    const daysFromStart = dayDiff(startDate, currentDate);
    //@ts-ignore
    const scrollPosition = daysFromStart * timeLineColumnWidth;
    gantt.chartDiv.scrollLeft = scrollPosition;
  }
</script>

<template>
  <div class="GanttContainer">
    <el-button @click="add">+</el-button>
    <button id="btnPlay" @click="play">></button>
    <div id="ganttChart"></div>
  </div>
</template>

<style scoped lang="scss">
.GanttContainer {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  background-color: #8fb2c9;
}
#ganttChart {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  background-color: #fbecde;
  #gantt_canvas__chart__ {
    #gantt__canvas__chart__grid{
      background-color: #8fb2c9;
      .gantt-time-period-cell-container{
        .gantt-time-period{
          background-color: #8fb2c9;
          .gantt-time-period-cell{
            background-color: #8fb2c9;
          }
        }
      }
    }
  }
}

</style>