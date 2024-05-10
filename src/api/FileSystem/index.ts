import request from '@/utils/request.ts'

enum FileSystemApi {
    //上传文件
    upload = '/file/upload',
    //下载文件
    download = '/file/download/',
    //创建目录
    mkdir = '/file/mkdir',
    //目录信息
    getPathInfo = '/file/getPathInfo',
    //获取目录下文件列表
    getFileList = '/file/getFileList',
    //删除文件或文件夹
    rmdir = '/file/rmdir',
    //读取文件内容
    readFile = '/file/readFile',
    //文件或文件夹重命名
    renameFile = '/file/renameFile',
    //上传本地文件
    uploadFileFromLocal = '/file/uploadFileFromLocal',
    //下载文件到本地
    downloadFileFromLocal = '/file/downloadFileFromLocal',
    //复制文件
    copyFile = '/file/copyFile',
}

/**
 * 上传文件:post
 * 后端接口：upload(@RequestParam String uploadPath, MultipartFile file)
* 参数说明：{"uploadPath": ${hdfs目录路径}, "file": ${MultipartFile文件}}
* form-data参数示例：{"uploadPath": "/data", "file": ${MultipartFile文件}}
*/
export function upload(uploadPath: string, file: File): Promise<any>{
    const formData = new FormData();
    formData.append('uploadPath', uploadPath);
    formData.append('file', file);

    return request({
        url: FileSystemApi.upload,
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

/**
 * 下载文件:get
 * 后端接口：download(@RequestParam String path, @RequestParam String fileName, HttpServletResponse response)
 * 参数说明：{"path": ${hdfs目录路径}, "fileName": ${MultipartFile文件}}
 * form-data参数示例：{"path": "/data", "fileName": "用户信息-导入模板.xlsx"}
 */
export function download(path: string, fileName: string): Promise<any>{
    return request({
        url: FileSystemApi.download + path + '/' + fileName,
        method: 'get',
        responseType: 'blob'
    })
}

/**
 * 创建目录:post
 * 后端接口Result<Boolean> mkdir(@RequestParam String folderPath)
 * 参数说明：{"folderPath": ${目录路径}}
 * form-data参数示例：{"folderPath": "/data"}
 */
export function mkdir(folderPath: string): Promise<any>{
    console.log(folderPath)
    return request({
        url: FileSystemApi.mkdir,
        method: 'post',
        params: {folderPath}
    })
}

/**
 * 目录信息:get
 * 后端接口：getPathInfo(@RequestParam String path)
 * 参数说明：{"path": ${目录路径}}
 * 参数示例：{"path": "/"}
 */
export function getPathInfo(path: string): Promise<any>{
    return request({
        url: FileSystemApi.getPathInfo,
        method: 'get',
        params: {path}
    })
}

/**
 * 获取目录下文件列表:get
 * Result<List<Map<String, String>>> getFileList(@RequestParam String path)
 *
 */
export function getFileList(path: string): Promise<any>{
    return request({
        url: FileSystemApi.getFileList,
        method: 'get',
        params: {path}
    })
}

/**
 * 删除文件或文件夹:post
 * rmdir(@RequestParam String path, @RequestParam(required = false) String fileName)
 * 参数说明：{"path": ${目录路径}, "fileName": ${文件名}}
 */
export function rmdir(path: string, fileName?: string): Promise<any>{
    return request({
        url: FileSystemApi.rmdir,
        method: 'post',
        params: {path, fileName}
    })
}

/**
 * 读取文件内容:get
 * readFile(@RequestParam String filePath)
 * 参数说明：{"filePath": ${文件路径}}
 */
export function readFile(filePath: string): Promise<any>{
    return request({
        url: FileSystemApi.readFile,
        method: 'get',
        params: {filePath}
    })
}

/**
 * 文件或文件夹重命名:post
 * renameFile(@RequestParam String oldName, @RequestParam String newName)
 * 参数说明：{"oldName": ${旧文件名}, "newName": ${新文件名}}
 */
export function renameFile(oldName: string, newName: string): Promise<any>{
    return request({
        url: FileSystemApi.renameFile,
        method: 'post',
        params: {oldName, newName}
    })
}

/**
 * 上传本地文件:post
 * uploadFileFromLocal(@RequestParam String path, @RequestParam String uploadPath)
 * 参数说明：{"path": ${本地文件路径}, "uploadPath": ${hdfs目录路径}}
 */
export function uploadFileFromLocal(path: string, uploadPath: string): Promise<any>{
    return request({
        url: FileSystemApi.uploadFileFromLocal,
        method: 'post',
        params: {path, uploadPath}
    })
}

/**
 * 下载文件到本地:post
 * downloadFileFromLocal(@RequestParam String path, @RequestParam String downloadPath)
 * 参数说明：{"path": ${hdfs文件路径}, "downloadPath": ${本地目录路径}}
 */
export function downloadFileFromLocal(path: string, downloadPath: string): Promise<any>{
    return request({
        url: FileSystemApi.downloadFileFromLocal,
        method: 'post',
        params: {path, downloadPath}
    })
}

/**
 * 复制文件:post
 * copyFile(String sourcePath, String targetPath)
 * 参数说明：{"sourcePath": ${源文件路径}, "targetPath": ${目标文件路径}}
 */
export function copyFile(sourcePath: string, targetPath: string): Promise<any>{
    return request({
        url: FileSystemApi.copyFile,
        method: 'post',
        params: {sourcePath, targetPath}
    })
}



