//管理文件组件的状态
import {defineStore} from 'pinia'

let fileStore = defineStore('file',{

  state:()=> ({
    //表格中显示的文件列表
    selectedColumnList : Array,
    // 批量模式下：被选中的文件列表
    selectedFiles: [],
    currentPath : String
  }),


  actions: {

  }
})

export default fileStore