<template>
  <div class="calculator-container">
    <PageHeader />
    <el-tabs v-model="activeTab" class="calculator-tabs">
      <el-tab-pane label="材料重量" name="weight">
        <MaterialWeightCalculator />
      </el-tab-pane>
      <el-tab-pane label="工时报价" name="labor">
        <LaborCostCalculator />
      </el-tab-pane>
      <el-tab-pane label="球刀步距换算" name="ballnose">
        <BallnoseStepHeightCalculator />
      </el-tab-pane>
      <el-tab-pane label="切削力/功率" name="cutting">
        <CuttingForceCalculator />
      </el-tab-pane>
      <el-tab-pane label="单位换算" name="unit">
        <UnitConverter />
      </el-tab-pane>
      <el-tab-pane label="螺纹加工" name="thread">
        <ThreadCalculator />
      </el-tab-pane>
      <el-tab-pane label="曲面优化" name="surface">
        <SurfaceOptimization />
      </el-tab-pane>
      <el-tab-pane label="刀具寿命" name="toolLife">
        <ToolLifeCalculator />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import MaterialWeightCalculator from './components/MaterialWeightCalculator/index.vue'
import LaborCostCalculator from './components/LaborCostCalculator/index.vue'
import BallnoseStepHeightCalculator from './components/BallnoseStepHeightCalculator/index.vue'
import CuttingForceCalculator from './components/CuttingForceCalculator/index.vue'
import UnitConverter from './components/UnitConverter/index.vue'
import ThreadCalculator from './components/ThreadCalculator/index.vue'
import SurfaceOptimization from './components/SurfaceOptimization/index.vue'
import ToolLifeCalculator from './components/ToolLifeCalculator/index.vue'

const activeTab = ref('weight')
</script>

<style lang="scss">
.calculator-container .calculator-tabs {
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.calculator-container .calculator-tabs .el-tabs__header {
  margin-bottom: 0;
  background: #f8f9fb;
  border-radius: 10px;
  padding: 6px;
  border: none;
}

.calculator-container .calculator-tabs .el-tabs__nav-wrap::after {
  display: none;
}

.calculator-container .calculator-tabs .el-tabs__nav {
  border: none;
}

.calculator-container .calculator-tabs .el-tabs__item {
  padding: 0 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  height: 36px;
  line-height: 36px;
  transition: all 0.3s ease;
  border: none !important;
  color: #606266;
}

.calculator-container .calculator-tabs .el-tabs__item:hover {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.calculator-container .calculator-tabs .el-tabs__item.is-active {
  color: #fff !important;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.calculator-container .calculator-tabs .el-tabs__active-bar {
  display: none;
}

.calculator-container .calculator-tabs .el-tabs__content {
  padding: 16px 4px;
}

.calculator-container .calculator-tabs .el-tab-pane {
  display: block;
}
</style>
