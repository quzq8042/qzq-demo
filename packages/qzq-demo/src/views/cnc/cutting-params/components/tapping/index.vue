<template>
  <div class="tab-content">
    <el-tabs v-model="activeSubTab" class="sub-tabs">
      <el-tab-pane label="钢料铣牙刀" name="steelThreadMilling">
        <el-table :data="data.steelThreadMilling" border stripe style="width: 100%">
          <el-table-column prop="tool" label="刀具规格" width="120" fixed />
          <el-table-column prop="speed" label="转速S rpm" width="130" />
          <el-table-column prop="feed" label="进给F mm/min" width="150" />
          <el-table-column prop="sideDepth" label="侧刃吃刀量mm" width="150" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="铝料铣牙刀" name="aluminumThreadMilling">
        <el-table :data="data.aluminumThreadMilling" border stripe style="width: 100%">
          <el-table-column prop="tool" label="刀具规格" width="120" fixed />
          <el-table-column prop="speed" label="转速S rpm" width="130" />
          <el-table-column prop="feed" label="进给F mm/min" width="150" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="丝攻钢料" name="tappingSteel">
        <el-table :data="data.tappingSteel" border stripe style="width: 100%">
          <el-table-column prop="tool" label="刀具规格" width="120" fixed />
          <el-table-column prop="speed" label="转速S rpm" width="150" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="丝攻铝料" name="tappingAluminum">
        <el-table :data="data.tappingAluminum" border stripe style="width: 100%">
          <el-table-column prop="tool" label="刀具规格" width="120" fixed />
          <el-table-column prop="speed" label="转速S rpm" width="150" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { tappingData } from '../../data.js'

const data = tappingData
const activeSubTab = ref('steelThreadMilling')
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
    color: #67c23a;
    font-weight: 600;
  }

  :deep(.el-tabs__active-bar) {
    background-color: #67c23a;
  }
}

:deep(.el-table) {
  --el-table-header-text-color: #606266;
  --el-table-row-hover-bg-color: #f0f9eb;
  border-radius: 6px;
  overflow: hidden;
}

:deep(.el-table th) {
  background-color: #f0f9eb;
  color: #303133;
  font-weight: 600;
  font-size: 13px;
}

:deep(.el-table td) {
  font-size: 13px;
}
</style>
