<template>
  <div class="tab-content">
    <div class="material-filter">
      <span>材料筛选：</span>
      <el-radio-group v-model="selectedMaterial" class="radio-group">
        <el-radio label="全部">全部</el-radio>
        <el-radio label="铝合金">铝合金</el-radio>
        <el-radio label="碳钢">碳钢</el-radio>
        <el-radio label="不锈钢">不锈钢</el-radio>
        <el-radio label="模具钢">模具钢</el-radio>
      </el-radio-group>
    </div>
    <div class="tip-box">
      <span class="tip-icon">💡</span>
      <span>转速计算公式：S = 1000 × v / (π × D) ，其中v为切削速度(m/min)，D为刀具直径(mm)</span>
    </div>
    <el-table :data="filteredSpindleData" border style="width: 100%" :fit="true">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="tool_diameter" label="刀具直径" />
      <el-table-column prop="material" label="材料" />
      <el-table-column prop="hss_speed" label="HSS转速(rpm)" />
      <el-table-column prop="carbide_speed" label="硬质合金转速(rpm)" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { spindleSpeedData } from '../../data.js'

const selectedMaterial = ref('全部')

const filteredSpindleData = computed(() => {
  if (selectedMaterial.value === '全部') {
    return spindleSpeedData
  }
  return spindleSpeedData.filter((item) => item.material === selectedMaterial.value)
})
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

.material-filter {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 10px;
  padding: 12px 16px;
  background: #f5f7fa;
  border-radius: 8px;

  span {
    font-size: 14px;
    color: #666;
  }

  .radio-group {
    display: flex;
    gap: 16px;
  }
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
