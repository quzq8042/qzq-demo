<template>
  <div class="material-properties-container">
    <PageHeader />

    <div class="top-panel">
      <div class="search-bar">
        <el-input v-model="searchText" placeholder="搜索材料名称或代号..." clearable style="width: 300px">
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>

      <div class="machinability-legend">
        <h3>切削加工性等级说明</h3>
        <div class="legend-items">
          <div v-for="level in machinabilityLevels" :key="level.level" class="legend-item" :style="{ borderColor: level.color }">
            <span class="level-badge" :style="{ background: level.color }">等级 {{ level.level }}</span>
            <span class="level-label">{{ level.label }}</span>
            <span class="level-desc">{{ level.desc }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="material-grid">
      <div v-for="material in filteredMaterials" :key="material.code" class="material-card" :style="{ borderTopColor: getMachinabilityColor(material.machinabilityLevel) }">
        <div class="card-header" :style="{ background: getMachinabilityColor(material.machinabilityLevel) }">
          <div class="material-id">
            <h3>{{ material.name }}</h3>
            <span class="material-code">{{ material.code }}</span>
          </div>
          <el-tag :type="getMachinabilityTagType(material.machinabilityLevel)" size="large">
            {{ material.machinability }}
          </el-tag>
        </div>
        <div class="card-body">
          <div class="property-grid">
            <div class="property-item">
              <span class="property-label">分类</span>
              <span class="property-value">{{ material.category }}</span>
            </div>
            <div class="property-item">
              <span class="property-label">密度</span>
              <span class="property-value">{{ material.density }} g/cm³</span>
            </div>
            <div class="property-item">
              <span class="property-label">硬度</span>
              <span class="property-value">{{ material.hardness }}</span>
            </div>
            <div class="property-item">
              <span class="property-label">抗拉强度</span>
              <span class="property-value">{{ material.tensileStrength }} MPa</span>
            </div>
            <div class="property-item">
              <span class="property-label">屈服强度</span>
              <span class="property-value">{{ material.yieldStrength }} MPa</span>
            </div>
            <div class="property-item">
              <span class="property-label">延伸率</span>
              <span class="property-value">{{ material.elongation }}%</span>
            </div>
            <div class="property-item">
              <span class="property-label">导热系数</span>
              <span class="property-value">{{ material.thermalConductivity }} W/(m·K)</span>
            </div>
            <div class="property-item full-width">
              <span class="property-label">应用</span>
              <span class="property-value">{{ material.applications }}</span>
            </div>
          </div>
          <div class="notes-section">
            <span class="notes-icon">💡</span>
            <span class="notes-text">{{ material.notes }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import PageHeader from '../components/PageHeader.vue'
import { materials, machinabilityLevels, materialCategories } from './data.js'

const searchText = ref('')
const selectedCategory = ref('')

const filteredMaterials = computed(() => {
  let result = materials
  if (searchText.value) {
    const keyword = searchText.value.toLowerCase()
    result = result.filter((m) => m.name.toLowerCase().includes(keyword) || m.code.toLowerCase().includes(keyword))
  }
  if (selectedCategory.value) {
    result = result.filter((m) => m.category === selectedCategory.value)
  }
  return result
})

const getMachinabilityColor = (level) => {
  const colors = ['#10b981', '#22c55e', '#f59e0b', '#f97316', '#ef4444']
  return colors[level - 1] || '#94a3b8'
}

const getMachinabilityTagType = (level) => {
  const types = ['success', 'success', 'warning', 'warning', 'danger']
  return types[level - 1] || 'info'
}
</script>

<style lang="scss" scoped>
.material-properties-container {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  min-height: 100vh;
}

.top-panel {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  align-items: flex-start;
}

.search-bar {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  flex-shrink: 0;
}

.machinability-legend {
  flex: 1;
  background: #fff;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

  h3 {
    margin: 0 0 12px;
    font-size: 15px;
    color: #2d3748;
  }
}

.legend-items {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.legend-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 12px;
  background: #f8f9fb;
  border-radius: 8px;
  border-left: 4px solid;

  .level-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 6px;
    color: #fff;
    font-size: 11px;
    font-weight: 600;
    text-align: center;
  }

  .level-label {
    font-size: 13px;
    font-weight: 600;
    color: #2d3748;
  }

  .level-desc {
    font-size: 11px;
    color: #718096;
    line-height: 1.4;
  }
}

.material-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
}

.material-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-top: 4px solid;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  }
}

.card-header {
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;

  .material-id {
    h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
    }

    .material-code {
      font-size: 13px;
      opacity: 0.9;
    }
  }

  :deep(.el-tag) {
    color: #fff;
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.2);
  }
}

.card-body {
  padding: 20px;
}

.property-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

.property-item {
  display: flex;
  flex-direction: column;
  gap: 2px;

  &.full-width {
    grid-column: span 2;
  }

  .property-label {
    font-size: 12px;
    color: #94a3b8;
  }

  .property-value {
    font-size: 14px;
    color: #2d3748;
    font-weight: 500;
  }
}

.notes-section {
  background: #f8f9fb;
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  gap: 8px;

  .notes-icon {
    font-size: 16px;
  }

  .notes-text {
    font-size: 13px;
    color: #4a5568;
    line-height: 1.5;
  }
}
</style>
