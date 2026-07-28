<template>
  <div class="tab-content">
    <el-alert :closable="false" type="warning" show-icon title="加工提示" class="info-alert">
      <template #default>
        <div class="note-content">
          <p>{{ data.note }}</p>
          <div class="divider"></div>
          <div class="subsection">
            <div class="subsection-title">
              <el-icon class="icon"><InfoFilled /></el-icon>
              <span>动态铣削参数参考</span>
            </div>
            <p>{{ data.dynamicMilling.note }}</p>
          </div>
        </div>
      </template>
    </el-alert>

    <el-descriptions title="不锈钢加工要点" :column="1" border class="tips-desc">
      <el-descriptions-item label="刀具选择"> 建议使用超细晶粒硬质合金刀具，涂层选择TiAlN或TiCN </el-descriptions-item>
      <el-descriptions-item label="切削液"> 使用极压乳化液或切削油，保证充分冷却 </el-descriptions-item>
      <el-descriptions-item label="进给策略"> 采用动态铣削（摆线加工），减少径向切削力 </el-descriptions-item>
      <el-descriptions-item label="注意事项"> 避免加工硬化，进给量不宜过低，建议刀具锋利 </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
import { InfoFilled } from '@element-plus/icons-vue'
import { stainlessSteelData } from '../../data.js'

const data = stainlessSteelData
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

  :deep(.el-alert__body) {
    padding: 16px 20px;
  }
}

.note-content {
  font-size: 14px;
  line-height: 1.8;
  color: #606266;

  p {
    margin: 0;
  }
}

.divider {
  height: 1px;
  background: linear-gradient(to right, transparent, #dcdfe6, transparent);
  margin: 12px 0;
}

.subsection {
  .subsection-title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 600;
    color: #303133;
    margin-bottom: 8px;

    .icon {
      color: #e6a23c;
    }
  }
}

.tips-desc {
  margin-top: 16px;
  border-radius: 6px;
  overflow: hidden;

  :deep(.el-descriptions__label) {
    width: 120px;
    background-color: #f5f7fa;
    color: #303133;
    font-weight: 600;
  }
}
</style>
