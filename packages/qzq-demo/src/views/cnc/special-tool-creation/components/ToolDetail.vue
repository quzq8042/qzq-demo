<template>
  <div class="tool-detail">
    <div class="tool-overview">
      <div class="tool-badge">
        <span class="badge-icon">{{ data.icon }}</span>
        <span class="badge-title">{{ data.type }}</span>
      </div>
      <p class="tool-desc">{{ data.description }}</p>
      <div class="scenario-list">
        <span v-for="(s, i) in data.scenarios" :key="i" class="scenario-tag">
          <el-icon><InfoFilled /></el-icon>
          {{ s }}
        </span>
      </div>
    </div>

    <el-divider content-position="left" class="section-divider">刀具参数</el-divider>

    <el-table :data="data.params" border stripe class="params-table">
      <el-table-column prop="code" label="参数" width="90">
        <template #default="{ row }">
          <span class="param-code">{{ row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="140" />
      <el-table-column prop="unit" label="单位" width="90" />
      <el-table-column prop="range" label="推荐范围" width="160" />
      <el-table-column prop="desc" label="说明" />
    </el-table>

    <el-divider content-position="left" class="section-divider">创建步骤</el-divider>

    <el-steps direction="vertical" :space="60" :active="data.steps.length" class="steps-list">
      <el-step v-for="(step, i) in data.steps" :key="i" :title="step" />
    </el-steps>

    <el-divider content-position="left" class="section-divider">示例</el-divider>

    <div class="demo-gallery">
      <el-image v-for="(img, i) in data.images" :key="i" :src="img" :preview-src-list="data.images" :initial-index="i" :preview-teleported="true" fit="cover" class="demo-image" />
    </div>

    <el-divider content-position="left" class="section-divider">工艺要点</el-divider>

    <div class="tips-list">
      <el-alert v-for="(tip, i) in data.tips" :key="i" :title="`要点 ${i + 1}`" :description="tip" type="warning" show-icon :closable="false" class="tip-alert" />
    </div>

    <el-divider content-position="left" class="section-divider">代码示例</el-divider>

    <div class="code-wrapper">
      <div class="code-header">
        <span class="code-label">CNC 代码</span>
        <el-button link size="small" @click="copyCode">
          <el-icon><CopyDocument /></el-icon>
        </el-button>
      </div>
      <pre class="code-block"><code>{{ data.code }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { InfoFilled, CopyDocument } from '@element-plus/icons-vue'

const props = defineProps({
  data: { type: Object, required: true },
})

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.data.code)
    ElMessage.success('代码已复制到剪贴板')
  } catch {
    ElMessage.error('复制失败')
  }
}
</script>

<style lang="scss" scoped>
.tool-detail {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
}

.tool-overview {
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ef 100%);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 8px;

  .tool-badge {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;

    .badge-icon {
      width: 44px;
      height: 44px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      border-radius: 10px;
      font-size: 22px;
    }

    .badge-title {
      font-size: 20px;
      font-weight: 700;
      color: #303133;
    }
  }

  .tool-desc {
    font-size: 14px;
    color: #606266;
    line-height: 1.8;
    margin: 0 0 16px;
  }

  .scenario-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .scenario-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      background: #fff;
      border-radius: 20px;
      font-size: 13px;
      color: #606266;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);

      .el-icon {
        color: #667eea;
      }
    }
  }
}

.section-divider {
  margin: 28px 0 20px;

  :deep(.el-divider__text) {
    font-size: 14px;
    font-weight: 600;
    color: #303133;
    background: #fff;
    padding: 0 12px;
  }

  :deep(.el-divider__line) {
    background: #e4e7ed;
  }
}

.params-table {
  :deep(.el-table) {
    --el-table-header-text-color: #606266;
    --el-table-row-hover-bg-color: #ecf5ff;
    border-radius: 8px;
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
  }

  .param-code {
    font-family: 'Courier New', monospace;
    font-weight: 700;
    color: #667eea;
    background: rgba(102, 126, 234, 0.1);
    padding: 2px 8px;
    border-radius: 4px;
  }
}

.steps-list {
  padding: 0 10px;

  :deep(.el-step__title) {
    font-size: 13px;
    line-height: 1.6;
  }

  :deep(.el-step__head.is-finish) {
    color: #667eea;
    border-color: #667eea;
  }

  :deep(.el-step__icon) {
    background: #667eea;
    border-color: #667eea;
  }

  :deep(.el-step__icon-content) {
    color: #fff;
  }
}

.tips-list {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .tip-alert {
    :deep(.el-alert__title) {
      font-weight: 600;
    }

    :deep(.el-alert__description) {
      margin-top: 4px;
      line-height: 1.7;
    }
  }
}

.demo-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;

  .demo-image {
    width: 100%;
    height: 200px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #e4e7ed;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(102, 126, 234, 0.15);
    }

    :deep(img) {
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.02);
      }
    }
  }
}

.code-wrapper {
  background: #1e1e1e;
  border-radius: 10px;
  overflow: hidden;

  .code-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    background: #2d2d2d;
    border-bottom: 1px solid #3a3a3a;

    .code-label {
      font-size: 13px;
      color: #d4d4d4;
      font-family: 'Courier New', monospace;
    }

    :deep(.el-button) {
      color: #d4d4d4;

      &:hover {
        color: #667eea;
      }
    }
  }

  .code-block {
    margin: 0;
    padding: 16px;
    overflow-x: auto;

    code {
      font-family: 'Courier New', Consolas, monospace;
      font-size: 13px;
      line-height: 1.7;
      color: #d4d4d4;
      white-space: pre;
    }
  }
}
</style>
