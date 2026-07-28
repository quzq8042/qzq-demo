<template>
  <div class="calculator-panel">
    <div class="shape-toggle">
      <el-button type="primary" class="reset-btn" @click="handleReset">重置</el-button>
    </div>

    <div class="rule-note">
      <div class="note-title">💡 计算规则说明</div>
      <div class="formula-box">
        <div class="formula-row">
          <span class="formula-label">残余高度</span>
          <span class="formula">H = R - √(R² - (P/2)²)</span>
        </div>
        <div class="formula-row">
          <span class="formula-label">加工步距</span>
          <span class="formula">P = 2 × √(2RH - H²)</span>
        </div>
        <div class="formula-legend">
          <span>R — 球刀半径 (mm)</span>
          <span>P — 加工步距 (mm)</span>
          <span>H — 残余高度 (mm)</span>
        </div>
      </div>
    </div>

    <div class="calc-section">
      <div class="section-header">
        <span class="section-title">① 步距 → 残余高度</span>
        <span class="section-desc">输入球刀半径与加工步距，计算残余高度</span>
      </div>
      <div class="form-row">
        <div class="form-item">
          <label class="form-label">球刀半径 (R)</label>
          <div class="input-wrapper">
            <el-input v-model.number="radius1" type="number" placeholder="请输入球刀半径" />
            <span class="unit">mm</span>
          </div>
        </div>
        <div class="form-item">
          <label class="form-label">加工步距 (P)</label>
          <div class="input-wrapper">
            <el-input v-model.number="step" type="number" placeholder="请输入加工步距" />
            <span class="unit">mm</span>
          </div>
        </div>
      </div>
      <div class="result-inline">
        <span class="result-label">残余高度 (H)</span>
        <span class="result-value">{{ residualHeightResult }}</span>
        <span class="result-unit">mm</span>
      </div>
    </div>

    <div class="calc-section">
      <div class="section-header">
        <span class="section-title">② 残余高度 → 步距</span>
        <span class="section-desc">输入球刀半径与目标残余高度，计算加工步距</span>
      </div>
      <div class="form-row">
        <div class="form-item">
          <label class="form-label">球刀半径 (R)</label>
          <div class="input-wrapper">
            <el-input v-model.number="radius2" type="number" placeholder="请输入球刀半径" />
            <span class="unit">mm</span>
          </div>
        </div>
        <div class="form-item">
          <label class="form-label">残余高度 (H)</label>
          <div class="input-wrapper">
            <el-input v-model.number="inputResidualHeight" type="number" placeholder="请输入残余高度" />
            <span class="unit">mm</span>
          </div>
        </div>
      </div>
      <div class="result-inline">
        <span class="result-label">加工步距 (P)</span>
        <span class="result-value">{{ stepCalc }}</span>
        <span class="result-unit">mm</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const radius1 = ref(3)
const step = ref(0.15)
const radius2 = ref(3)
const inputResidualHeight = ref(0.0009377002716064)

const calcResidualHeight = () => {
  const R = radius1.value
  const P = step.value
  if (!R || R <= 0 || !P || P <= 0) return '—'
  const underRoot = R * R - (P / 2) * (P / 2)
  if (underRoot < 0) return '步距过大，无实数解'
  const H = R - Math.sqrt(underRoot)
  return Number(H.toFixed(15)).toString()
}

const residualHeightResult = computed(calcResidualHeight)

const calcStepFromHeight = () => {
  const R = radius2.value
  const H = inputResidualHeight.value
  if (!R || R <= 0 || H === null || H === undefined) return '—'
  if (H < 0) return '残余高度不能为负'
  if (H >= R) return '残余高度不能大于等于半径'
  const inner = 2 * R * H - H * H
  if (inner < 0) return '无实数解'
  const P = 2 * Math.sqrt(inner)
  return Number(P.toFixed(15)).toString()
}

const stepCalc = computed(calcStepFromHeight)

const handleReset = () => {
  radius1.value = 3
  step.value = 0.15
  radius2.value = 3
  inputResidualHeight.value = 0.0009377002716064
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

  .reset-btn {
    margin-left: auto;
  }
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

  .formula-box {
    .formula-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;

      .formula-label {
        min-width: 80px;
        font-size: 13px;
        color: #52c41a;
        font-weight: 500;
      }

      .formula {
        font-family: 'Courier New', monospace;
        font-size: 14px;
        color: #333;
        background: #fff;
        padding: 4px 12px;
        border-radius: 4px;
        border: 1px solid #e8e8e8;
      }
    }

    .formula-legend {
      display: flex;
      gap: 16px;
      margin-top: 10px;
      font-size: 12px;
      color: #909399;
    }
  }
}

.calc-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  .section-header {
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 16px;

    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #303133;
    }

    .section-desc {
      font-size: 12px;
      color: #909399;
    }
  }
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

.result-inline {
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  padding: 16px 20px;

  .result-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    min-width: 100px;
  }

  .result-value {
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    font-family: 'Courier New', monospace;
    flex: 1;
    text-align: right;
    word-break: break-all;
  }

  .result-unit {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
  }
}
</style>
