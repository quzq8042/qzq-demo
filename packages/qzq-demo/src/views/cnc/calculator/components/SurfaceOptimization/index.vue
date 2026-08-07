<template>
  <div class="surface-optimization">
    <el-tabs v-model="activeTab" class="opt-subtabs">
      <el-tab-pane label="步距计算器" name="step">
        <div class="calc-panel">
          <div class="input-panel">
            <div class="panel-title">曲面加工参数优化</div>
            <div class="form-section">
              <div class="form-grid">
                <div class="form-item">
                  <label>球刀半径 R (mm)</label>
                  <el-input-number v-model="ballRadius" :min="0.5" :max="50" :step="0.5" />
                </div>
                <div class="form-item">
                  <label>曲面曲率半径 Rc (mm)</label>
                  <el-input-number v-model="curvatureRadius" :min="5" :max="1000" :step="10" />
                </div>
                <div class="form-item">
                  <label>目标残余高度 h (mm)</label>
                  <el-input-number v-model="residualHeight" :min="0.001" :max="0.1" :step="0.005" :precision="4" />
                </div>
                <div class="form-item">
                  <label>表面类型</label>
                  <el-select v-model="surfaceType">
                    <el-option label="凸曲面" value="convex" />
                    <el-option label="凹曲面" value="concave" />
                    <el-option label="平面" value="flat" />
                  </el-select>
                </div>
                <div class="form-item">
                  <label>加工策略</label>
                  <el-select v-model="machiningStrategy">
                    <el-option v-for="s in strategies" :key="s.name" :label="s.name" :value="s.name" />
                  </el-select>
                </div>
              </div>
              <el-button type="primary" size="large" @click="calculate">计算参数</el-button>
            </div>
          </div>

          <div v-if="calculated" class="result-panel">
            <div class="result-grid">
              <div class="result-card highlight">
                <div class="result-label">优化步距 S</div>
                <div class="result-value">{{ optimalStep.toFixed(3) }}</div>
                <div class="result-unit">mm</div>
              </div>
              <div class="result-card">
                <div class="result-label">每圈加工时间</div>
                <div class="result-value">{{ processingTime.toFixed(2) }}</div>
                <div class="result-unit">min</div>
              </div>
              <div class="result-card">
                <div class="result-label">加工效率</div>
                <div class="result-value">{{ efficiency.toFixed(1) }}</div>
                <div class="result-unit">%</div>
              </div>
              <div class="result-card">
                <div class="result-label">表面质量等级</div>
                <div class="result-value">{{ surfaceGrade }}</div>
              </div>
            </div>

            <div class="visual-section">
              <div class="section-title">参数可视化</div>
              <div class="bar-chart">
                <div class="bar-item">
                  <div class="bar-label">步距占比</div>
                  <div class="bar-wrapper"><div class="bar" :style="{ width: stepRatio + '%' }"></div></div>
                  <span class="bar-value">{{ stepRatio.toFixed(1) }}%</span>
                </div>
                <div class="bar-item">
                  <div class="bar-label">效率对比</div>
                  <div class="bar-wrapper"><div class="bar efficiency" :style="{ width: efficiency.toFixed(0) + '%' }"></div></div>
                  <span class="bar-value">{{ efficiency.toFixed(1) }}%</span>
                </div>
              </div>
            </div>

            <div class="recommendation">
              <h4>优化建议</h4>
              <ul>
                <li v-for="(rec, idx) in recommendations" :key="idx">{{ rec }}</li>
              </ul>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="加工时间估算" name="time">
        <div class="time-panel">
          <div class="panel-title">加工时间快速估算</div>
          <div class="form-grid">
            <div class="form-item"><label>加工面积 A (mm²)</label><el-input-number v-model="area" :min="1" :max="1000000" :step="100" /></div>
            <div class="form-item"><label>优化步距 S (mm)</label><el-input-number v-model="stepForTime" :min="0.01" :max="20" :step="0.1" :precision="2" /></div>
            <div class="form-item"><label>进给速度 F (mm/min)</label><el-input-number v-model="feedSpeed" :min="100" :max="10000" :step="100" /></div>
            <div class="form-item"><label>加工深度 Z (mm)</label><el-input-number v-model="machiningDepth" :min="0.1" :max="50" :step="0.5" :precision="1" /></div>
            <div class="form-item"><label>每层加工时间占比 (%)</label><el-input-number v-model="layerRatio" :min="50" :max="100" :step="5" /></div>
          </div>
          <el-button type="primary" size="large" @click="calculateTime">估算加工时间</el-button>
          <div v-if="timeCalculated" class="time-result">
            <div class="result-row">
              <span class="label">单层加工时间:</span><span class="value">{{ layerTime.toFixed(2) }} min</span>
            </div>
            <div class="result-row">
              <span class="label">总加工时间 (估算):</span><span class="value highlight">{{ totalTime.toFixed(2) }} min</span>
            </div>
            <div class="result-row">
              <span class="label">优化后节省时间:</span><span class="value save">节省约 {{ savedPercent.toFixed(1) }}%</span>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { millingStrategy } from './data.js'

