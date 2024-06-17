//创建小仓库
import {defineStore} from 'pinia'
import { ScheduleData } from '@/bim-components/4DTool/IfcTask.ts'

/**
 * 本仓库用于bim组件之间的通信
 *
 */

export const useBimStore = defineStore('bim',{
  //数据
  state: () => ({
    logBtnClickEvent : false,
    currentTime :new Date(),//进度模拟当前时间
    ScheduleData: {} as ScheduleData,
  }),
  //计算属性
  getters: {
  },
  //异步/逻辑的地方
  actions: {
    //设置log按钮的点击事件
    logBtnClick(){
      //将点击事件存储到仓库中

    },
    //设置当前时间
    setCurrentTime(time:Date){
      //将当前时间存储到仓库中
      this.currentTime = time
    },
    //设置进度数据
    setScheduleData(data:ScheduleData){
      //将进度数据存储到仓库中
      this.ScheduleData = data
    }

  }
})