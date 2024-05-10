<script setup lang="ts">
import {computed} from 'vue'

//接受父组件FileList传递的props
defineProps({
  //文件类型
  fileType: Number,
  //文件路径
  filePath: String,
  //文件列表
  fileList: Array,
  //// 文件加载状态
  loading: Boolean
})

const handleSelectRow = (selection: any[]) => {
  console.log(selection)
  //触发file store的action
}


</script>

<template>
<!--文件表格组件-->
  <div>
    <el-table
      class="file-table"
      :class="['file-type-'+fileType]"
      :data="fileList"
      ref="multipleTable"
      v-loading="loading"
      element-loading-text="文件加载中……"
      tooltip-effect="dark"
      :highlight-current-row="true"
      @selection-change="handleSelectRow"
      @sort-change="handleSortChange"
      @row-contextmenu="handleContextMenu"
      style="width: 100%">
      <!--    多选操作-->
      <el-table-column
        type="selection"
        key="selection"
        width="56"
        align="center"
        v-if="fileType !== 8"
      ></el-table-column>
      <!--    -->
      <el-table-column
        label
        prop="isDir"
        key="isDir"
        align="center"
        class-name="file-icon-column"
      >
      </el-table-column>
      <el-table-column
        prop="fileName"
        key="fileName"
        :sort-by="['isDir', 'fileName']"
        sortable
        show-overflow-tooltip
      >
        <template slot="header">
          <span>文件名</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="fileType === 6 ? '原路径' : '路径'"
        prop="filePath"
        key="filePath"
        show-overflow-tooltip
        v-if="
					![0, 8].includes(Number($route.query.fileType))
				"
      >
        <template slot-scope="scope">
					<span
            style="cursor: pointer"
            title="点击跳转"
            @click="
							$router.push({
								query: { filePath: scope.row.filePath, fileType: 0 }
							})
						"
          >{{ scope.row.filePath }}</span
          >
        </template>
      </el-table-column>
      <el-table-column
        label="类型"
        width="80"
        prop="extendName"
        key="extendName"
        :sort-by="['isDir', 'extendName']"
        sortable
        show-overflow-tooltip
        v-if="selectedColumnList.includes('extendName') && screenWidth > 768"
      >
        <template slot-scope="scope">
          <span>{{ $file.getFileType(scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label=""
        key="operation"
        width="48"
        v-if="screenWidth <= 768"
      >
        <template slot-scope="scope">
          <i
            class="file-operate el-icon-more"
            :class="`operate-more-${scope.$index}`"
            @click="handleClickMore(scope.row, $event)"
          ></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="scss">

</style>