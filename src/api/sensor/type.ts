interface strainDataType {
  id: number;
  timestamp: string;
  sensing: string;
  res_value: number;
}
export interface SensorResult {
  code: number;
  message: string;
  //返回一个strainDataType数组类型的数据
  data: strainDataType[];
}