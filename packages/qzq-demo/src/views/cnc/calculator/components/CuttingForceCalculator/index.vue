<template>
  <div class="calculator-panel">
    <div class="shape-toggle">
      <el-button type="primary" class="reset-btn" @click="handleReset">重置</el-button>
    </div>

    <div class="rule-note">
      <div class="note-title">💡 计算公式说明</div>
      <ul class="note-list">
        <li>主切削力 Fc = Kc × ap × fz × z / 1000 (N)</li>
        <li>进给力 Ff = (0.2 ~ 0.6) × Fc (N)，取 0.4 × Fc</li>
        <li>切削功率 Pc = Fc × Vc / (60 × 1000 × 1000) (kW)，Vc 单位为 mm/min</li>
        <li>主轴扭矩 T = Fc × D / (2000) (N·m)，D为刀具直径(mm)</li>
      </ul>
    </div>

    <div class="input-section">
      <div class="form-row">
        <div class="form-item">
          <label class="form-label">工件材料</label>
          <el-select v-model="material" placeholder="请选择材料" @change="handleMaterialChange">
            <el-option label="铝合金 (Kc=700)" value="aluminum" />
            <el-option label="碳钢 (Kc=1400)" value="carbonSteel" />
            <el-option label="不锈钢 (Kc=1800)" value="stainlessSteel" />
            <el-option label="铸铁 (Kc=900)" value="castIron" />
            <el-option label="铜 (Kc=500)" value="copper" />
            <el-option label="PVC/塑料 (Kc=200)" value="plastic" />
            <el-option label="自定义" value="custom" />
          </el-select>
        </div>
        <div class="form-item">
          <label class="form-label">切削比能 Kc</label>
          <div class="input-wrapper">
            <el-input v-model.number="kc" type="number" placeholder="请输入Kc" :disabled="material !== 'custom'" />
            <span class="unit">N/mm²</span>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-item">
          <label class="form-label">刀具直径 D</label>
          <div class="input-wrapper">
            <el-input v-model.number="toolDiameter" type="number" placeholder="请输入刀具直径" />
            <span class="unit">mm</span>
          </div>
        </div>
        <div class="form-item">
          <label class="form-label">切削深度 ap</label>
          <div class="input-wrapper">
            <el-input v-model.number="cutDepth" type="number" placeholder="请输入切削深度" />
            <span class="unit">mm</span>
          </div>
        </div>
        <div class="form-item">
          <label class="form-label">每齿进给量 fz</label>
          <div class="input-wrapper">
            <el-input v-model.number="feedPerTooth" type="number" placeholder="请输入fz" />
            <span class="unit">mm/z</span>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-item">
          <label class="form-label">齿数 z</label>
          <div class="input-wrapper">
            <el-input v-model.number="teethCount" type="number" placeholder="请输入齿数" min="1" />
            <span class="unit">齿</span>
          </div>
        </div>
        <div class="form-item">
          <label class="form-label">切削速度 Vc</label>
          <div class="input-wrapper">
            <el-input v-model.number="cutSpeed" type="number" placeholder="请输入切削速度" />
            <span class="unit">mm/min</span>
          </div>
        </div>
      </div>
    </div>

    <div class="result-section">
      <div class="result-card">
        <div class="result-item">
          <span class="result-label">主切削力 Fc</span>
          <span class="result-value">{{ mainCuttingForce.toFixed(2) }}</span>
          <span class="result-unit">N</span>
        </div>
        <div class="result-item">
          <span class="result-label">进给力 Ff</span>
          <span class="result-value">{{ feedForce.toFixed(2) }}</span>
          <span class="result-unit">N</span>
        </div>
        <div class="result-item highlight">
          <span class="result-label">切削功率 Pc</span>
          <span class="result-value">{{ cuttingPower.toFixed(3) }}</span>
          <span class="result-unit">kW</span>
        </div>
        <div class="result-item highlight">
          <span class="result-label">主轴扭矩 T</span>
          <span class="result-value">{{ spindleTorque.toFixed(3) }}</span>
          <span class="result-unit">N·m</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const material = ref('aluminum')
const kc = ref(700)
const toolDiameter = ref(10)
const cutDepth = ref(1)
const feedPerTooth = ref(0.1)
const teethCount = ref(3)
const cutSpeed = ref(150000)

const kcMap = {
  aluminum: 700,
  carbonSteel: 1400,
  stainlessSteel: 1800,
  castIron: 900,
  copper: 500,
  plastic: 200,
}

const handleMaterialChange = () => {
  if (material.value !== 'custom' && kcMap[material.value]) {
    kc.value = kcMap[material.value]
  }
}

const mainCuttingForce = computed(() => {
  if (!kc.value || !cutDepth.value || !feedPerTooth.value || !teethCount.value) return 0
  return (kc.value * cutDepth.value * feedPerTooth.value * teethCount.value) / 1000
})

const feedForce = computed(() => {
  return mainCuttingForce.value * 0.4
})

const cuttingPower = computed(() => {
  if (!cutSpeed.value) return 0
  return (mainCuttingForce.value * cutSpeed.value) / (60 * 1000 * 1000)
})

const spindleTorque = computed(() => {
  if (!toolDiameter.value) return 0
  return (mainCuttingForce.value * toolDiameter.value) / 2000
})

const handleReset = () => {
  material.value = 'aluminum'
  kc.value = 700
  toolDiameter.value = 10
  cutDepth.value = 1
  feedPerTooth.value = 0.1
  teethCount.value = 3
  cutSpeed.value = 150000
}
</script>

<style lang="scss" scoped>
.calculator-panel {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.shape-toggle {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e8e8e8;
}

.reset-btn {
  margin-left: auto;
}

.rule-note {
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;

  .note-title {
    font-size: 14px;
    font-weight: 500;
    color: #52c41a;
    margin-bottom: 12px;
  }

  .note-list {
    margin: 0;
    padding-left: 20px;
    font-size: 13px;
    color: #666;
    line-height: 1.8;
  }
}

.input-section {
  margin-bottom: 24px;
}

.form-row {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.form-item {
  flex: 1;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &.full-width {
    min-width: 100%;
  }
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;

  .unit {
    font-size: 14px;
    color: #909399;
    margin-right: 8px;
  }
}

:deep(.el-input) {
  flex: 1;

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
}

:deep(.el-select) {
  width: 100%;
}

.result-section {
  margin-top: 24px;
}

.result-card {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.result-item {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s;

  &.highlight {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

    .result-label,
    .result-unit {
      color: rgba(255, 255, 255, 0.8);
    }

    .result-value {
      color: #fff;
    }
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
}

.result-label {
  font-size: 14px;
  color: #909399;
}

.result-value {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin: 0 10px;
}

.result-unit {
  font-size: 12px;
  color: #909399;
}
</style>
