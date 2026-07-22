<template>
  <div class="tab-content">
    <div class="speed-unit-filter">
      <span>切削速度单位：</span>
      <el-radio-group v-model="speedUnit" class="radio-group">
        <el-radio label="m/min">m/min</el-radio>
        <el-radio label="mm/min">mm/min</el-radio>
        <el-radio label="mm/s">mm/s</el-radio>
      </el-radio-group>
    </div>
    <el-table :data="materialCuttingParams" border style="width: 100%" :fit="true">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="material" label="材料" />
      <el-table-column prop="hardness" label="硬度" />
      <el-table-column :label="`切削速度(${speedUnit})`">
        <template #default="{ row }">
          {{ convertSpeed(row.cutting_speed) }}
        </template>
      </el-table-column>
      <el-table-column prop="spindle_speed" label="主轴转速(rpm)" />
      <el-table-column prop="feed_rate" label="进给量(mm/z)" />
      <el-table-column prop="depth_of_cut" label="切削深度(mm)" />
      <el-table-column prop="tool_material" label="推荐刀具" />
      <el-table-column prop="ug_strategy" label="UG策略" />
      <el-table-column prop="note" label="备注" />
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { materialCuttingParams } from '../../data.js'

const speedUnit = ref('m/min')

const convertSpeed = (speed) => {
  const range = speed.split('-')
  if (range.length === 2) {
    const min = parseFloat(range[0])
    const max = parseFloat(range[1])
    let resultMin, resultMax
    switch (speedUnit.value) {
      case 'mm/min':
        resultMin = (min * 1000).toFixed(0)
        resultMax = (max * 1000).toFixed(0)
        break
      case 'mm/s':
        resultMin = ((min * 1000) / 60).toFixed(1)
        resultMax = ((max * 1000) / 60).toFixed(1)
        break
      default:
        return speed
    }
    return `${resultMin}-${resultMax}`
  }
  return speed
}
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

.speed-unit-filter {
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