const activeTab = ref('step')
const ballRadius = ref(3),
  curvatureRadius = ref(100),
  residualHeight = ref(0.01)
const surfaceType = ref('convex'),
  machiningStrategy = ref('平行铣削')
const area = ref(10000),
  stepForTime = ref(2),
  feedSpeed = ref(3000)
const machiningDepth = ref(5),
  layerRatio = ref(70)
const strategies = millingStrategy
const calculated = ref(false),
  timeCalculated = ref(false)
const optimalStep = ref(0),
  processingTime = ref(0),
  efficiency = ref(0)
const layerTime = ref(0),
  totalTime = ref(0),
  savedPercent = ref(0)

const calculate = () => {
  const R = ballRadius.value,
    h = residualHeight.value,
    Rc = curvatureRadius.value
  let correctionFactor = 1
  if (surfaceType.value === 'convex') correctionFactor = Math.sqrt(1 + R / Rc)
  else if (surfaceType.value === 'concave') correctionFactor = Math.max(0.5, 1 - R / (Rc * 2))
  let step = 2 * Math.sqrt(2 * R * h - h * h)
  if (surfaceType.value === 'convex') step *= correctionFactor
  if (surfaceType.value === 'concave') step /= correctionFactor
  step = Math.max(0.01, step)
  const diameter = R * 2
  const stepRatioPercent = (step / diameter) * 100
  const optimalStepRatio = Math.min(stepRatioPercent, 25)
  optimalStep.value = (optimalStepRatio / 100) * diameter
  const traditionalStep = diameter * 0.1
  efficiency.value = (optimalStep.value / traditionalStep) * 100
  efficiency.value = Math.min(100, Math.max(40, efficiency.value))
  const toolpathLength = 2 * Math.sqrt(area.value * Math.PI)
  processingTime.value = (toolpathLength / (feedSpeed.value * optimalStep.value)) * 0.8
  calculated.value = true
}

const stepRatio = computed(() => (calculated.value ? (optimalStep.value / (ballRadius.value * 2)) * 100 : 0))
const surfaceGrade = computed(() => {
  if (!calculated.value) return '-'
  const h = residualHeight.value
  if (h < 0.005) return 'N2 (Ra 0.025)'
  if (h < 0.01) return 'N3 (Ra 0.05)'
  if (h < 0.02) return 'N4 (Ra 0.1)'
  if (h < 0.04) return 'N5 (Ra 0.2)'
  if (h < 0.08) return 'N6 (Ra 0.4)'
  return 'N7 (Ra 0.8)'
})
const recommendations = computed(() => {
  if (!calculated.value) return []
  const recs = []
  if (stepRatio.value > 25) recs.push('步距偏大，建议减小以保证表面质量')
  else if (stepRatio.value < 10) recs.push('步距可适当增大，提高加工效率')
  if (ballRadius.value < 3 && residualHeight.value < 0.005) recs.push('建议使用更大球刀以提高效率')
  if (surfaceType.value === 'concave') recs.push('凹曲面需注意刀具干涉检查')
  recs.push('建议使用等高铣削策略，保证切削载荷均匀')
  return recs
})

