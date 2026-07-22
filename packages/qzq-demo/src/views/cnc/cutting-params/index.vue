<template>
  <div class="cutting-params">
    <div class="page-header">
      <h1>CNC加工参数参考</h1>
      <p>提供常见材料切削参数、刀具选择指南、主轴转速及进给量参考，适用于UG加工模块</p>
    </div>

    <el-tabs v-model="activeTab" type="card" class="tabs-container">
      <el-tab-pane label="常见材料切削参数" name="material">
        <MaterialCuttingParams />
      </el-tab-pane>
      <el-tab-pane label="刀具选择指南" name="tool">
        <ToolSelectionGuide />
      </el-tab-pane>
      <el-tab-pane label="主轴转速参考" name="spindle">
        <SpindleSpeedReference />
      </el-tab-pane>
      <el-tab-pane label="进给量参考" name="feed">
        <FeedRateReference />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MaterialCuttingParams from './components/material-cutting-params/index.vue'
import ToolSelectionGuide from './components/tool-selection-guide/index.vue'
import SpindleSpeedReference from './components/spindle-speed-reference/index.vue'
import FeedRateReference from './components/feed-rate-reference/index.vue'

const activeTab = ref('material')
</script>

<style lang="scss" scoped>
.cutting-params {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  min-height: 100vh;

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

  .tabs-container {
    :deep(.el-tabs__header) {
      margin-bottom: 20px;
    }

    :deep(.el-tabs__item) {
      padding: 0 24px;
      font-size: 14px;
    }

    :deep(.el-tabs__item.is-active) {
      color: #667eea;
    }

    :deep(.el-tabs__active-bar) {
      background-color: #667eea;
    }
  }
}
</style>
