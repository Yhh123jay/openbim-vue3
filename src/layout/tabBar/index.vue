<script setup lang="ts">
import { Expand, Fold, ArrowRight, ArrowDown,Refresh, FullScreen, Setting } from '@element-plus/icons-vue'
import Message from './message.vue'
import {storeToRefs} from 'pinia'
import useLayoutStore from '@/store/modules/layout.ts'
import useUserStore from '@/store/modules/user.ts'
import {useRoute,useRouter} from 'vue-router'

let layoutStore = useLayoutStore()
let userStore = useUserStore()
let {isFold} = storeToRefs(layoutStore)
let $route:any = useRoute()
let $router = useRouter()

// 刷新页面按钮被点击
const refresh = () => {
  layoutStore.refresh = !layoutStore.refresh
}
// 全屏方法实现
const fullScreen = () => {
  let full = document.fullscreenElement;
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
// 退出登录
const logout = async () => {
  console.log('退出登录')
  await userStore.logout()
  // 跳转到登录页面
  $router.replace('/login')
}

</script>

 <template>
  <div class="tabBar">
    <div class="tarBar_left">
      <!--打开折叠按钮-->
      <el-icon style="margin-right: 10px" @click="isFold = !isFold">
        <component :is="isFold ? Fold:Expand">
        </component>
      </el-icon>
      <!--面包屑样式-->
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
          <span>{{item.meta.title}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tarBar_right">
      <el-button :icon="Refresh" circle @click="refresh"/>
      <el-button :icon="FullScreen" circle @click="fullScreen"/>
      <el-button :icon="Setting" circle/>
      <Message id="message" style="margin:12px"/>
<!--      <img :src="userStore.userInfo.avatar" alt="avatar" style="width: 30px;height: 30px;margin:12px;border-radius: 50%">-->
      <svg-icon name="xianxingdiqiu" style="width: 30px;height: 30px;margin:12px;border-radius: 50%"></svg-icon>
      <el-dropdown>
      <span class="el-dropdown-link">
       {{userStore.userInfo.username}}
        <el-icon class="el-icon--right">
          <ArrowDown />
        </el-icon>
      </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .tabBar{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .tarBar_left{
      display: flex;
      flex-direction: row;
      // 居中
      align-items: center;
      margin: 20px;
    }
    .tarBar_right{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin: 20px;
    }

  }
</style>