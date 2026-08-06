<template>
  <div class="calculator-panel">
    <div class="shape-toggle">
      <el-button type="primary" class="reset-btn" @click="handleReset">重置</el-button>
    </div>

    <div class="rule-note">
      <div class="note-title">💡 螺纹参数说明</div>
      <ul class="note-list">
        <li>大径 D/d = 公称直径（螺纹最大外径）</li>
        <li>小径 D1/d1 = 大径 - 1.082532 × P（牙型高度 ≈ 0.6495 × P）</li>
        <li>中径 D2/d2 = 大径 - 0.6495 × P</li>
        <li>牙型角：公制 60°，英制 55°</li>
        <li>攻牙底孔 = 公称直径 - 螺距 P（近似值）</li>
      </ul>
    </div>

    <div class="tab-header">
      <div v-for="t in threadTypes" :key="t.key" :class="['tab-item', { active: activeType === t.key }]" @click="switchType(t.key)">
        {{ t.label }}
      </div>
    </div>

    <div class="input-section">
      <div class="form-row">
        <div class="form-item">
          <label class="form-label">公称直径</label>
          <div class="input-wrapper">
            <el-input v-model.number="nominalDiameter" type="number" placeholder="请输入公称直径" />
            <span class="unit">mm</span>
          </div>
        </div>
        <div class="form-item">
          <label class="form-label">螺距 P</label>
          <div class="input-wrapper">
            <el-input v-model.number="pitch" type="number" placeholder="请输入螺距" />
            <span class="unit">mm</span>
          </div>
        </div>
      </div>

      <div v-if="activeType === 'metric'" class="form-row">
        <div class="form-item">
          <label class="form-label">牙型角</label>
          <div class="input-wrapper">
            <el-input v-model.number="threadAngle" type="number" disabled />
            <span class="unit">°</span>
          </div>
        </div>
        <div class="form-item">
          <label class="form-label">每英寸牙数 TPI</label>
          <div class="input-wrapper">
            <el-input :model-value="tpi.toFixed(2)" disabled />
            <span class="unit">牙/in</span>
          </div>
        </div>
      </div>

      <div v-if="activeType === 'imperial'" class="form-row">
        <div class="form-item">
          <label class="form-label">每英寸牙数 TPI</label>
          <div class="input-wrapper">
            <el-input v-model.number="tpi" type="number" placeholder="请输入TPI" />
            <span class="unit">牙/in</span>
          </div>
        </div>
        <div class="form-item">
          <label class="form-label">牙型角</label>
          <div class="input-wrapper">
            <el-input v-model.number="threadAngle" type="number" disabled />
            <span class="unit">°</span>
          </div>
        </div>
      </div>
    </div>

    <div class="result-section">
      <div class="result-card">
        <div class="result-item">
          <span class="result-label">大径 D</span>
          <span class="result-value">{{ largeDiameter.toFixed(4) }}</span>
          <span class="result-unit">mm</span>
        </div>
        <div class="result-item">
          <span class="result-label">中径 D2</span>
          <span class="result-value">{{ pitchDiameter.toFixed(4) }}</span>
          <span class="result-unit">mm</span>
        </div>
        <div class="result-item">
          <span class="result-label">小径 D1</span>
          <span class="result-value">{{ minorDiameter.toFixed(4) }}</span>
          <span class="result-unit">mm</span>
        </div>
        <div class="result-item highlight">
          <span class="result-label">牙型高度 h</span>
          <span class="result-value">{{ threadHeight.toFixed(4) }}</span>
          <span class="result-unit">mm</span>
        </div>
        <div class="result-item highlight">
          <span class="result-label">攻牙底孔</span>
          <span class="result-value">{{ tapHole.toFixed(4) }}</span>
          <span class="result-unit">mm</span>
        </div>
        <div class="result-item highlight">
          <span class="result-label">切削进给量</span>
          <span class="result-value">{{ feedPerRev.toFixed(4) }}</span>
          <span class="result-unit">mm/r</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const threadTypes = [
  { key: 'metric', label: '公制螺纹 (60°)' },
  { key: 'imperial', label: '英制螺纹 (55°)' },
]

const activeType = ref('metric')
const nominalDiameter = ref(10)
const pitch = ref(1.5)
const tpi = ref(16)
const threadAngle = ref(60)

const switchType = (key) => {
  activeType.value = key
  if (key === 'metric') {
    threadAngle.value = 60
  } else {
    threadAngle.value = 55
    pitch.value = 25.4 / tpi.value
  }
}

const effectivePitch = computed(() => {
  if (activeType.value === 'metric') {
    return pitch.value
  } else {
    return 25.4 / tpi.value
  }
})

const largeDiameter = computed(() => nominalDiameter.value)

const pitchDiameter = computed(() => {
  return nominalDiameter.value - 0.6495 * effectivePitch.value
})

const minorDiameter = computed(() => {
  return nominalDiameter.value - 1.082532 * effectivePitch.value
})

const threadHeight = computed(() => {
  return 0.6495 * effectivePitch.value
})

const tapHole = computed(() => {
  return nominalDiameter.value - effectivePitch.value
})

const feedPerRev = computed(() => effectivePitch.value)

const handleReset = () => {
  activeType.value = 'metric'
  nominalDiameter.value = 10
  pitch.value = 1.5
  tpi.value = 16
  threadAngle.value = 60
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

.tab-header {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  background: #f8f9fb;
  border-radius: 8px;
  padding: 6px;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
  color: #606266;

  &.active {
    color: #fff;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  }

  &:hover:not(.active) {
    background: rgba(102, 126, 234, 0.1);
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
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.result-item {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
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
  font-size: 13px;
  color: #909399;
}

.result-value {
  font-size: 20px;
  font-weight: 600;
  color: #303133;
  margin: 0 6px;
}

.result-unit {
  font-size: 12px;
  color: #909399;
}
</style>
