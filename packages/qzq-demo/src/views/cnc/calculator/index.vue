<template>
  <div class="calculator-container">
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
.calculator-tabs {
  margin: 0 auto;
}
</style>
