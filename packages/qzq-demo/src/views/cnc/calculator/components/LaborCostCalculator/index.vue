<template>
  <div class="calculator-panel">
    <div class="shape-toggle">
      <el-button type="primary" class="reset-btn" @click="handleReset">重置</el-button>
    </div>

    <div class="rule-note">
      <div class="note-title">💡 计算规则说明</div>
      <ul class="note-list">
        <li>加工时间 = 程序时间 + (调机时间×工序数)÷数量（调机时间平摊到每个零件）</li>
        <li>加工费用 = 加工时间÷60×工价（分钟转小时）</li>
        <li>单价 = (材料含税价÷(1+税率) + 加工费用) × (1+税率)</li>
        <li>总价 = 单价×数量</li>
      </ul>
    </div>

    <div class="input-section">
      <div class="form-row">
        <div class="form-item">
          <label class="form-label">材料价格</label>
          <div class="input-wrapper">
            <el-input v-model.number="materialPrice" type="number" placeholder="请输入材料价格" />
            <span class="unit">元/PCS</span>
          </div>
        </div>
        <div class="form-item">
          <label class="form-label">税率</label>
          <div class="input-wrapper">
            <el-input v-model.number="taxRate" type="number" placeholder="请输入税率" />
            <span class="unit">%</span>
          </div>
        </div>
        <div class="form-item">
          <label class="form-label">数量</label>
          <div class="input-wrapper">
            <el-input v-model.number="quantity" type="number" placeholder="请输入数量" min="1" />
            <span class="unit">PCS</span>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-item">
          <label class="form-label">程序时间</label>
          <div class="input-wrapper">
            <el-input v-model.number="programTime" type="number" placeholder="请输入程序时间" />
            <span class="unit">min/PCS</span>
          </div>
        </div>
        <div class="form-item">
          <label class="form-label">工序</label>
          <div class="input-wrapper">
            <el-input v-model.number="processCount" type="number" placeholder="请输入工序数" min="1" />
            <span class="unit">个</span>
          </div>
        </div>
        <div class="form-item">
          <label class="form-label">调机时间</label>
          <div class="input-wrapper">
            <el-input v-model.number="setupTime" type="number" placeholder="请输入调机时间" />
            <span class="unit">min/工序</span>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-item">
          <label class="form-label">工价</label>
          <div class="input-wrapper">
            <el-input v-model.number="laborRate" type="number" placeholder="请输入工价" />
            <span class="unit">元/时</span>
          </div>
        </div>
      </div>
    </div>

    <div class="result-section">
      <div class="result-card">
        <div class="result-item">
          <span class="result-label">加工时间</span>
          <span class="result-value">{{ processTimePerPcs.toFixed(2) }}</span>
          <span class="result-unit">min/PCS</span>
        </div>
        <div class="result-item">
          <span class="result-label">加工费用</span>
          <span class="result-value">¥{{ processCost.toFixed(2) }}</span>
          <span class="result-unit">/PCS</span>
        </div>
        <div class="result-item highlight">
          <span class="result-label">单价</span>
          <span class="result-value">¥{{ unitPrice.toFixed(8) }}</span>
          <span class="result-unit">元</span>
        </div>
        <div class="result-item highlight">
          <span class="result-label">总价</span>
          <span class="result-value">¥{{ totalPrice.toFixed(8) }}</span>
          <span class="result-unit">元</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const materialPrice = ref(10)
const taxRate = ref(13)
const quantity = ref(1)
const programTime = ref(10)
const processCount = ref(1)
const setupTime = ref(30)
const laborRate = ref(100)

const processTimePerPcs = computed(() => {
  if (!quantity.value) return 0
  return programTime.value + (setupTime.value * processCount.value) / quantity.value
})

const processCost = computed(() => {
  return (processTimePerPcs.value / 60) * laborRate.value
})

const unitPrice = computed(() => {
  const taxFactor = 1 + taxRate.value / 100
  const materialPriceExclTax = materialPrice.value / taxFactor
  return (materialPriceExclTax + processCost.value) * taxFactor
})

const totalPrice = computed(() => {
  return unitPrice.value * quantity.value
})

const handleReset = () => {
  materialPrice.value = 10
  taxRate.value = 13
  quantity.value = 1
  programTime.value = 10
  processCount.value = 1
  setupTime.value = 30
  laborRate.value = 100
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
