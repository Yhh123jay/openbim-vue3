//创建小仓库
import {defineStore} from 'pinia'
// 引入数据类型
import type { LoginForm ,LoginResult} from '@/api/user/type'
import type {UserState} from '@/store/type'
//引入登录接口
import { login, getUserInfo, logout } from '@/api/user'
//引入持久化存储
import {SET_TOKEN,GET_TOKEN,REMOVE_TOKEN} from '@/utils/token'

//创建仓库
let useUserStore = defineStore('User',{
  //数据
  state: ():UserState => ({
    token: GET_TOKEN(),//用户的唯一标识
    userInfo: {}
  }),

  //计算属性
  getters: {},

  //异步/逻辑的地方
  actions: {
    async userLogin(data: LoginForm) {
      //登录请求
      const result: LoginResult = await login(data)
      //登录请求:成功200->token
      //登录请求:失败201->登录失败错误的信息
      if (result.code == 200) {
        //pinia仓库存储一下token
        //由于pinia|vuex存储数据其实利用js对象
        this.token = result.data.token as string
        //本地存储持久化存储一份
        SET_TOKEN(result.data.token as string)
        //能保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async getUserInfo() {
      //获取用户信息
      //这里的this指向的是当前的仓库
      const result:LoginResult = await getUserInfo()
      //获取用户信息成功
      if (result.code == 200) {
        //存储用户信息
        this.userInfo = result.data
        return 'ok'
      } else {
        return Promise.reject('获取用户信息失败,token失效')
      }
    },
    //退出登录
    async logout() {
      //通知服务器本地用户的token已经失效
      const result:LoginResult = await logout()
      if (result.code == 200) {
        //清空token
        this.token = ''
        //清空用户信息
        this.userInfo = {}
        //清空本地存储
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject('退出登录失败')
      }
    }
  }
})

export default useUserStore
