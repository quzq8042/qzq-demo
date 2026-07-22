<template>
  <div class="tab-content">
    <div class="tip-box">
      <span class="tip-icon">💡</span>
      <span>提示：进给量需根据加工表面质量要求、刀具齿数、切削宽度进行调整</span>
    </div>
    <el-table :data="feedRateReference" border style="width: 100%" :fit="true">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="material" label="材料" />
      <el-table-column prop="tool_diameter" label="刀具直径" />
      <el-table-column prop="side_milling" label="侧面铣削(mm/z)" />
      <el-table-column prop="face_milling" label="平面铣削(mm/z)" />
      <el-table-column prop="slotting" label="开槽加工(mm/z)" />
      <el-table-column prop="stepover" label="步距百分比" />
      <el-table-column prop="coolant" label="推荐冷却" />
    </el-table>
  </div>
</template>

<script setup>
import { feedRateReference } from '../../data.js'
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

.tip-box {
  margin-bottom: 10px;
  padding: 12px 16px;
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  border-radius: 0 8px 8px 0;
  display: flex;
  align-items: center;
  gap: 10px;

  .tip-icon {
    font-size: 18px;
  }

  span:last-child {
    font-size: 14px;
    color: #856404;
  }
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
