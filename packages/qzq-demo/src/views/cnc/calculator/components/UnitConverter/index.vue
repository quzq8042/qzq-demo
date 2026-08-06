<template>
  <div class="calculator-panel">
    <div class="shape-toggle">
      <el-button type="primary" class="reset-btn" @click="handleReset">重置</el-button>
    </div>

    <div class="converter-tabs">
      <div class="tab-header">
        <div v-for="tab in tabs" :key="tab.key" :class="['tab-item', { active: activeTab === tab.key }]" @click="activeTab = tab.key">
          {{ tab.label }}
        </div>
      </div>

      <div class="tab-content">
        <template v-if="activeTab === 'length'">
          <div class="convert-row">
            <div class="convert-item">
              <label>英寸 (in)</label>
              <div class="input-wrapper">
                <el-input v-model.number="length.inch" type="number" @input="convertLength('inch')" />
              </div>
            </div>
            <div class="convert-item">
              <label>英尺 (ft)</label>
              <div class="input-wrapper">
                <el-input v-model.number="length.foot" type="number" @input="convertLength('foot')" />
              </div>
            </div>
            <div class="convert-item">
              <label>毫米 (mm)</label>
              <div class="input-wrapper">
                <el-input v-model.number="length.mm" type="number" @input="convertLength('mm')" />
              </div>
            </div>
            <div class="convert-item">
              <label>厘米 (cm)</label>
              <div class="input-wrapper">
                <el-input v-model.number="length.cm" type="number" @input="convertLength('cm')" />
              </div>
            </div>
            <div class="convert-item">
              <label>米 (m)</label>
              <div class="input-wrapper">
                <el-input v-model.number="length.m" type="number" @input="convertLength('m')" />
              </div>
            </div>
          </div>
        </template>

        <template v-if="activeTab === 'temperature'">
          <div class="convert-row">
            <div class="convert-item">
              <label>摄氏度 (°C)</label>
              <div class="input-wrapper">
                <el-input v-model.number="temp.celsius" type="number" @input="convertTemp('celsius')" />
              </div>
            </div>
            <div class="convert-item">
              <label>华氏度 (°F)</label>
              <div class="input-wrapper">
                <el-input v-model.number="temp.fahrenheit" type="number" @input="convertTemp('fahrenheit')" />
              </div>
            </div>
            <div class="convert-item">
              <label>开尔文 (K)</label>
              <div class="input-wrapper">
                <el-input v-model.number="temp.kelvin" type="number" @input="convertTemp('kelvin')" />
              </div>
            </div>
          </div>
        </template>

        <template v-if="activeTab === 'hardness'">
          <div class="convert-row">
            <div class="convert-item">
              <label>HRC (洛氏)</label>
              <div class="input-wrapper">
                <el-input v-model.number="hardness.hrc" type="number" @input="convertHardness('hrc')" />
              </div>
            </div>
            <div class="convert-item">
              <label>HB (布氏)</label>
              <div class="input-wrapper">
                <el-input v-model.number="hardness.hb" type="number" @input="convertHardness('hb')" />
              </div>
            </div>
            <div class="convert-item">
              <label>HV (维氏)</label>
              <div class="input-wrapper">
                <el-input v-model.number="hardness.hv" type="number" @input="convertHardness('hv')" />
              </div>
            </div>
          </div>
          <div class="tip-box">
            <p>💡 硬度换算为近似估算，实际请参考标准硬度对照表</p>
          </div>
        </template>

        <template v-if="activeTab === 'torque'">
          <div class="convert-row">
            <div class="convert-item">
              <label>N·m (牛顿米)</label>
              <div class="input-wrapper">
                <el-input v-model.number="torque.nm" type="number" @input="convertTorque('nm')" />
              </div>
            </div>
            <div class="convert-item">
              <label>lb·ft (磅英尺)</label>
              <div class="input-wrapper">
                <el-input v-model.number="torque.lbft" type="number" @input="convertTorque('lbft')" />
              </div>
            </div>
            <div class="convert-item">
              <label>kgf·m (千克力米)</label>
              <div class="input-wrapper">
                <el-input v-model.number="torque.kgfm" type="number" @input="convertTorque('kgfm')" />
              </div>
            </div>
          </div>
        </template>

        <template v-if="activeTab === 'pressure'">
          <div class="convert-row">
            <div class="convert-item">
              <label>bar (巴)</label>
              <div class="input-wrapper">
                <el-input v-model.number="pressure.bar" type="number" @input="convertPressure('bar')" />
              </div>
            </div>
            <div class="convert-item">
              <label>psi (磅/英寸²)</label>
              <div class="input-wrapper">
                <el-input v-model.number="pressure.psi" type="number" @input="convertPressure('psi')" />
              </div>
            </div>
            <div class="convert-item">
              <label>MPa (兆帕)</label>
              <div class="input-wrapper">
                <el-input v-model.number="pressure.mpa" type="number" @input="convertPressure('mpa')" />
              </div>
            </div>
            <div class="convert-item">
              <label>kgf/cm² (千克力/厘米²)</label>
              <div class="input-wrapper">
                <el-input v-model.number="pressure.kgfcm" type="number" @input="convertPressure('kgfcm')" />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const tabs = [
  { key: 'length', label: '长度' },
  { key: 'temperature', label: '温度' },
  { key: 'hardness', label: '硬度' },
  { key: 'torque', label: '扭矩' },
  { key: 'pressure', label: '压力' },
]

