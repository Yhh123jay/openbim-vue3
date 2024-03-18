<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import {User,Lock} from '@element-plus/icons-vue'
  import useUserStore from '@/store/modules/user.ts'
  import {useRouter} from 'vue-router'
  import { ElNotification, FormRules } from 'element-plus'
  import {getTime} from '@/utils/time.ts'

  let $router = useRouter()
  //let $route = useRoute()

  let userStore = useUserStore()

  let loginForm = reactive({
    username: '',
    password: ''
  })
  //获取表单实例
  let loginFormRef = ref()

  const loginRules = reactive<FormRules>({
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
  });

  //login方法
  const login = async() => {
    // 点击登录按钮之后发生的事件
    try {
      // 校验表单
      await loginFormRef.value.validate()
      // 调用登录接口
      await userStore.userLogin(loginForm)
      // 登录成功之后跳转到首页
      $router.push({ path: '/' })
      // 登录成功之后提示
      ElNotification({
        title: `登录成功,${getTime()}好`,
        message: '欢迎回来',
        type: 'success'
      })

    } catch (error) {
      // 登录失败之后提示
      ElNotification({
        title: '登录失败',
        message: (error as Error).message,
        type: 'error'
      })
    }
  }

</script>

<template>
  <div class="login_container">
    <div class="login_box">
      <div class="login_left">
        <img class="login_left_img" src="@/assets/images/login_left.png" alt="login">
      </div>
      <div class="login_form">
        <div class="login_logo">
          <h2 class="logo_text">登录桥梁管理系统</h2>
        </div>
        <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" label-width="0px">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" :prefix-icon="User"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" :prefix-icon="Lock" show-password></el-input>
          </el-form-item>
        </el-form>
        <div class="login_btn">
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </div>
    </div>
  </div>
  </div>
</template>

<style scoped lang="scss">
.login_container{
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/login_bg.svg") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_box{
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 95%;
    height: 95%;
    padding: 0 50px;
    background-color: rgb(255 255 255 / 80%);
    border-radius: 10px;
    .login_left{
      width: 800px;
      .login_left_img{
        width: 80%;
      }
    }
    .login_form{
      width: 500px;
      padding: 50px 40px 45px;
      background-color: var(--el-bg-color);
      border-radius: 10px;
      box-shadow: rgb(0 0 0 / 10%) 0 2px 10px 2px;
      .login_logo{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 45px;
        .logo_text {
          padding: 0 0 0 25px;
          margin: 0;
          font-size: 36px;
          font-weight: bold;
          color: #34495e;
          white-space: nowrap;
        }
      }
      .login_btn{
        display: flex;
        justify-content: center;
        margin-top: 30px;
      }
    }
  }
}
</style>