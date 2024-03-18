//统一管理项目用户相关的接口
import request from '@/utils/request'
//导入接口类型
import {LoginResult,LoginForm} from '@/api/user/type.ts'

//统一管理项目用户相关的接口
enum UserApi {
    Login = '/user/login',
    UserInfo = '/user/userInfo',
    logout = '/user/logout'
}
//暴露请求函数
//登录
export function login(data: LoginForm): Promise<LoginResult>{
    return request({
        url: UserApi.Login,
        method: 'post',
        data
    })
}
//获取用户信息,通过请求头携带token来获取用户信息
export function getUserInfo():Promise<any> {
    return request<any>({
        url: UserApi.UserInfo,
        method: 'get'
    })
}
//退出登录
export function logout():Promise<any> {
    return request<any>({
        url: UserApi.logout,
        method: 'get'
    })
}