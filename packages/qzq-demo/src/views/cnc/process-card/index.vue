<template>
  <div class="process-card-container">
    <PageHeader />

    <div class="card-selector">
      <div v-for="card in processCards" :key="card.key" :class="['selector-card', { active: activeCard === card.key }]" @click="activeCard = card.key">
        <div class="card-icon">{{ card.icon }}</div>
        <div class="card-info">
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
        </div>
      </div>
    </div>

    <div v-if="currentCard" class="card-detail">
      <div class="detail-header">
        <div class="detail-title">
          <span class="detail-icon">{{ currentCard.icon }}</span>
          <h2>{{ currentCard.title }}工艺卡</h2>
        </div>
        <div class="detail-meta">
          <div class="meta-item">
            <span class="meta-label">材料</span>
            <span class="meta-value">{{ currentCard.material }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">热处理</span>
            <span class="meta-value">{{ currentCard.hardness }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">精度</span>
            <span class="meta-value">{{ currentCard.tolerance }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">表面粗糙度</span>
            <span class="meta-value">{{ currentCard.roughness }}</span>
          </div>
          <el-button type="success" @click="exportCard">导出 Markdown</el-button>
        </div>
      </div>

      <div class="stage-tabs">
        <div v-for="stage in stages" :key="stage.key" :class="['stage-tab', { active: activeStage === stage.key, disabled: !getStageProcesses(stage.key).length }]" @click="activeStage = stage.key">
          <span class="stage-icon">{{ stage.icon }}</span>
          <span class="stage-label">{{ stage.label }}</span>
          <span v-if="getStageProcesses(stage.key).length" class="stage-count">{{ getStageProcesses(stage.key).length }}</span>
        </div>
      </div>

      <div class="process-list">
        <div v-for="(process, index) in getStageProcesses(activeStage)" :key="index" class="process-item">
          <div class="process-seq">{{ process.seq }}</div>
          <div class="process-content">
            <div class="process-main">
              <div class="process-title">
                <span class="op-name">{{ process.operation }}</span>
                <span class="op-stage">{{ getStageLabel(process.stage) }}</span>
              </div>
              <div class="process-machine">{{ process.machine }}</div>
            </div>
            <div class="process-details">
              <div class="detail-item">
                <span class="detail-label">刀具</span>
                <span class="detail-value">{{ process.tool }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">切削参数</span>
                <span class="detail-value">{{ process.params }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">工时</span>
                <span class="detail-value highlight">{{ process.time }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">备注</span>
                <span class="detail-value">{{ process.note }}</span>
              </div>
            </div>
          </div>
        </div>
        <el-empty v-if="getStageProcesses(activeStage).length === 0" description="该阶段暂无工序" />
      </div>

      <div class="summary-section">
        <div class="summary-card">
          <div class="summary-icon">⏱️</div>
          <div class="summary-info">
            <span class="summary-label">总工序数</span>
            <span class="summary-value">{{ totalProcesses }} 道</span>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">📊</div>
          <div class="summary-info">
            <span class="summary-label">预计总工时</span>
            <span class="summary-value">{{ totalTime }}</span>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">🔧</div>
          <div class="summary-info">
            <span class="summary-label">涉及设备</span>
            <span class="summary-value">{{ machineCount }} 台</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import { processCards } from './data.js'
import { ElMessage } from 'element-plus'

const stages = [
  { key: '下料', label: '下料', icon: '✂️' },
  { key: '粗加工', label: '粗加工', icon: '🔨' },
  { key: '半精加工', label: '半精加工', icon: '⚙️' },
  { key: '精加工', label: '精加工', icon: '✨' },
  { key: '热处理', label: '热处理', icon: '🔥' },
  { key: '检验', label: '检验', icon: '🔍' },
]

const activeCard = ref('shaft')
const activeStage = ref('下料')

const currentCard = computed(() => {
  return processCards.find((c) => c.key === activeCard.value)
})

const getStageProcesses = (stageKey) => {
  if (!currentCard.value) return []
  return currentCard.value.processes.filter((p) => p.stage === stageKey)
}

const getStageLabel = (stageKey) => {
  const s = stages.find((s) => s.key === stageKey)
  return s ? s.icon + ' ' + s.label : stageKey
}

const totalProcesses = computed(() => {
  return currentCard.value?.processes.length || 0
})

const totalTime = computed(() => {
  if (!currentCard.value) return '0 min'
  let totalMin = 0
  for (const p of currentCard.value.processes) {
    const t = p.time
    const num = parseFloat(t)
    if (isNaN(num)) continue
    if (t.includes('h')) {
      totalMin += num * 60
    } else {
      totalMin += num
    }
  }
  const hours = Math.floor(totalMin / 60)
  const mins = totalMin % 60
  return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`
})

const machineCount = computed(() => {
  if (!currentCard.value) return 0
  const machines = new Set()
  for (const p of currentCard.value.processes) {
    if (p.machine && p.machine !== '—') {
      machines.add(p.machine)
    }
  }
  return machines.size
})

const exportCard = () => {
  if (!currentCard.value) return
  let md = `# ${currentCard.value.title}工艺卡\n\n`
  md += `> ${currentCard.value.description}\n\n`
  md += `| 项目 | 内容 |\n|------|------|\n`
  md += `| 材料 | ${currentCard.value.material} |\n`
  md += `| 热处理/硬度 | ${currentCard.value.hardness} |\n`
  md += `| 精度 | ${currentCard.value.tolerance} |\n`
  md += `| 表面粗糙度 | ${currentCard.value.roughness} |\n\n`
  md += `## 工艺流程\n\n`

  for (const stage of stages) {
    const procs = getStageProcesses(stage.key)
    if (procs.length === 0) continue
    md += `### ${stage.label}\n\n`
    md += `| 序号 | 工序 | 设备 | 刀具 | 切削参数 | 工时 | 备注 |\n`
    md += `|------|------|------|------|----------|------|------|\n`
    for (const p of procs) {
      md += `| ${p.seq} | ${p.operation} | ${p.machine} | ${p.tool} | ${p.params} | ${p.time} | ${p.note} |\n`
    }
    md += `\n`
  }

  md += `## 汇总\n\n`
  md += `- **总工序数**: ${totalProcesses.value} 道\n`
  md += `- **预计总工时**: ${totalTime.value}\n`
  md += `- **涉及设备**: ${machineCount.value} 台\n`

  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${currentCard.value.title}工艺卡.md`
  a.click()
  URL.revokeObjectURL(url)
  ElMessage.success('导出成功')
}
</script>

<style lang="scss" scoped>
.process-card-container {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  min-height: 100vh;
}

.card-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.selector-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }

  &.active {
    border-color: #667eea;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.2);
  }

  .card-icon {
    font-size: 36px;
    flex-shrink: 0;
  }

  .card-info {
    h3 {
      margin: 0 0 6px;
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }

    p {
      margin: 0;
      font-size: 13px;
      color: #888;
      line-height: 1.5;
    }
  }
}

.card-detail {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
  flex-wrap: wrap;
  gap: 16px;
}

.detail-title {
  display: flex;
  align-items: center;
  gap: 12px;

  .detail-icon {
    font-size: 32px;
  }

  h2 {
    margin: 0;
    font-size: 22px;
    color: #333;
  }
}

.detail-meta {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;

  .meta-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    padding: 8px 16px;
    background: #f8f9fb;
    border-radius: 8px;
  }

  .meta-label {
    font-size: 12px;
    color: #909399;
  }

  .meta-value {
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }
}

.stage-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  background: #f8f9fb;
  border-radius: 8px;
  padding: 6px;
  overflow-x: auto;
}

.stage-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
  color: #606266;
  white-space: nowrap;

  &.active {
    color: #fff;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  }

  &.disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:hover:not(.disabled):not(.active) {
    background: rgba(102, 126, 234, 0.1);
  }

  .stage-count {
    background: rgba(255, 255, 255, 0.3);
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 12px;
  }

  &:not(.active) .stage-count {
    background: rgba(102, 126, 234, 0.15);
    color: #667eea;
  }
}

.process-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.process-item {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: #fafbff;
  border-radius: 12px;
  border: 1px solid #e8f0fe;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    transform: translateX(4px);
    border-color: #d6e4ff;
  }
}

.process-seq {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
  font-size: 16px;
}

.process-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.process-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.process-title {
  display: flex;
  align-items: center;
  gap: 10px;

  .op-name {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .op-stage {
    font-size: 12px;
    padding: 2px 8px;
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
    border-radius: 4px;
  }
}

.process-machine {
  font-size: 13px;
  color: #909399;
}

.process-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 12px;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #f0f0f0;

  .detail-label {
    font-size: 12px;
    color: #909399;
  }

  .detail-value {
    font-size: 13px;
    color: #333;
    line-height: 1.5;

    &.highlight {
      color: #667eea;
      font-weight: 600;
    }
  }
}

.summary-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.summary-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  border-radius: 12px;

  .summary-icon {
    font-size: 32px;
  }

  .summary-info {
    display: flex;
    flex-direction: column;
    gap: 4px;

    .summary-label {
      font-size: 13px;
      color: #909399;
    }

    .summary-value {
      font-size: 20px;
      font-weight: 600;
      color: #333;
    }
  }
}
</style>
