//创建小仓库
import {defineStore} from 'pinia'

//本仓库用于bim组件之间的通信
export const useBimStore = defineStore('bim',{
  //数据
  state: () => ({
    logBtnClickEvent : false
  }),

  //异步/逻辑的地方
  actions: {
    //设置log按钮的点击事件
    logBtnClick(){
      //将点击事件存储到仓库中

    },

  }
})