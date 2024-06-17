<template>
  <div class="file-list-container">
    <div class="header-container">
      <!--展示当前路径-->
      <el-input
        class="folder-path"
        v-model="currentPath"
      />
      <el-button @click="toDirectionPath" size="default"> Go!</el-button>
      <!-- 文件上传组件 -->
      <el-upload
        class="upload-demo"
        :show-file-list="false"
        :before-upload="beforeUpload"
        style="margin-left: 10px;margin-right: 20px"
      >
        <el-button size="default" type="primary">
          <el-icon><Upload /></el-icon>
          点击上传
        </el-button>
      </el-upload>
      <!-- 创建目录 -->
      <el-input
        v-model="newFolderName"
        placeholder="请输入新目录名称"
        style="width: 150px;"
      />
      <el-button @click="createDirectory" type="primary" size="default">创建目录</el-button>
    </div>
    <!-- 文件列表 -->
    <el-table
      class="table-class"
      :data="fileList"
      style="width: 100%"
      stripe
      highlight-current-row
      ref="fileTable"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      ></el-table-column>
      <el-table-column
        width="50"
        align="center"
      >
        <template #default="scope">
          <el-icon size="20">
            <component :is="scope.row.type === '文件' ? 'Document' : 'Folder'"></component>
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        prop="name"
        label="名称"
      >
        <template #default="scope">
          <span @click="openFolder(scope.row)">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        prop="type"
        label="类型"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        width="100"
        prop="size"
        label="大小"
        align="right"
        show-overflow-tooltip
      >
        <template #default="scope">
          {{ scope.row.type === '文件' ? scope.row.size : ''}}
        </template>
      </el-table-column>
      <el-table-column
        width="200"
        prop="createTime"
        label="创建时间"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
      >
        <template #default="scope">
          <el-button
            v-if="scope.row.type === '文件'"
            size="default"
            @click="download_file(scope.row)"
            type="primary"
          >
            下载
          </el-button>
          <el-button
            size="default"
            @click="delete_file(scope.row)"
            type="danger"
          >
            删除
          </el-button>
          <el-button
            v-if="scope.row.type === '文件'"
            size="default"
            @click="copy_file(scope.row)"
            type="success"
          >
            复制
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>

import {
  upload,
  download,
  mkdir,
  getPathInfo,
  rmdir,
  readFile,
  readFileByte,
  renameFile,
  uploadFileFromLocal,
  downloadFileFromLocal,
  copyFile
} from '@/api/FileSystem/index.ts';
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const fileTable = ref(null);
const currentPath = ref('/data');
//存储查询到的文件列表
const fileList = ref([]);
const newFolderName = ref('');

//工具函数
// 将字符串转为对象
const convertStringToObject = (str) => {
  const regex = /(?:{)([^{}]+)(?:})/g;
  const result = {};

  let match;
  while ((match = regex.exec(str)) !== null) {
    const keyValuePairs = match[1].split(';'); // 按分号分割键值对
    keyValuePairs.forEach(pair => {
      const [key, value] = pair.split('='); // 分割键和值
      // 将字符串转为相应类型（布尔类型和number）
      result[key.trim()] = value.trim() === 'true' ? true : value.trim() === 'false' ? false : !isNaN(value) ? Number(value) : value;
    });
  }
  return result;
};
// 提取路径和文件名
function splitPathAndFileName(path) {
  const lastSlashIndex = path.lastIndexOf('/');
  const Path = path.substring(0, lastSlashIndex); // 提取路径部分
  const Name = path.substring(lastSlashIndex + 1); // 提取文件名部分
  return { Path, Name };
}
// 时间戳转日期时间
function timestampToDatetime(timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const formattedDatetime = format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);

  return formattedDatetime;
}

// 生命周期钩子onMounted
onMounted(() => {
  refreshFileList();
})

