<template>
  <div class="cnc-safety-container">
    <PageHeader />

    <el-tabs v-model="activeTab" class="safety-tabs">
      <el-tab-pane label="开机关机流程" name="power">
        <div class="flow-section">
          <div class="flow-grid">
            <div class="flow-card">
              <div class="flow-header power-on">
                <span class="flow-icon">🟢</span>
                <h3>开机流程</h3>
              </div>
              <div class="flow-steps">
                <div v-for="(step, idx) in powerOnSteps" :key="idx" class="step-item">
                  <div class="step-number">{{ idx + 1 }}</div>
                  <div class="step-content">
                    <h4>{{ step.title }}</h4>
                    <p>{{ step.desc }}</p>
                    <span v-if="step.warning" class="step-warning">⚠️ {{ step.warning }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="flow-card">
              <div class="flow-header power-off">
                <span class="flow-icon">🔴</span>
                <h3>关机流程</h3>
              </div>
              <div class="flow-steps">
                <div v-for="(step, idx) in powerOffSteps" :key="idx" class="step-item">
                  <div class="step-number">{{ idx + 1 }}</div>
                  <div class="step-content">
                    <h4>{{ step.title }}</h4>
                    <p>{{ step.desc }}</p>
                    <span v-if="step.warning" class="step-warning">⚠️ {{ step.warning }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="紧急处理" name="emergency">
        <div class="emergency-section">
          <div v-for="(item, idx) in emergencyProcedures" :key="idx" class="emergency-card" :style="{ borderLeftColor: item.color }">
            <div class="emergency-header">
              <span class="emergency-icon">{{ item.icon }}</span>
              <h3>{{ item.title }}</h3>
              <el-tag :type="item.level === 'warning' ? 'warning' : item.level === 'danger' ? 'danger' : 'info'" size="small">
                {{ item.label }}
              </el-tag>
            </div>
            <div class="emergency-steps">
              <ol>
                <li v-for="(step, sIdx) in item.steps" :key="sIdx">{{ step }}</li>
              </ol>
            </div>
            <div class="emergency-prevention">
              <h5>预防措施</h5>
              <p>{{ item.prevention }}</p>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="日常保养" name="maintenance">
        <div class="maintenance-section">
          <div class="maintenance-filters">
            <el-select v-model="maintenanceLevel" placeholder="保养周期" style="width: 160px">
              <el-option label="日常保养" value="daily" />
              <el-option label="周保养" value="weekly" />
              <el-option label="月保养" value="monthly" />
              <el-option label="季度保养" value="quarterly" />
              <el-option label="年度保养" value="yearly" />
            </el-select>
          </div>
          <div class="maintenance-list">
            <div v-for="(item, idx) in filteredMaintenance" :key="idx" class="maintenance-item">
              <div class="maintenance-icon">{{ getMaintenanceIcon(item.level) }}</div>
              <div class="maintenance-content">
                <h4>{{ item.title }}</h4>
                <p>{{ item.description }}</p>
                <div v-if="item.tips" class="maintenance-tips">
                  <span v-for="(tip, tIdx) in item.tips" :key="tIdx" class="tip-tag">{{ tip }}</span>
                </div>
              </div>
              <div class="maintenance-level">
                <span :class="['level-tag', item.level]">{{ getLevelLabel(item.level) }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="报警代码速查" name="alarm">
        <div class="alarm-section">
          <div class="alarm-filter">
            <el-select v-model="selectedSystem" placeholder="选择系统" style="width: 200px">
              <el-option v-for="sys in alarmSystems" :key="sys" :label="sys" :value="sys" />
            </el-select>
            <el-input v-model="searchAlarm" placeholder="搜索报警代码..." clearable style="width: 250px">
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </div>
          <el-table :data="filteredAlarms" border stripe>
            <el-table-column prop="code" label="报警代码" width="140">
              <template #default="{ row }">
                <code class="alarm-code">{{ row.code }}</code>
              </template>
            </el-table-column>
            <el-table-column prop="category" label="分类" width="100">
              <template #default="{ row }">
                <el-tag :type="getCategoryType(row.category)" size="small">{{ row.category }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="message" label="报警信息" min-width="180" />
            <el-table-column prop="cause" label="可能原因" min-width="200" />
            <el-table-column prop="solution" label="解决方法" min-width="200">
              <template #default="{ row }">
                <span class="solution-text">{{ row.solution }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="level" label="等级" width="80">
              <template #default="{ row }">
                <el-tag :type="row.level === '危险' ? 'danger' : row.level === '警告' ? 'warning' : 'info'" size="small">
                  {{ row.level }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import PageHeader from '../components/PageHeader.vue'
import { powerOnSteps, powerOffSteps, emergencyProcedures, maintenanceItems, alarmCodes, alarmSystems } from './data.js'

const activeTab = ref('power')
const maintenanceLevel = ref('')
const selectedSystem = ref('FANUC')
const searchAlarm = ref('')

const filteredMaintenance = computed(() => {
  if (!maintenanceLevel.value) return maintenanceItems
  return maintenanceItems.filter((item) => item.level === maintenanceLevel.value)
})

const filteredAlarms = computed(() => {
  let result = alarmCodes.filter((a) => a.system === selectedSystem.value)
  if (searchAlarm.value) {
    const kw = searchAlarm.value.toLowerCase()
    result = result.filter((a) => a.code.toLowerCase().includes(kw) || a.message.toLowerCase().includes(kw) || a.cause.toLowerCase().includes(kw))
  }
  return result
})

const getCategoryType = (cat) => {
  const types = {
    伺服: 'danger',
    主轴: 'warning',
    刀库: 'warning',
    冷却液: 'info',
    气压: 'info',
    参数: 'warning',
    通讯: 'info',
    电源: 'danger',
  }
  return types[cat] || 'info'
}

const getMaintenanceIcon = (level) => {
  const icons = {
    daily: '📅',
    weekly: '📆',
    monthly: '🗓️',
    quarterly: '📊',
    yearly: '📈',
  }
  return icons[level] || '🔧'
}

const getLevelLabel = (level) => {
  const labels = {
    daily: '日常',
    weekly: '周',
    monthly: '月',
    quarterly: '季度',
    yearly: '年度',
  }
  return labels[level] || ''
}
</script>

<style lang="scss" scoped>
.cnc-safety-container {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  min-height: 100vh;
}

.safety-tabs {
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
    height: 40px;
    line-height: 40px;

    &:hover {
      background: rgba(102, 126, 234, 0.1);
    }
  }

  :deep(.el-tabs__item.is-active) {
    color: #fff;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  :deep(.el-tabs__active-bar) {
    display: none;
  }

  :deep(.el-tabs__content) {
    padding: 16px 8px;
  }
}

.flow-section {
  padding: 0 8px;
}

.flow-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.flow-card {
  background: #f8f9fb;
  border-radius: 12px;
  overflow: hidden;
}

.flow-header {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;

  .flow-icon {
    font-size: 28px;
  }

  h3 {
    margin: 0;
    font-size: 18px;
  }

  &.power-on {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  }

  &.power-off {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  }
}

.flow-steps {
  padding: 16px;
}

.step-item {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px dashed #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
}

.step-number {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  background: #667eea;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}

.step-content {
  flex: 1;

  h4 {
    margin: 0 0 4px;
    font-size: 14px;
    color: #2d3748;
  }

  p {
    margin: 0;
    font-size: 13px;
    color: #718096;
    line-height: 1.5;
  }
}

.step-warning {
  display: inline-block;
  margin-top: 4px;
  font-size: 12px;
  color: #f59e0b;
  font-weight: 500;
}

.emergency-section {
  padding: 0 8px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 20px;
}

.emergency-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 20px;
  border-left: 4px solid;
}

.emergency-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;

  .emergency-icon {
    font-size: 28px;
  }

  h3 {
    flex: 1;
    margin: 0;
    font-size: 17px;
    color: #2d3748;
  }
}

.emergency-steps ol {
  margin: 0;
  padding-left: 20px;
  margin-bottom: 16px;

  li {
    font-size: 13px;
    color: #4a5568;
    line-height: 1.8;
  }
}

.emergency-prevention {
  background: #f0fdf4;
  border-radius: 8px;
  padding: 12px 16px;

  h5 {
    margin: 0 0 4px;
    font-size: 13px;
    color: #15803d;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: #166534;
  }
}

.maintenance-section {
  padding: 0 8px;
}

.maintenance-filters {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.maintenance-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.maintenance-item {
  display: flex;
  gap: 16px;
  background: #fff;
  border-radius: 10px;
  padding: 16px 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  align-items: flex-start;

  .maintenance-icon {
    font-size: 32px;
    flex-shrink: 0;
  }

  .maintenance-content {
    flex: 1;

    h4 {
      margin: 0 0 4px;
      font-size: 15px;
      color: #2d3748;
    }

    p {
      margin: 0;
      font-size: 13px;
      color: #718096;
      line-height: 1.6;
    }
  }

  .maintenance-tips {
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .tip-tag {
    font-size: 11px;
    background: #e0e7ff;
    color: #3730a3;
    padding: 2px 8px;
    border-radius: 4px;
  }

  .maintenance-level {
    flex-shrink: 0;
  }

  .level-tag {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;

    &.daily {
      background: #dbeafe;
      color: #1e40af;
    }

    &.weekly {
      background: #fef3c7;
      color: #92400e;
    }

    &.monthly {
      background: #e0e7ff;
      color: #3730a3;
    }

    &.quarterly {
      background: #d1fae5;
      color: #065f46;
    }

    &.yearly {
      background: #fce7f3;
      color: #9d174d;
    }
  }
}

.alarm-section {
  padding: 0 8px;
}

.alarm-filter {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.alarm-code {
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-family: 'Courier New', monospace;
  color: #dc2626;
}

.solution-text {
  font-size: 13px;
  color: #4a5568;
  line-height: 1.5;
}

:deep(.el-table) {
  border-radius: 10px;
  overflow: hidden;
}

:deep(.el-table th) {
  background: #f7fafc !important;
  color: #2d3748;
  font-weight: 600;
}
</style>
