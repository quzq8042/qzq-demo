<template>
  <div class="tab-content">
    <el-tabs v-model="activeSubTab" class="sub-tabs">
      <el-tab-pane label="开粗" name="roughing">
        <el-table :data="data.roughing" border stripe style="width: 100%">
          <el-table-column prop="tool" label="刀具" width="120" fixed />
          <el-table-column prop="speed" label="转速S rpm" width="120" />
          <el-table-column prop="feed" label="进给F mm/min" width="150" />
          <el-table-column prop="depth" label="Z轴吃刀量mm" width="150" />
          <el-table-column prop="step" label="步距" width="100" />
          <el-table-column prop="side" label="侧刃mm" width="110" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="精光" name="finishing">
        <el-table :data="data.finishing" border stripe style="width: 100%">
          <el-table-column prop="tool" label="刀具" width="120" fixed />
          <el-table-column prop="speed" label="转速S rpm" width="120" />
          <el-table-column prop="feed" label="侧刃一刀过进给F mm/min" width="200" />
          <el-table-column prop="step" label="步距" width="100" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="钻孔" name="drilling">
        <el-table :data="data.drilling" border stripe style="width: 100%">
          <el-table-column prop="tool" label="刀具" width="120" fixed />
          <el-table-column prop="speed" label="转速rpm" width="120" />
          <el-table-column prop="feed" label="进给F mm/min" width="150" />
          <el-table-column prop="qValue" label="Q值" width="100" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { acrylicData } from '../../data.js'

const data = acrylicData
const activeSubTab = ref('roughing')
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

.sub-tabs {
  :deep(.el-tabs__header) {
    margin-bottom: 16px;
    border-bottom: 2px solid #e4e7ed;
  }

  :deep(.el-tabs__item) {
    font-size: 14px;
    padding: 0 16px;
    height: 38px;
    line-height: 38px;
  }

  :deep(.el-tabs__item.is-active) {
    color: #909399;
    font-weight: 600;
  }

  :deep(.el-tabs__active-bar) {
    background-color: #909399;
  }
}

:deep(.el-table) {
  --el-table-header-text-color: #606266;
  --el-table-row-hover-bg-color: #f4f4f5;
  border-radius: 6px;
  overflow: hidden;
}

:deep(.el-table th) {
  background-color: #f4f4f5;
  color: #303133;
  font-weight: 600;
  font-size: 13px;
}

:deep(.el-table td) {
  font-size: 13px;
}
</style>