// 文件操作函数
// 跳转到指定路径
const toDirectionPath = () => {
  //查询当前路径下的文件
  getPathInfo(currentPath.value)
    .then(response => {
       fileList.value = response.data.map(file => {
          const {filePath, fileStatus}= file;
          const fileStatusObj = convertStringToObject(fileStatus);
          return {
            name: filePath.name,
            type: fileStatusObj.isDirectory ? '文件夹' : '文件',
            size:0,
            createTime: timestampToDatetime(fileStatusObj.modification_time),
            // 去掉前面的hdfs://hadoop102:8020
            path: fileStatusObj.path.trim().replace(/^hdfs:\/\/hadoop102:8020/, '')
          };
      });
    })
    .catch(error => {
      console.error(error);
    });
};
// 刷新文件列表
const refreshFileList = () => {
  getPathInfo(currentPath.value)
    .then(response => {
      fileList.value = response.data.map(file => {
        const {filePath, fileStatus}= file;
        const fileStatusObj = convertStringToObject(fileStatus);
        return {
          name: filePath.name,
          type: fileStatusObj.isDirectory ? '文件夹' : '文件',
          size:0,
          createTime: timestampToDatetime(fileStatusObj.modification_time),
          path: fileStatusObj.path.trim().replace(/^hdfs:\/\/hadoop102:8020/, '')
        };
      });
    })
    .catch(error => {
      console.error(error);
    });
};
// 文件上传
const beforeUpload = (file) => {
  upload(currentPath.value,file)
    .then(() => {
      ElMessage.success('文件上传成功');
      refreshFileList();
    })
    .catch(error => {
      ElMessage.error(`文件上传失败: ${error}`);
    });
  return false;
};
// 打开文件夹
const openFolder = (file) => {
  if (file.type === '文件夹') {
    currentPath.value = file.path;
    refreshFileList();
  }
};
// 创建目录
const createDirectory = () => {
  if (!newFolderName.value) {
    ElMessage.warning('请输入新目录名称');
    return;
  }
  //拼接路径
  const newFolderPath = `${currentPath.value}/${newFolderName.value}`;
  mkdir(newFolderPath)
    .then(() => {
      ElMessage.success('目录创建成功');
      refreshFileList();
      //清空输入框
      newFolderName.value = '';
    })
    .catch(error => {
      ElMessage.error(`目录创建失败: ${error}`);
    });
};
// 删除文件
const delete_file = (file) => {
  console.log(file);
  let filePath = null;
  let fileName = null;
  if(file.type==='文件'){
    const { Path, Name } = splitPathAndFileName(file.path);
    filePath = Path;
    fileName = Name;
  }else {
    filePath = file.path;
    fileName = null;
  }
  ElMessageBox.confirm('确认删除该文件？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    rmdir(filePath, fileName)
      .then(() => {
        ElMessage.success('文件删除成功');
        refreshFileList();
      })
      .catch(error => {
        ElMessage.error(`文件删除失败: ${error}`);
      });
  });
};
// 下载文件
const download_file = async (file) => {
  const fileName = file.name;
  // {name: '1.csv', type: '文件', size: 0, createTime: '2024-05-09 21:54:03', path: '/data/1.csv'}
  try {
    const resp = await readFileByte(file.path);
    console.log(resp);

    // 使用FileReader读取Blob数据
    const reader = new FileReader();
    reader.onload = () => {
      // 解析JSON
      const responseData = JSON.parse(reader.result);
      const dataArray = responseData.data; // 假设数据在resp.data中
      //转为二进制数据
      const arrayBuffer = Uint8Array.from(dataArray).buffer;
      // 创建Blob对象
      const blob = new Blob([dataArray], { type: 'application/octet-stream' });

      // 创建URL
      const url = window.URL.createObjectURL(blob);

      // 创建下载链接
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); // 设置下载文件名
      document.body.appendChild(link);

      // 触发下载
      link.click();

      // 清理
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    };
    // 读取Blob数据
    reader.readAsText(resp);
  } catch (error) {
    console.error(error);
  }
};
// 复制文件
const copy_file = (file) => {
  const newName = prompt('请输入新文件名：', file.name);
  if (!newName) return;
  const newNamePath = `${currentPath.value}/${newName}`;
  console.log(file.path, newNamePath);
  copyFile(file.path, newNamePath)
    .then(() => {
      ElMessage.success('文件复制成功');
      refreshFileList();
    })
    .catch(error => {
      ElMessage.error(`文件复制失败: ${error}`);
    });
};

</script>

<style>
.file-list-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .folder-path {
      flex: 50%;
    }
  }
}
</style>