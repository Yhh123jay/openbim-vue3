//统一管理项目用户相关的接口
import request from '@/utils/request'

enum sensorApi {
    //查询所有传感器
    findAll = '/sensor/all',
    //查询应变传感器数据
    getSensorData = '/sensor/strain/',
}

export function getSensorData( sensing: String):Promise<any> {
    return request<any>({
        url: sensorApi.getSensorData + sensing,
        method: 'get'
    })
}