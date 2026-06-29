<template>
  <div class="calculator-panel">
    <div class="shape-toggle">
      <div class="btn-group-left">
        <span class="toggle-label">形状：</span>
        <el-button-group>
          <el-button :type="shapeType === 'rectangle' ? 'primary' : 'default'" @click="shapeType = 'rectangle'">长方体</el-button>
          <el-button :type="shapeType === 'cylinder' ? 'primary' : 'default'" @click="shapeType = 'cylinder'">圆柱体</el-button>
        </el-button-group>
      </div>
      <el-button type="primary" class="reset-btn" @click="handleReset">重置</el-button>
    </div>

    <div class="rule-note">
      <div class="note-title">💡 计算规则说明</div>
      <ul class="note-list">
        <li>体积：长方体 = 长×宽×高÷1000；圆柱体 = π×半径²×长度÷1000</li>
        <li>单重 = 体积×密度÷1000（克转公斤）</li>
        <li>总重 = 单重×数量</li>
        <li>材料价格 = 总重×每公斤单价</li>
      </ul>
    </div>

    <div class="input-section">
      <div class="form-row">
        <div class="form-item">
          <label class="form-label">长</label>
          <div class="input-wrapper">
            <el-input v-model.number="dimensions.length" type="number" placeholder="请输入长度" />
            <span class="unit">mm</span>
          </div>
        </div>
        <div v-if="shapeType === 'rectangle'" class="form-item">
          <label class="form-label">宽</label>
          <div class="input-wrapper">
            <el-input v-model.number="dimensions.width" type="number" placeholder="请输入宽度" />
            <span class="unit">mm</span>
          </div>
        </div>
        <div v-else class="form-item">
          <label class="form-label">直径</label>
          <div class="input-wrapper">
            <el-input v-model.number="dimensions.diameter" type="number" placeholder="请输入直径" />
            <span class="unit">mm</span>
          </div>
        </div>
        <div v-if="shapeType === 'rectangle'" class="form-item">
          <label class="form-label">高</label>
          <div class="input-wrapper">
            <el-input v-model.number="dimensions.height" type="number" placeholder="请输入高度" />
            <span class="unit">mm</span>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-item full-width">
          <label class="form-label">材料</label>
          <el-select v-model="material" placeholder="请选择材料" @change="handleMaterialChange">
            <el-option label="铝" value="aluminum" />
            <el-option label="钢" value="steel" />
            <el-option label="铜" value="copper" />
            <el-option label="40Cr" value="40cr" />
            <el-option label="304,304L,305" value="304" />
            <el-option label="316,316L,347" value="316" />
            <el-option label="POM电木" value="pom" />
            <el-option label="其它" value="other" />
          </el-select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-item">
          <label class="form-label">密度</label>
          <div class="input-wrapper">
            <el-input v-model.number="density" type="number" placeholder="请输入密度" />
            <span class="unit">g/cm³</span>
          </div>
        </div>
        <div class="form-item">
          <label class="form-label">单价</label>
          <div class="input-wrapper">
            <el-input v-model.number="pricePerKg" type="number" placeholder="请输入单价" />
            <span class="unit">¥/kg</span>
          </div>
        </div>
        <div class="form-item">
          <label class="form-label">数量</label>
          <div class="input-wrapper">
            <el-input v-model.number="quantity" type="number" placeholder="请输入数量" min="1" />
            <span class="unit">个</span>
          </div>
        </div>
      </div>
    </div>

    <div class="result-section">
      <div class="result-card">
        <div class="result-item">
          <span class="result-label">体积</span>
          <span class="result-value">{{ volume.toFixed(2) }}</span>
          <span class="result-unit">cm³</span>
        </div>
        <div class="result-item highlight">
          <span class="result-label">单重</span>
          <span class="result-value">{{ singleWeight.toFixed(4) }}</span>
          <span class="result-unit">kg</span>
        </div>
        <div class="result-item">
          <span class="result-label">总重</span>
          <span class="result-value">{{ totalWeight.toFixed(4) }}</span>
          <span class="result-unit">kg</span>
        </div>
        <div class="result-item highlight">
          <span class="result-label">材料价格</span>
          <span class="result-value">¥{{ totalPrice.toFixed(2) }}</span>
          <span class="result-unit"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const shapeType = ref('rectangle')

const dimensions = ref({
  length: 100,
  width: 100,
  height: 80,
  diameter: 100,
})

const material = ref('aluminum')
const density = ref(2.7)
const pricePerKg = ref(25)
const quantity = ref(1)

const materialProperties = {
  aluminum: { density: 2.7, price: 25 },
  steel: { density: 7.85, price: 8 },
  copper: { density: 8.96, price: 65 },
  '40cr': { density: 7.85, price: 12 },
  304: { density: 7.93, price: 28 },
  316: { density: 8.0, price: 35 },
  pom: { density: 1.41, price: 30 },
  other: { density: 1.0, price: 10 },
}

const volume = computed(() => {
  const { length, width, height, diameter } = dimensions.value

  if (shapeType.value === 'rectangle') {
    if (!length || !width || !height) return 0
    return (length * width * height) / 1000
  } else {
    if (!length || !diameter) return 0
    const radius = diameter / 2
    return (Math.PI * radius * radius * length) / 1000
  }
})

const singleWeight = computed(() => {
  return (volume.value * density.value) / 1000
})

const totalWeight = computed(() => {
  return singleWeight.value * quantity.value
})

const totalPrice = computed(() => {
  return totalWeight.value * pricePerKg.value
})

const handleMaterialChange = () => {
  const props = materialProperties[material.value]
  if (props) {
    density.value = props.density
    pricePerKg.value = props.price
  }
}

watch(material, () => {
  handleMaterialChange()
})

const handleReset = () => {
  dimensions.value = {
    length: 100,
    width: 100,
    height: 80,
    diameter: 100,
  }
  material.value = 'aluminum'
  density.value = 2.7
  pricePerKg.value = 25
  quantity.value = 1
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
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e8e8e8;

  .toggle-label {
    font-size: 14px;
    font-weight: 500;
    color: #333;
    margin-right: 12px;
  }

  .btn-group-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

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
