<template>
  <div class="tool-life-calculator">
    <div class="formula-banner">
      <div class="formula-title">Taylor 刀具寿命公式</div>
      <div class="formula-content">
        <span class="formula-text">V × T<sup>n</sup> = C</span>
      </div>
      <div class="formula-legend">
        <span><strong>V</strong> — 切削速度 (m/min)</span>
        <span><strong>T</strong> — 刀具寿命 (min)</span>
        <span><strong>n</strong> — 刀具寿命指数</span>
        <span><strong>C</strong> — 工件材料系数</span>
      </div>
    </div>

    <el-tabs v-model="activeTab" class="life-subtabs">
      <el-tab-pane label="刀具寿命估算" name="life">
        <div class="calc-panel">
          <div class="input-section">
            <div class="section-title">输入参数</div>
            <div class="form-grid">
              <div class="form-item">
                <label>刀具材料</label>
                <el-select v-model="selectedTool" placeholder="选择刀具材料">
                  <el-option v-for="tool in toolMaterials" :key="tool.code" :label="tool.name" :value="tool" />
                </el-select>
              </div>
              <div class="form-item">
                <label>工件材料</label>
                <el-select v-model="selectedWorkpiece" placeholder="选择工件材料">
                  <el-option v-for="mat in workpieceMaterials" :key="mat.code" :label="mat.name" :value="mat" />
                </el-select>
              </div>
              <div class="form-item"><label>切削速度 V (m/min)</label><el-input-number v-model="cuttingSpeed" :min="1" :max="5000" :step="10" /></div>
              <div class="form-item"><label>进给量 f (mm/r)</label><el-input-number v-model="feedRate" :min="0.01" :max="5" :step="0.05" :precision="2" /></div>
              <div class="form-item"><label>切深 ap (mm)</label><el-input-number v-model="depth" :min="0.1" :max="20" :step="0.5" :precision="1" /></div>
              <div class="form-item"><label>刀具直径 D (mm)</label><el-input-number v-model="toolDiameter" :min="1" :max="100" :step="1" /></div>
              <div class="form-item"><label>加工时间 t (min/件)</label><el-input-number v-model="partTime" :min="0.5" :max="100" :step="0.5" /></div>
            </div>
            <el-button type="primary" @click="calculateLife">计算刀具寿命</el-button>
          </div>

          <div v-if="calculated" class="result-section">
            <div class="result-card">
              <div class="result-item main">
                <span class="result-label">估算刀具寿命 T</span>
                <span class="result-value">{{ toolLife.toFixed(1) }}</span>
                <span class="result-unit">min</span>
              </div>
              <div class="result-item">
                <span class="result-label">可加工件数</span><span class="result-value">{{ partsCount.toFixed(0) }}</span
                ><span class="result-unit">件</span>
              </div>
              <div class="result-item">
                <span class="result-label">建议换刀时间</span><span class="result-value">{{ changeTime.toFixed(1) }}</span
                ><span class="result-unit">min</span>
              </div>
              <div class="result-item">
                <span class="result-label">切削参数修正系数</span><span class="result-value">{{ correctionFactor.toFixed(2) }}</span>
              </div>
            </div>
            <div class="advice-card">
              <h4>工艺建议</h4>
              <ul>
                <li v-for="(tip, idx) in tips" :key="idx">{{ tip }}</li>
              </ul>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="切削速度推荐" name="speed">
        <div class="speed-panel">
          <div class="section-title">推荐切削速度参考</div>
          <el-table :data="speedRecommendations" border stripe>
            <el-table-column prop="material" label="工件材料" width="150" />
            <el-table-column label="切削速度 V (m/min)" align="center">
              <el-table-column prop="rough" label="粗加工" align="center" />
              <el-table-column prop="finish" label="精加工" align="center" />
            </el-table-column>
            <el-table-column prop="note" label="说明" min-width="200" />
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { toolMaterials, workpieceMaterials } from './data.js'

const activeTab = ref('life')
const selectedTool = ref(null),
  selectedWorkpiece = ref(null)
const cuttingSpeed = ref(100),
  feedRate = ref(0.2),
  depth = ref(1)
const toolDiameter = ref(10),
  partTime = ref(5)
const calculated = ref(false),
  toolLife = ref(0)

const calculateLife = () => {
  if (!selectedTool.value || !selectedWorkpiece.value) return
  const n = selectedTool.value.n,
    c = selectedTool.value.c,
    v = cuttingSpeed.value
  if (v <= 0) {
    calculated.value = false
    return
  }
  const baseLife = Math.pow(c / v, 1 / n)
  const materialFactor = getMaterialFactor(selectedWorkpiece.value.code)
  const feedFactor = getFeedFactor(feedRate.value)
  const depthFactor = getDepthFactor(depth.value)
  const diamFactor = getDiameterFactor(toolDiameter.value)
  toolLife.value = baseLife * materialFactor * feedFactor * depthFactor * diamFactor
  calculated.value = true
}

