<template>
  <div class="tab-content">
    <el-alert :closable="false" type="success" show-icon title="加工提示" class="info-alert">
      <template #default>
        <div class="note-content">
          <p>{{ data.note }}</p>
        </div>
      </template>
    </el-alert>

    <el-descriptions title="软钢加工参数调整建议" :column="3" border class="tips-desc">
      <el-descriptions-item label="转速调整" :span="1">
        <span class="highlight">增加 30%</span>
        <span class="unit">（参考模具钢参数 × 1.3）</span>
      </el-descriptions-item>
      <el-descriptions-item label="进给调整" :span="1">
        <span class="highlight">增加 20%</span>
        <span class="unit">（参考模具钢参数 × 1.2）</span>
      </el-descriptions-item>
      <el-descriptions-item label="切深调整" :span="1">
        <span class="highlight">增加 30%</span>
        <span class="unit">（参考模具钢参数 × 1.3）</span>
      </el-descriptions-item>
      <el-descriptions-item label="典型材料" :span="3"> A3、Q235、未淬火H13、45#钢等 </el-descriptions-item>
    </el-descriptions>

    <div class="reference-link">
      <el-icon class="link-icon"><Document /></el-icon>
      <span>详细参数可参考</span>
      <a href="#" @click.prevent="$emit('gotoMoldSteel')">模具钢加工参数</a>
    </div>
  </div>
</template>

<script setup>
import { Document } from '@element-plus/icons-vue'
import { softSteelData } from '../../data.js'

defineEmits(['gotoMoldSteel'])

const data = softSteelData
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

.tips-desc {
  margin-top: 16px;
  border-radius: 6px;
  overflow: hidden;

  :deep(.el-descriptions__label) {
    width: 120px;
    background-color: #f0f9eb;
    color: #303133;
    font-weight: 600;
  }
}

.highlight {
  color: #67c23a;
  font-weight: 600;
  font-size: 16px;
}

.unit {
  color: #909399;
  font-size: 13px;
  margin-left: 4px;
}

.reference-link {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 20px;
  padding: 12px 16px;
  background: #f5f7fa;
  border-radius: 6px;
  font-size: 14px;
  color: #606266;

  .link-icon {
    color: #409eff;
  }

  a {
    color: #409eff;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
