//axios二次封装
import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from '@/store/modules/user.ts'

//创建axios实例
let request = axios.create({
  //baseURL: '',
  baseURL:'http://localhost:8080',
  timeout: 5000
})
//请求拦截器
request.interceptors.request.use(config => {
  // config配置对象，headers属性的请求头，可以给服务器端携带公共的参数，比如token
  let store = useUserStore()
  let token:string | null = store.token
  if (token) {
    config.headers.token = token;
  }
  return config;
});
//响应拦截器
request.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  //处理网络错误
  let msg = '';
  let status = error.response.status;
  switch (status) {
    case 401:
      msg = "token过期";
      break;
    case 403:
      msg = '无权访问';
      break;
    case 404:
      msg = "请求地址错误";
      break;
    case 500:
      msg = "服务器出现问题";
      break;
    default:
      msg = "无网络";
  }
  //后端会把状态码跟信息都返回，前端只要看状态码是否为200就行
  ElMessage({
    type: 'error',
    message: msg
  })
  return Promise.reject(error);
});
export default request;