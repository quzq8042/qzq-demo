<template>
  <div class="tolerance-chart-container">
    <PageHeader />

    <el-tabs v-model="activeTab" type="card" class="tabs-container">
      <el-tab-pane label="公差等级表" name="grades">
        <div class="tab-content">
          <div class="section-header">
            <h2>ISO/GB 公差等级表 (IT01 ~ IT18)</h2>
            <p class="section-desc">单位：μm（微米）。公差等级是确定尺寸精确程度的等级，共20个等级，从IT01到IT18，等级越高公差越大。</p>
          </div>

          <div class="filter-bar">
            <span class="filter-label">选择公称尺寸范围：</span>
            <el-select v-model="selectedRange" size="default" style="width: 200px">
              <el-option label="≤ 10 mm" value="upTo10" />
              <el-option label="> 10 ~ 25 mm" value="upTo25" />
              <el-option label="> 25 ~ 50 mm" value="upTo50" />
              <el-option label="> 50 ~ 100 mm" value="upTo100" />
              <el-option label="> 100 ~ 250 mm" value="upTo250" />
              <el-option label="> 250 ~ 500 mm" value="upTo500" />
              <el-option label="> 500 mm" value="above500" />
            </el-select>
          </div>

          <el-table :data="toleranceGrades" border stripe class="tolerance-table">
            <el-table-column prop="grade" label="公差等级" width="120" align="center">
              <template #default="{ row }">
                <span class="grade-badge" :class="getGradeClass(row.grade)">{{ row.grade }}</span>
              </template>
            </el-table-column>
            <el-table-column v-for="col in sizeColumns" :key="col.key" :prop="col.key" :label="col.label" align="center">
              <template #default="{ row }">
                <span :class="{ 'highlight-col': selectedRange === col.key }">{{ row[col.key] }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <el-tab-pane label="孔轴配合" name="fits">
        <div class="tab-content">
          <div class="section-header">
            <h2>常用孔轴配合选择</h2>
            <p class="section-desc">孔轴配合按间隙大小分为间隙配合、过渡配合和过盈配合三类。选择合适的配合对于产品的性能和寿命至关重要。</p>
          </div>

          <div class="fit-types-grid">
            <div v-for="fit in fitTypes" :key="fit.type" class="fit-type-card" :style="{ borderColor: fit.color }">
              <div class="fit-type-header" :style="{ background: fit.color }">
                <h3>{{ fit.type }}</h3>
              </div>
              <div class="fit-type-body">
                <p class="fit-desc">{{ fit.description }}</p>
                <ul class="fit-features">
                  <li v-for="(feature, idx) in fit.features" :key="idx">{{ feature }}</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 class="sub-title">常用配合代号表</h3>
          <el-table :data="commonFits" border stripe class="fits-table">
            <el-table-column prop="code" label="配合代号" width="140" align="center">
              <template #default="{ row }">
                <span class="fit-code">{{ row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="hole" label="孔公差带" width="120" align="center">
              <template #default="{ row }">
                <span class="hole-badge">{{ row.hole }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="shaft" label="轴公差带" width="120" align="center">
              <template #default="{ row }">
                <span class="shaft-badge">{{ row.shaft }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="配合类型" width="140" align="center">
              <template #default="{ row }">
                <span class="type-badge" :class="getFitTypeClass(row.type)">{{ row.type }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="application" label="应用场景" min-width="250" />
          </el-table>
        </div>
      </el-tab-pane>

      <el-tab-pane label="公差带示意" name="diagram">
        <div class="tab-content">
          <div class="section-header">
            <h2>公差带示意图</h2>
            <p class="section-desc">公差带图直观展示孔轴配合中公差带的位置关系，帮助理解间隙配合、过渡配合和过盈配合的区别。</p>
          </div>

          <div class="diagram-cards">
            <div v-for="diagram in toleranceZoneDiagrams" :key="diagram.title" class="diagram-card" :style="{ borderColor: diagram.color }">
              <div class="diagram-header" :style="{ background: diagram.color }">
                <h3>{{ diagram.title }}</h3>
                <p>{{ diagram.description }}</p>
              </div>
              <div class="diagram-body">
                <div class="zone-diagram">
                  <div class="zone-axis">
                    <span class="axis-label">0</span>
                    <div class="axis-line"></div>
                  </div>
                  <div v-for="(zone, idx) in diagram.zones" :key="idx" class="zone-block" :class="zone.type">
                    <div class="zone-label">{{ zone.label }}</div>
                    <div class="zone-bar">
                      <div class="zone-positive" :style="{ width: Math.abs(parseInt(zone.deviation)) * 2 + 'px' }">
                        <span class="zone-value">{{ zone.deviation > 0 ? '+' : '' }}{{ zone.deviation }}</span>
                      </div>
                      <div class="zone-negative" :style="{ width: Math.abs(parseInt(zone.tolerance)) * 2 + 'px' }">
                        <span class="zone-value">{{ zone.tolerance }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="diagram-legend">
            <h4>图例说明：</h4>
            <div class="legend-items">
              <div class="legend-item">
                <span class="legend-color hole-color"></span>
                <span>孔公差带 (H 基准)</span>
              </div>
              <div class="legend-item">
                <span class="legend-color shaft-color"></span>
                <span>轴公差带</span>
              </div>
              <div class="legend-item">
                <span class="legend-color zero-line"></span>
                <span>零线 (基本尺寸)</span>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="粗糙度表" name="roughness">
        <div class="tab-content">
          <div class="section-header">
            <h2>表面粗糙度参考表</h2>
            <p class="section-desc">表面粗糙度是指加工表面上具有的较小间距和微小峰谷的不平度。常用的评定参数有 Ra（轮廓算术平均偏差）和 Rz（轮廓最大高度）。</p>
          </div>

          <h3 class="sub-title">Ra / Rz / Rmax 值对照表</h3>
          <el-table :data="roughnessComparison" border stripe class="roughness-table">
            <el-table-column prop="grade" label="等级" width="100" align="center">
              <template #default="{ row }">
                <span class="grade-badge" :class="getRoughnessGradeClass(row.grade)">{{ row.grade }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ra" label="Ra (μm)" width="120" align="center">
              <template #default="{ row }">
                <span class="roughness-value">{{ row.ra }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="rz" label="Rz (μm)" width="120" align="center">
              <template #default="{ row }">
                <span class="roughness-value">{{ row.rz }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="rmax" label="Rmax (μm)" width="120" align="center">
              <template #default="{ row }">
                <span class="roughness-value">{{ row.rmax }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="process" label="典型加工方法" min-width="200" />
          </el-table>

          <h3 class="sub-title">各种加工方法能达到的粗糙度范围</h3>
          <div class="machining-grid">
            <div v-for="item in machiningRoughness" :key="item.process" class="machining-card" :style="{ borderColor: item.color }">
              <div class="machining-header" :style="{ background: item.color }">
                <h4>{{ item.process }}</h4>
              </div>
              <div class="machining-body">
                <div class="roughness-range">
                  <span class="range-label">Ra 可达：</span>
                  <span class="range-value">{{ item.raRange }} μm</span>
                </div>
                <p class="machining-desc">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="粗糙度符号" name="symbols">
        <div class="tab-content">
          <div class="section-header">
            <h2>表面粗糙度符号标注说明</h2>
            <p class="section-desc">正确标注表面粗糙度符号是工程制图的重要内容。不同的符号和标注方式代表不同的含义。</p>
          </div>

          <div class="symbols-grid">
            <div v-for="symbol in roughnessSymbols" :key="symbol.name" class="symbol-card">
              <div class="symbol-header">
                <div class="symbol-visual">
                  <div v-if="symbol.name === '基本符号'" class="symbol-basic">
                    <svg viewBox="0 0 60 50" class="symbol-svg">
                      <path d="M5 45 L30 5 L55 45" fill="none" stroke="currentColor" stroke-width="2" />
                    </svg>
                  </div>
                  <div v-else-if="symbol.name === '去除材料符号'" class="symbol-basic">
                    <svg viewBox="0 0 60 50" class="symbol-svg">
                      <path d="M5 45 L30 5 L55 45" fill="none" stroke="currentColor" stroke-width="2" />
                      <line x1="5" y1="45" x2="55" y2="45" stroke="currentColor" stroke-width="2" />
                    </svg>
                  </div>
                  <div v-else-if="symbol.name === '不去除材料符号'" class="symbol-basic">
                    <svg viewBox="0 0 60 50" class="symbol-svg">
                      <path d="M5 45 L30 5 L55 45" fill="none" stroke="currentColor" stroke-width="2" />
                      <circle cx="30" cy="28" r="8" fill="none" stroke="currentColor" stroke-width="2" />
                    </svg>
                  </div>
                  <div v-else-if="symbol.symbol === 'Ra'" class="symbol-text">
                    <span class="param-symbol">Ra</span>
                    <span class="param-value">3.2</span>
                  </div>
                  <div v-else-if="symbol.symbol === 'Rz'" class="symbol-text">
                    <span class="param-symbol">Rz</span>
                    <span class="param-value">6.3</span>
                  </div>
                  <div v-else-if="symbol.symbol === 'Rz(旧)'" class="symbol-text">
                    <span class="param-symbol">Rz</span>
                    <span class="param-value">3.2</span>
                    <span class="param-note">(旧)</span>
                  </div>
                  <div v-else-if="symbol.symbol === '加工纹理方向'" class="symbol-text">
                    <span class="texture-symbols">= | ×</span>
                  </div>
                  <div v-else-if="symbol.symbol === '加工方法'" class="symbol-text">
                    <span class="method-label">镀镍</span>
                    <span class="param-value">Ra 0.8</span>
                  </div>
                  <div v-else class="symbol-text">
                    <span>{{ symbol.example }}</span>
                  </div>
                </div>
                <h4>{{ symbol.name }}</h4>
              </div>
              <div class="symbol-body">
                <div class="symbol-row">
                  <span class="row-label">含义：</span>
                  <span class="row-value">{{ symbol.description }}</span>
                </div>
                <div class="symbol-row">
                  <span class="row-label">适用：</span>
                  <span class="row-value">{{ symbol.usage }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="annotation-guide">
            <h3>标注注意事项</h3>
            <ul class="guide-list">
              <li>表面粗糙度符号应标注在可见轮廓线、尺寸界线或它们的延长线上</li>
              <li>符号的尖端必须从材料外指向被标注表面</li>
              <li>数字及符号应按机械制图标准规定的方向标注</li>
              <li>当零件的大部分表面具有相同的粗糙度时，可在图样右上角统一标注，并加注"其余"</li>
              <li>同一表面上有不同的粗糙度要求时，须用细实线画出其分界线，并注明相应的粗糙度数值</li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import { toleranceGrades, commonFits, toleranceZoneDiagrams, roughnessComparison, machiningRoughness, roughnessSymbols, fitTypes } from './data.js'

const activeTab = ref('grades')
const selectedRange = ref('upTo50')

const sizeColumns = [
  { key: 'upTo10', label: '≤ 10mm' },
  { key: 'upTo25', label: '>10~25mm' },
  { key: 'upTo50', label: '>25~50mm' },
  { key: 'upTo100', label: '>50~100mm' },
  { key: 'upTo250', label: '>100~250mm' },
  { key: 'upTo500', label: '>250~500mm' },
  { key: 'above500', label: '>500mm' },
]

const getGradeClass = (grade) => {
  const num = parseInt(grade.replace('IT', ''))
  if (num <= 4) return 'grade-precision'
  if (num <= 8) return 'grade-medium'
  if (num <= 12) return 'grade-rough'
  return 'grade-coarse'
}

const getFitTypeClass = (type) => {
  if (type.includes('间隙')) return 'type-clearance'
  if (type.includes('过渡')) return 'type-transition'
  return 'type-interference'
}

const getRoughnessGradeClass = (grade) => {
  const num = parseInt(grade.replace('N', ''))
  if (num <= 4) return 'grade-precision'
  if (num <= 7) return 'grade-medium'
  if (num <= 10) return 'grade-rough'
  return 'grade-coarse'
}
</script>

<style lang="scss" scoped>
.tolerance-chart-container {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  min-height: 100vh;
}

.tabs-container {
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
    padding: 0 24px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 6px;
    height: 40px;
    line-height: 40px;
    transition: all 0.3s ease;
    border: none;

    &:hover {
      background: rgba(102, 126, 234, 0.1);
    }
  }

  :deep(.el-tabs__item.is-active) {
    color: #fff;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  }

  :deep(.el-tabs__active-bar) {
    display: none;
  }

  :deep(.el-tabs__content) {
    padding: 16px 8px;
  }
}

.tab-content {
  .section-header {
    margin-bottom: 24px;
    padding: 20px;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
    border-radius: 12px;

    h2 {
      font-size: 20px;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 8px;
    }

    .section-desc {
      font-size: 14px;
      color: #718096;
      line-height: 1.6;
      margin: 0;
    }
  }

  .sub-title {
    font-size: 18px;
    font-weight: 600;
    color: #2d3748;
    margin: 32px 0 16px;
    padding-left: 12px;
    border-left: 4px solid #667eea;
  }
}

.filter-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding: 16px;
  background: #f8f9fb;
  border-radius: 10px;

  .filter-label {
    font-size: 14px;
    color: #4a5568;
    font-weight: 500;
  }
}

.tolerance-table {
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

.grade-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 13px;

  &.grade-precision {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
  }

  &.grade-medium {
    background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
    color: #fff;
  }

  &.grade-rough {
    background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
    color: #fff;
  }

  &.grade-coarse {
    background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
    color: #fff;
  }
}

.highlight-col {
  font-weight: 700;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.fit-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.fit-type-card {
  background: #fff;
  border-radius: 12px;
  border: 2px solid;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
}

.fit-type-header {
  padding: 16px 20px;
  color: #fff;

  h3 {
    margin: 0;
    font-size: 18px;
  }

  p {
    margin: 8px 0 0;
    font-size: 13px;
    opacity: 0.9;
  }
}

.fit-type-body {
  padding: 20px;

  .fit-desc {
    font-size: 14px;
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .fit-features {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      position: relative;
      padding-left: 20px;
      font-size: 13px;
      color: #4a5568;
      line-height: 1.8;

      &::before {
        content: '▸';
        position: absolute;
        left: 0;
        color: #667eea;
      }
    }
  }
}

.fits-table {
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

.fit-code {
  font-family: 'Consolas', 'Monaco', monospace;
  font-weight: 700;
  font-size: 15px;
  color: #667eea;
}

.hole-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-weight: 600;
  font-size: 13px;
}

.shaft-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 8px;
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: #fff;
  font-weight: 600;
  font-size: 13px;
}

.type-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 13px;

  &.type-clearance {
    background: #d4edda;
    color: #155724;
  }

  &.type-transition {
    background: #fff3cd;
    color: #856404;
  }

  &.type-interference {
    background: #f8d7da;
    color: #721c24;
  }
}

.diagram-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
}

.diagram-card {
  background: #fff;
  border-radius: 12px;
  border: 2px solid;
  overflow: hidden;
}

.diagram-header {
  padding: 16px 20px;
  color: #fff;

  h3 {
    margin: 0;
    font-size: 17px;
  }

  p {
    margin: 6px 0 0;
    font-size: 13px;
    opacity: 0.9;
  }
}

.diagram-body {
  padding: 24px 20px;
  background: #f8f9fb;
}

.zone-diagram {
  position: relative;
  padding: 20px 0;
}

.zone-axis {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;

  .axis-label {
    position: absolute;
    left: -20px;
    top: -10px;
    font-size: 12px;
    color: #718096;
    font-weight: 600;
  }

  .axis-line {
    height: 2px;
    background: #e2e8f0;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 25px;
      top: -4px;
      width: 2px;
      height: 10px;
      background: #667eea;
    }
  }
}

.zone-block {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-left: 40px;

  &:last-child {
    margin-bottom: 0;
  }

  &.hole {
    .zone-bar {
      background: rgba(102, 126, 234, 0.15);
      border: 1px solid #667eea;
    }
  }

  &.shaft {
    .zone-bar {
      background: rgba(72, 187, 120, 0.15);
      border: 1px solid #48bb78;
    }
  }
}

.zone-label {
  width: 60px;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
}

.zone-bar {
  display: flex;
  height: 30px;
  border-radius: 4px;
  overflow: hidden;
}

.zone-positive {
  background: #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
}

.zone-negative {
  background: #fca5a5;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
}

.zone-value {
  font-size: 11px;
  color: #2d3748;
  font-weight: 600;
  padding: 0 4px;
}

.diagram-legend {
  background: #f8f9fb;
  border-radius: 10px;
  padding: 16px 20px;

  h4 {
    margin: 0 0 12px;
    font-size: 14px;
    color: #2d3748;
  }
}

.legend-items {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #4a5568;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;

  &.hole-color {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  &.shaft-color {
    background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  }

  &.zero-line {
    background: #e2e8f0;
    border: 2px solid #667eea;
  }
}

.roughness-table {
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

.roughness-value {
  font-family: 'Consolas', 'Monaco', monospace;
  font-weight: 600;
  color: #667eea;
}

.machining-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.machining-card {
  background: #fff;
  border-radius: 10px;
  border: 2px solid;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
}

.machining-header {
  padding: 12px 16px;
  color: #fff;

  h4 {
    margin: 0;
    font-size: 15px;
  }
}

.machining-body {
  padding: 16px;

  .roughness-range {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;

    .range-label {
      font-size: 13px;
      color: #718096;
    }

    .range-value {
      font-size: 18px;
      font-weight: 700;
      color: #2d3748;
    }
  }

  .machining-desc {
    font-size: 13px;
    color: #4a5568;
    line-height: 1.6;
    margin: 0;
  }
}

.symbols-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.symbol-card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    border-color: #667eea;
  }
}

.symbol-header {
  padding: 16px;
  background: linear-gradient(135deg, #f8f9fb 0%, #edf2f7 100%);
  display: flex;
  align-items: center;
  gap: 16px;

  h4 {
    margin: 0;
    font-size: 15px;
    color: #2d3748;
  }
}

.symbol-visual {
  width: 60px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.symbol-svg {
  width: 40px;
  height: 35px;
  color: #2d3748;
}

.symbol-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  .param-symbol {
    font-size: 14px;
    font-weight: 600;
    color: #2d3748;
  }

  .param-value {
    font-size: 16px;
    font-weight: 700;
    color: #667eea;
  }

  .param-note {
    font-size: 10px;
    color: #718096;
  }

  .texture-symbols {
    font-size: 16px;
    font-weight: 600;
    color: #4a5568;
  }

  .method-label {
    font-size: 11px;
    color: #718096;
  }
}

.symbol-body {
  padding: 16px;

  .symbol-row {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }

    .row-label {
      font-size: 13px;
      font-weight: 600;
      color: #718096;
      flex-shrink: 0;
    }

    .row-value {
      font-size: 13px;
      color: #4a5568;
      line-height: 1.5;
    }
  }
}

.annotation-guide {
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  border-radius: 12px;
  padding: 24px;

  h3 {
    font-size: 17px;
    font-weight: 600;
    color: #2d3748;
    margin: 0 0 16px;
  }
}

.guide-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    position: relative;
    padding-left: 24px;
    font-size: 14px;
    color: #4a5568;
    line-height: 1.8;

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 18px;
      height: 18px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      border-radius: 50%;
      font-size: 11px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