const getMaterialFactor = (code) => {
  const factors = { 304: 0.6, '316L': 0.5, '40Cr': 0.85, TC4: 0.4, 淬火钢HRC50: 0.5, 淬火钢HRC60: 0.35, HT200: 1.1, QT600: 1, 6061: 1.5, 7075: 1.3, T2: 1.4, H62: 1.5, '20CrMnTi': 0.9 }
  return factors[code] || 1
}
const getFeedFactor = (f) => (f <= 0.15 ? 1.2 : f <= 0.3 ? 1 : f <= 0.5 ? 0.85 : 0.7)
const getDepthFactor = (ap) => (ap <= 1 ? 1.1 : ap <= 3 ? 1 : ap <= 5 ? 0.85 : 0.7)
const getDiameterFactor = (d) => (d <= 6 ? 1.2 : d <= 12 ? 1 : d <= 20 ? 0.9 : 0.8)

const partsCount = computed(() => (calculated.value && partTime.value > 0 ? toolLife.value / partTime.value : 0))
const changeTime = computed(() => (calculated.value ? toolLife.value * 0.8 : 0))
const correctionFactor = computed(() => {
  if (!calculated.value) return 1
  return getFeedFactor(feedRate.value) * getDepthFactor(depth.value)
})
const tips = computed(() => {
  if (!calculated.value) return []
  const result = []
  if (cuttingSpeed.value > selectedTool.value.c * 0.8) result.push('切削速度较高，注意刀具磨损')
  if (feedRate.value > 0.3) result.push('建议使用涂层刀具以提高耐磨性')
  if (selectedWorkpiece.value.code.includes('不锈钢') || selectedWorkpiece.value.code.includes('钛')) {
    result.push('使用切削液，降低切削温度')
    result.push('采用硬质合金或陶瓷刀具')
  }
  if (toolLife.value < 30) result.push('刀具寿命较短，建议优化切削参数')
  if (partsCount.value > 0 && partsCount.value < 10) result.push('单件加工时间较长，建议批量生产时合理排产')
  return result
})

const speedRecommendations = [
  { material: '45#/40Cr 钢', rough: '80~120 m/min', finish: '120~180 m/min', note: '硬质合金涂层刀具' },
  { material: '304/316L 不锈钢', rough: '40~60 m/min', finish: '60~100 m/min', note: '低速大进给，使用切削液' },
  { material: 'HT200 灰铸铁', rough: '60~80 m/min', finish: '80~120 m/min', note: 'YG类硬质合金' },
  { material: '6061/7075 铝合金', rough: '200~400 m/min', finish: '400~800 m/min', note: '高速切削，干切或气吹' },
  { material: '铜合金', rough: '150~300 m/min', finish: '300~600 m/min', note: '锋利刀具，防粘结' },
  { material: '淬硬钢(HRC50+)', rough: '30~50 m/min', finish: '50~80 m/min', note: 'CBN 或陶瓷刀具' },
  { material: '钛合金 TC4', rough: '20~40 m/min', finish: '40~60 m/min', note: '低速小进给，充分冷却' },
]
</script>

<style lang="scss" scoped>
.tool-life-calculator {
  .life-subtabs {
    background: transparent;
  }
}
.formula-banner {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  color: #fff;
  .formula-title {
    font-size: 15px;
    opacity: 0.9;
    margin-bottom: 10px;
  }
  .formula-content {
    text-align: center;
    margin-bottom: 12px;
    .formula-text {
      font-family: 'Courier New', monospace;
      font-size: 28px;
      font-weight: 700;
      background: rgba(255, 255, 255, 0.15);
      padding: 12px 30px;
      border-radius: 10px;
    }
  }
  .formula-legend {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    font-size: 13px;
    span {
      opacity: 0.9;
    }
  }
}
.calc-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
@media (max-width: 900px) {
  .calc-panel {
    grid-template-columns: 1fr;
  }
}
.input-section,
.result-section {
  background: #f8f9fb;
  border-radius: 12px;
  padding: 24px;
}
.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 16px;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  margin-bottom: 16px;
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
.result-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}
.result-item {
  background: #fff;
  border-radius: 10px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  &.main {
    grid-column: span 2;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
    .result-label,
    .result-unit {
      color: rgba(255, 255, 255, 0.9);
    }
  }
  .result-label {
    font-size: 12px;
    color: #718096;
  }
  .result-value {
    font-size: 22px;
    font-weight: 700;
    color: #2d3748;
  }
  .result-unit {
    font-size: 13px;
    color: #94a3b8;
  }
}
.advice-card {
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
.speed-panel {
  .section-title {
    margin-bottom: 16px;
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
}
</style>
