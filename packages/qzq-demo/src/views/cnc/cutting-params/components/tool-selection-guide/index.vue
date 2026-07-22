<template>
  <div class="tab-content">
    <el-table :data="toolSelectionGuide" border style="width: 100%" :fit="true">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="tool_type" label="刀具类型" />
      <el-table-column prop="application" label="应用场景" />
      <el-table-column prop="material" label="适用材料" />
      <el-table-column prop="diameter" label="直径范围" />
      <el-table-column prop="flute_count" label="刃数" />
      <el-table-column prop="coating" label="涂层" />
      <el-table-column prop="holder_type" label="刀柄类型" />
      <el-table-column prop="ug_usage" label="UG用法" />
      <el-table-column prop="note" label="备注" />
    </el-table>
  </div>
</template>

<script setup>
import { toolSelectionGuide } from '../../data.js'
</script>

<style lang="scss" scoped>
.tab-content {
  background: #fff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
}

:deep(.el-table) {
  --el-table-header-text-color: #666;
  --el-table-row-hover-bg-color: #f5f7fa;
  table-layout: auto !important;
  min-width: 100%;
}

:deep(.el-table th),
:deep(.el-table td) {
  white-space: nowrap;
  background-color: #f8f9fa;
  font-weight: 600;
  padding: 8px 12px;
  min-width: 80px;
}

:deep(.el-table td) {
  background-color: #fff;
  font-weight: normal;
}

:deep(.el-table__inner-wrapper) {
  overflow-x: auto;
  width: auto !important;
}

:deep(.el-table__header-wrapper),
:deep(.el-table__body-wrapper) {
  width: auto !important;
}

:deep(.el-table__header),
:deep(.el-table__body) {
  width: auto !important;
}

:deep(.el-table__row) {
  width: auto !important;
}
</style>
