import {defineStore} from 'pinia'
//小仓库:用于layout组件相关配置的仓库

let useLayoutStore = defineStore('Layout',{
  state:()=> {
      return{
          //侧边栏是否折叠
          isFold:false,
        //   是否刷新页面
          refresh:false,
      }
  },
})
export default useLayoutStore