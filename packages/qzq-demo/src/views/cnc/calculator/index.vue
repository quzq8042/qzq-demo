<template>
  <div class="calculator-container">
    <div class="page-header">
      <h1>计算器</h1>
      <p>简单的 CNC 材料重量计算工具，方便计算</p>
    </div>
    <el-tabs v-model="activeTab" type="card" class="calculator-tabs">
      <el-tab-pane label="材料重量" name="weight">
        <MaterialWeightCalculator />
      </el-tab-pane>
      <el-tab-pane label="工时报价" name="labor">
        <LaborCostCalculator />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MaterialWeightCalculator from './components/MaterialWeightCalculator/index.vue'
import LaborCostCalculator from './components/LaborCostCalculator/index.vue'

const activeTab = ref('weight')
</script>

<style lang="scss" scoped>
.calculator-container {
  padding: 20px;
}
.calculator-tabs {
  margin: 0 auto;
}
.page-header {
  margin-bottom: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: #fff;

  h1 {
    font-size: 24px;
    margin: 0 0 8px 0;
    font-weight: bold;
  }

  p {
    font-size: 14px;
    margin: 0;
    opacity: 0.9;
  }
}
</style>
