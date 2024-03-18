// 定义用户api的数据类型
//登陆用户类型定义
export interface LoginForm {
  username: string;
  password: string;
}

interface dataType {
  token?: string;
}
// 定义登录接口返回数据的类型
//登陆用户返回数据类型定义
export interface LoginResult {
  code: number;
  message: string;
  data: dataType;
}