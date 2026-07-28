<template>
  <div class="tab-content">
    <el-alert :closable="false" type="info" show-icon title="U钻加工说明" class="info-alert">
      <template #default> U钻（硬质合金钻头）适用于高转速、高效率钻孔加工。进给量参考值基于不同的钻孔深度（钻头直径的倍数）。 </template>
    </el-alert>

    <el-table :data="data" border stripe style="width: 100%" class="u-drill-table">
      <el-table-column prop="diameter" label="U钻直径范围(mm)" width="160" fixed />
      <el-table-column prop="speed" label="转速S(rpm)" width="140" />
      <el-table-column prop="feed2x" label="进给2倍径(mm/min)" width="170" />
      <el-table-column prop="feed3x" label="进给3倍径(mm/min)" width="170" />
      <el-table-column prop="feed4x" label="进给4倍径(mm/min)" width="170" />
      <el-table-column prop="feed5x" label="进给5倍径(mm/min)" width="170" />
    </el-table>

    <div class="legend">
      <span class="legend-item"> 进给量随钻孔深度增加而递减 </span>
      <span class="legend-item"> 建议使用冷却液降低切削温度 </span>
    </div>
  </div>
</template>

<script setup>
import { uDrillData } from '../../data.js'

const data = uDrillData
</script>

<style lang="scss" scoped>
.tab-content {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  width: 100%;
  box-sizing: border-box;
}

.info-alert {
  margin-bottom: 20px;
}

.u-drill-table {
  :deep(.el-table) {
    --el-table-header-text-color: #606266;
    --el-table-row-hover-bg-color: #ecf5ff;
    border-radius: 6px;
    overflow: hidden;
  }

  :deep(.el-table th) {
    background-color: #ecf5ff;
    color: #303133;
    font-weight: 600;
    font-size: 13px;
  }

  :deep(.el-table td) {
    font-size: 13px;
    text-align: center;
  }
}

.legend {
  display: flex;
  gap: 24px;
  margin-top: 16px;
  padding: 12px 16px;
  background: #f5f7fa;
  border-radius: 6px;
  font-size: 13px;
  color: #606266;

  .legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .dot {
    font-size: 10px;
  }
}
</style>
