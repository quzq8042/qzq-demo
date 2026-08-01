<template>
  <div class="calculator-container">
    <PageHeader />
    <el-tabs v-model="activeTab" type="card" class="calculator-tabs">
      <el-tab-pane label="材料重量" name="weight">
        <MaterialWeightCalculator />
      </el-tab-pane>
      <el-tab-pane label="工时报价" name="labor">
        <LaborCostCalculator />
      </el-tab-pane>
      <el-tab-pane label="球刀加工步距与残余高度之间的换算" name="ballnose">
        <BallnoseStepHeightCalculator />
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

const activeTab = ref('weight')
</script>

<style lang="scss" scoped>
.calculator-container {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  min-height: 100vh;
}
.calculator-tabs {
  margin: 0 auto;
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
    padding: 0 20px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 6px;
    height: 36px;
    line-height: 36px;
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
</style>
