<template>
  <div class="post-processor-guide">
    <PageHeader>
      <template #actions>
        <el-input v-model="searchText" placeholder="搜索控制器/功能" clearable style="width: 260px" />
      </template>
    </PageHeader>

    <el-tabs v-model="activeTab" type="card" class="tabs-container">
      <el-tab-pane label="控制器对比" name="controllers">
        <div class="controller-grid">
          <div v-for="ctrl in filteredControllers" :key="ctrl.id" class="controller-card" @click="selectController(ctrl)">
            <div class="card-header">
              <span class="logo">{{ ctrl.logo }}</span>
              <div class="title-area">
                <h3>{{ ctrl.name }}</h3>
                <span class="country">{{ ctrl.country }}</span>
              </div>
              <el-tag :type="activeController?.id === ctrl.id ? 'primary' : 'info'" size="small">
                {{ ctrl.features.marketShare }}
              </el-tag>
            </div>
            <div class="card-body">
              <div class="info-row">
                <span class="label">可靠性</span>
                <span class="value">{{ ctrl.features.reliability }}</span>
              </div>
              <div class="info-row">
                <span class="label">编程难度</span>
                <span class="value">{{ ctrl.features.programmingEase }}</span>
              </div>
              <div class="model-list">
                <span class="label">常见型号</span>
                <div class="models">
                  <span v-for="m in ctrl.features.commonModels" :key="m" class="model-tag">{{ m }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeController" class="detail-panel">
          <div class="detail-section">
            <h4>代码差异对比</h4>
            <el-descriptions :column="2" border>
              <el-descriptions-item label="坐标">{{ activeController.codeDifferences.coordinates }}</el-descriptions-item>
              <el-descriptions-item label="进给">{{ activeController.codeDifferences.feedRate }}</el-descriptions-item>
              <el-descriptions-item label="换刀">{{ activeController.codeDifferences.toolChange }}</el-descriptions-item>
              <el-descriptions-item label="主轴">{{ activeController.codeDifferences.spindle }}</el-descriptions-item>
              <el-descriptions-item label="冷却液">{{ activeController.codeDifferences.coolant }}</el-descriptions-item>
            </el-descriptions>
          </div>

          <div class="detail-section">
            <h4>后处理器信息</h4>
            <el-descriptions :column="2" border>
              <el-descriptions-item label="后处理代码">{{ activeController.postProcessor.code }}</el-descriptions-item>
              <el-descriptions-item label="文件格式">{{ activeController.postProcessor.fileFormat }}</el-descriptions-item>
              <el-descriptions-item label="编码">{{ activeController.postProcessor.encoding }}</el-descriptions-item>
              <el-descriptions-item label="行号">{{ activeController.postProcessor.lineNumber }}</el-descriptions-item>
              <el-descriptions-item label="特殊字符" :span="2">{{ activeController.postProcessor.specialChars }}</el-descriptions-item>
            </el-descriptions>
          </div>

          <div class="detail-section">
            <h4>使用技巧</h4>
            <div class="tips-list">
              <div v-for="(tip, i) in activeController.tips" :key="i" class="tip-item">
                <span class="tip-icon">💡</span>
                <span>{{ tip }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="代码对照表" name="comparison">
        <div class="comparison-section">
          <h4>G 代码功能对照表</h4>
          <el-table :data="filteredComparison" border stripe style="width: 100%">
            <el-table-column prop="feature" label="功能" width="180" fixed />
            <el-table-column prop="fanuc" label="FANUC" min-width="120" />
            <el-table-column prop="siemens" label="Siemens" min-width="120" />
            <el-table-column prop="heidenhain" label="Heidenhain" min-width="120" />
            <el-table-column prop="huazhong" label="华中" min-width="120" />
            <el-table-column prop="haas" label="Haas" min-width="120" />
            <el-table-column prop="mitsubishi" label="三菱" min-width="120" />
            <el-table-column prop="syntec" label="新代" min-width="120" />
          </el-table>
        </div>
      </el-tab-pane>

      <el-tab-pane label="后处理选择" name="selection">
        <div class="selection-grid">
          <div v-for="item in postProcessorSelection" :key="item.condition" class="selection-card">
            <div class="condition">{{ item.condition }}</div>
            <div class="recommendation">{{ item.recommendation }}</div>
            <div class="notes">{{ item.notes }}</div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import { controllers, codeComparison, postProcessorSelection } from './data.js'

const activeTab = ref('controllers')
const activeController = ref(controllers[0])
const searchText = ref('')

const filteredControllers = computed(() => {
  if (!searchText.value) return controllers
  const kw = searchText.value.toLowerCase()
  return controllers.filter((c) => c.name.toLowerCase().includes(kw) || c.features.fullName.toLowerCase().includes(kw) || c.features.commonModels.some((m) => m.toLowerCase().includes(kw)) || c.tips.some((t) => t.toLowerCase().includes(kw)))
})

const filteredComparison = computed(() => {
  if (!searchText.value) return codeComparison
  const kw = searchText.value.toLowerCase()
  return codeComparison.filter((row) => Object.values(row).some((v) => String(v).toLowerCase().includes(kw)))
})

const selectController = (ctrl) => {
  activeController.value = ctrl
}
</script>

<style lang="scss" scoped>
.post-processor-guide {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  min-height: 100vh;

  .tabs-container {
    background: #fff;
    border-radius: 12px;
    padding: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

    :deep(.el-tabs__header) {
      margin-bottom: 16px;
      background: #f8f9fb;
      border-radius: 8px;
      padding: 6px;
    }

    :deep(.el-tabs__nav-wrap::after) {
      display: none;
    }

    :deep(.el-tabs__item) {
      padding: 0 20px;
      font-size: 14px;
      font-weight: 500;
      border-radius: 6px;
      height: 36px;
      line-height: 36px;
      transition: all 0.3s ease;
      border: none;

      &:hover {
        background: rgba(102, 126, 234, 0.1);
      }
    }

    :deep(.el-tabs__item.is-active) {
      color: #fff;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    }

    :deep(.el-tabs__active-bar) {
      display: none;
    }

    :deep(.el-tabs__content) {
      padding: 16px 8px;
    }
  }
}

.controller-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.controller-card {
  background: #fff;
  border: 2px solid #e8ecf1;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f0f0;

    .logo {
      font-size: 28px;
    }

    .title-area {
      flex: 1;

      h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: #333;
      }

      .country {
        font-size: 12px;
        color: #909399;
      }
    }
  }

  .card-body {
    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;

      .label {
        font-size: 13px;
        color: #909399;
      }

      .value {
        font-size: 13px;
        color: #333;
        font-weight: 500;
      }
    }

    .model-list {
      margin-top: 12px;

      .label {
        font-size: 13px;
        color: #909399;
        display: block;
        margin-bottom: 6px;
      }

      .models {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }

      .model-tag {
        font-size: 12px;
        padding: 3px 10px;
        background: #f0f4ff;
        color: #667eea;
        border-radius: 4px;
      }
    }
  }
}

.detail-panel {
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.detail-section {
  background: #fff;
  border-radius: 10px;
  padding: 20px;

  h4 {
    margin: 0 0 16px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    padding-bottom: 10px;
    border-bottom: 2px solid #667eea;
    display: inline-block;
  }
}

.tips-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #fff9e6 0%, #fff4cc 100%);
  border-radius: 8px;
  font-size: 14px;
  color: #666;
  line-height: 1.5;

  .tip-icon {
    font-size: 18px;
    flex-shrink: 0;
  }
}

.comparison-section {
  h4 {
    margin: 0 0 16px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }
}

.selection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.selection-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 20px;
  color: #fff;

  .condition {
    font-size: 13px;
    opacity: 0.85;
    margin-bottom: 8px;
  }

  .recommendation {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .notes {
    font-size: 13px;
    opacity: 0.9;
    line-height: 1.5;
  }
}
</style>
