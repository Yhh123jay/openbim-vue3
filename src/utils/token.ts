// 封装本地浏览器存储数据与读取数据的方法
// 通过localStorage存储数据
export const SET_TOKEN = (token: string) =>{
  localStorage.setItem('token', token)
}
// 通过localStorage读取数据
export const GET_TOKEN = () =>{
  return localStorage.getItem('token')
}
// 通过localStorage删除数据
export const REMOVE_TOKEN = () =>{
  localStorage.removeItem('token')
}