const calculateTime = () => {
  const step = stepForTime.value,
    areaVal = area.value,
    feed = feedSpeed.value
  const zDepth = machiningDepth.value,
    ratio = layerRatio.value
  const toolpathLength = areaVal / step
  const layerTimeVal = (toolpathLength / feed) * 60
  layerTime.value = layerTimeVal
  const numLayers = Math.ceil(zDepth / 0.3)
  totalTime.value = (layerTimeVal * numLayers) / (ratio / 100)
  const traditionalStep = ballRadius.value * 2 * 0.1
  const traditionalTime = ((areaVal / traditionalStep / feed) * 60 * numLayers) / (ratio / 100)
  savedPercent.value = ((traditionalTime - totalTime.value) / traditionalTime) * 100
  timeCalculated.value = true
}
</script>

<style lang="scss" scoped>
.surface-optimization {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.opt-subtabs {
  background: transparent;

  :deep(.el-tabs__header) {
    margin-bottom: 20px;
  }

  :deep(.el-tabs__item) {
    font-weight: 500;
  }
}

.calc-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.input-panel,
.time-panel {
  background: #f8f9fb;
  border-radius: 12px;
  padding: 24px;
}

.panel-title {
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 20px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 13px;
    color: #4a5568;
    font-weight: 500;
  }
}

.form-section .el-button {
  align-self: flex-start;
}

.result-panel {
  background: #f8f9fb;
  border-radius: 12px;
  padding: 24px;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.result-card {
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  transition: all 0.3s;

  &.highlight {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    .result-label,
    .result-unit {
      color: rgba(255, 255, 255, 0.85);
    }
    .result-value {
      color: #fff;
    }
  }
}

.result-label {
  font-size: 13px;
  color: #909399;
  margin-bottom: 6px;
}

.result-value {
  font-size: 22px;
  font-weight: 600;
  color: #303133;
}

.result-unit {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}

.visual-section {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 16px;
}

.bar-chart {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.bar-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bar-label {
  width: 90px;
  font-size: 13px;
  color: #606266;
}

.bar-wrapper {
  flex: 1;
  height: 12px;
  background: #e8e8e8;
  border-radius: 6px;
  overflow: hidden;
}

.bar {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 6px;
  transition: width 0.5s ease;

  &.efficiency {
    background: linear-gradient(90deg, #52c41a, #73d13d);
  }
}

.bar-value {
  width: 60px;
  font-size: 13px;
  color: #606266;
  text-align: right;
}

.recommendation {
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 10px;
  padding: 16px;

  h4 {
    margin: 0 0 10px;
    font-size: 14px;
    color: #92400e;
  }

  ul {
    margin: 0;
    padding-left: 20px;

    li {
      font-size: 13px;
      color: #78350f;
      line-height: 1.8;
    }
  }
}

.time-panel {
  .form-grid {
    grid-template-columns: 1fr 1fr;
    margin-bottom: 16px;
  }

  .el-button {
    margin-bottom: 20px;
  }
}

.time-result {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
}

.result-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px dashed #e8e8e8;

  &:last-child {
    border-bottom: none;
  }

  .label {
    font-size: 14px;
    color: #606266;
  }

  .value {
    font-size: 16px;
    font-weight: 600;
    color: #303133;

    &.highlight {
      color: #667eea;
      font-size: 18px;
    }

    &.save {
      color: #52c41a;
    }
  }
}

:deep(.el-select) {
  width: 100%;
}

:deep(.el-input-number) {
  width: 100%;
}

@media (max-width: 900px) {
  .calc-panel {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
