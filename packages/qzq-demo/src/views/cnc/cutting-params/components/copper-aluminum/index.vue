<template>
  <div class="tab-content">
    <el-tabs v-model="activeSubTab" class="sub-tabs">
      <el-tab-pane label="开粗" name="roughing">
        <el-table :data="data.roughing" border stripe style="width: 100%">
          <el-table-column prop="toolName" label="刀具名称" width="110" fixed />
          <el-table-column prop="diameter" label="直径(mm)" width="100" />
          <el-table-column prop="speedNormal" label="转速(普)rpm" width="130" />
          <el-table-column prop="feed" label="进给(普)mm/min" width="140" />
          <el-table-column prop="depth" label="切深(普)mm" width="130" />
          <el-table-column prop="speedHigh" label="转速(高)rpm" width="130" />
          <el-table-column prop="feedHigh" label="进给(高)mm/min" width="140" />
          <el-table-column prop="depthHigh" label="切深(高)mm" width="130" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="精加工" name="finishing">
        <el-table :data="data.finishing" border stripe style="width: 100%">
          <el-table-column prop="toolName" label="刀具名称" width="110" fixed />
          <el-table-column prop="diameter" label="直径(mm)" width="100" />
          <el-table-column prop="speedNormal" label="转速(普)rpm" width="130" />
          <el-table-column prop="feedPlane" label="进给(面)mm/min" width="150" />
          <el-table-column prop="feedSide" label="进给(侧)mm/min" width="150" />
          <el-table-column prop="speedHigh" label="转速(高)rpm" width="130" />
          <el-table-column prop="feedHighPlane" label="进给(面高)mm/min" width="160" />
          <el-table-column prop="feedHighSide" label="进给(侧高)mm/min" width="160" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="曲面精加工" name="surfaceFinishing">
        <el-table :data="data.surfaceFinishing" border stripe style="width: 100%">
          <el-table-column prop="toolName" label="刀具名称" width="110" fixed />
          <el-table-column prop="diameter" label="直径(mm)" width="100" />
          <el-table-column prop="speedNormal" label="转速(普)rpm" width="130" />
          <el-table-column prop="feed" label="进给(普)mm/min" width="140" />
          <el-table-column prop="step" label="步距(mm)" width="120" />
          <el-table-column prop="speedHigh" label="转速(高)rpm" width="130" />
          <el-table-column prop="feedHigh" label="进给(高)mm/min" width="140" />
          <el-table-column prop="stepHigh" label="步距(高)mm" width="130" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="钻孔" name="drilling">
        <el-table :data="data.drilling" border stripe style="width: 100%">
          <el-table-column prop="diameter" label="直径(螺纹底孔)" width="180" />
          <el-table-column prop="speed" label="转速rpm" width="150" />
          <el-table-column prop="feed" label="进给F mm/min" width="150" />
          <el-table-column prop="qValue" label="Q值" width="120" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="镗孔(铜铝)" name="boringCopper">
        <el-table :data="data.boringCopper" border stripe style="width: 100%">
          <el-table-column prop="diameter" label="直径(mm)" width="120" />
          <el-table-column prop="speed" label="转速rpm" width="150" />
          <el-table-column prop="feed" label="进给F mm/min" width="150" />
          <el-table-column prop="qValue" label="Q值" width="120" />
          <el-table-column prop="cutAmount" label="切削量(mm)" width="130" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { copperAluminumData } from '../../data.js'

const data = copperAluminumData
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
    color: #e6a23c;
    font-weight: 600;
  }

  :deep(.el-tabs__active-bar) {
    background-color: #e6a23c;
  }
}

:deep(.el-table) {
  --el-table-header-text-color: #606266;
  --el-table-row-hover-bg-color: #fdf6ec;
  border-radius: 6px;
  overflow: hidden;
}

:deep(.el-table th) {
  background-color: #fdf6ec;
  color: #303133;
  font-weight: 600;
  font-size: 13px;
}

:deep(.el-table td) {
  font-size: 13px;
}
</style>
