<template>
  <div class="screw-table-container">
    <el-table :data="tableData" border stripe style="width: 100%">
      <!-- 公制粗螺纹分组 -->
      <el-table-column label="公制粗螺纹(单位:mm)" align="center">
        <el-table-column prop="coarse_spec" label="规格" width="120" align="center">
          <template #default="scope">
            <span style="font-weight: bold">{{ scope.row.coarse_spec }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="coarse_std" label="标准径" width="100" align="center">
          <template #default="scope">
            <span style="font-weight: bold">{{ scope.row.coarse_std }}</span>
          </template>
        </el-table-column>
        <el-table-column label="2级牙钻孔径" align="center">
          <el-table-column prop="coarse_max" label="最大" width="100" align="center" />
          <el-table-column prop="coarse_min" label="最小" width="100" align="center" />
        </el-table-column>
      </el-table-column>

      <!-- 空列用于分隔 -->
      <el-table-column width="60" />

      <!-- 公制细螺纹分组 -->
      <el-table-column label="公制细螺纹(单位:mm)" align="center">
        <el-table-column prop="fine_spec" label="规格" width="120" align="center">
          <template #default="scope">
            <span style="font-weight: bold">{{ scope.row.fine_spec }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="fine_std" label="标准径" width="100" align="center">
          <template #default="scope">
            <span style="font-weight: bold">{{ scope.row.fine_std }}</span>
          </template>
        </el-table-column>
        <el-table-column label="2级牙钻孔径" align="center">
          <el-table-column prop="fine_max" label="最大" width="100" align="center" />
          <el-table-column prop="fine_min" label="最小" width="100" align="center" />
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})
const tableData = ref(props.data)
</script>

<style scoped>
.screw-table-container {
  margin: 20px;
  overflow-x: auto;
}
:deep(.el-table th) {
  background-color: #f5f7fa;
  font-weight: 600;
  font-size: 14px;
}
:deep(.el-table td) {
  font-size: 13px;
}
</style>