const activeTab = ref('length')

const length = reactive({ inch: 1, foot: 0.0833, mm: 25.4, cm: 2.54, m: 0.0254 })

const convertLength = (key) => {
  const val = length[key]
  if (val === null || val === undefined || isNaN(val)) return
  switch (key) {
    case 'inch':
      length.mm = val * 25.4
      length.cm = val * 2.54
      length.m = val * 0.0254
      length.foot = val / 12
      break
    case 'foot':
      length.inch = val * 12
      length.mm = val * 304.8
      length.cm = val * 30.48
      length.m = val * 0.3048
      break
    case 'mm':
      length.inch = val / 25.4
      length.cm = val / 10
      length.m = val / 1000
      length.foot = val / 304.8
      break
    case 'cm':
      length.inch = val / 2.54
      length.mm = val * 10
      length.m = val / 100
      length.foot = val / 30.48
      break
    case 'm':
      length.inch = val / 0.0254
      length.mm = val * 1000
      length.cm = val * 100
      length.foot = val / 0.3048
      break
  }
}

const temp = reactive({ celsius: 25, fahrenheit: 77, kelvin: 298.15 })

const convertTemp = (key) => {
  const val = temp[key]
  if (val === null || val === undefined || isNaN(val)) return
  switch (key) {
    case 'celsius':
      temp.fahrenheit = (val * 9) / 5 + 32
      temp.kelvin = val + 273.15
      break
    case 'fahrenheit':
      temp.celsius = ((val - 32) * 5) / 9
      temp.kelvin = ((val - 32) * 5) / 9 + 273.15
      break
    case 'kelvin':
      temp.celsius = val - 273.15
      temp.fahrenheit = ((val - 273.15) * 9) / 5 + 32
      break
  }
}

const hardness = reactive({ hrc: 20, hb: 225, hv: 235 })

const convertHardness = (key) => {
  const val = hardness[key]
  if (val === null || val === undefined || isNaN(val)) return
  switch (key) {
    case 'hrc':
      hardness.hb = Math.round(0.36 * val * val - 22 * val + 560)
      hardness.hv = Math.round(0.38 * val * val - 23 * val + 580)
      break
    case 'hb':
      hardness.hrc = Math.round((val - 100) / 14.2)
      hardness.hv = Math.round(val * 1.05)
      break
    case 'hv':
      hardness.hrc = Math.round((val - 100) / 14.2)
      hardness.hb = Math.round(val / 1.05)
      break
  }
}

const torque = reactive({ nm: 10, lbft: 7.38, kgfm: 1.02 })

const convertTorque = (key) => {
  const val = torque[key]
  if (val === null || val === undefined || isNaN(val)) return
  switch (key) {
    case 'nm':
      torque.lbft = val * 0.7376
      torque.kgfm = val / 9.80665
      break
    case 'lbft':
      torque.nm = val * 1.3558
      torque.kgfm = val * 0.1383
      break
    case 'kgfm':
      torque.nm = val * 9.80665
      torque.lbft = val * 7.233
      break
  }
}

const pressure = reactive({ bar: 1, psi: 14.5, mpa: 0.1, kgfcm: 1.02 })

const convertPressure = (key) => {
  const val = pressure[key]
  if (val === null || val === undefined || isNaN(val)) return
  switch (key) {
    case 'bar':
      pressure.psi = val * 14.5038
      pressure.mpa = val / 10
      pressure.kgfcm = val * 1.0197
      break
    case 'psi':
      pressure.bar = val / 14.5038
      pressure.mpa = val / 145.038
      pressure.kgfcm = val / 14.223
      break
    case 'mpa':
      pressure.bar = val * 10
      pressure.psi = val * 145.038
      pressure.kgfcm = val * 10.197
      break
    case 'kgfcm':
      pressure.bar = val / 1.0197
      pressure.psi = val * 14.223
      pressure.mpa = val / 10.197
      break
  }
}

const handleReset = () => {
  length.inch = 1
  length.foot = 0.0833
  length.mm = 25.4
  length.cm = 2.54
  length.m = 0.0254
  temp.celsius = 25
  temp.fahrenheit = 77
  temp.kelvin = 298.15
  hardness.hrc = 20
  hardness.hb = 225
  hardness.hv = 235
  torque.nm = 10
  torque.lbft = 7.38
  torque.kgfm = 1.02
  pressure.bar = 1
  pressure.psi = 14.5
  pressure.mpa = 0.1
  pressure.kgfcm = 1.02
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

.converter-tabs {
  .tab-header {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
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
}

.convert-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.convert-item {
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;

    :deep(.el-input) {
      input[type='number']::-webkit-inner-spin-button,
      input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type='number'] {
        -moz-appearance: textfield;
      }
    }
  }
}

.tip-box {
  margin-top: 20px;
  padding: 12px 16px;
  background: #fdf6ec;
  border: 1px solid #faecd8;
  border-radius: 8px;
  color: #e6a23c;
  font-size: 13px;

  p {
    margin: 0;
  }
}
</style>
