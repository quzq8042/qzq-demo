<template>
  <div class="cutting-params">
    <PageHeader />

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
      <el-tab-pane label="模具钢" name="moldSteel">
        <MoldSteel />
      </el-tab-pane>
      <el-tab-pane label="铜铝料" name="copperAluminum">
        <CopperAluminum />
      </el-tab-pane>
      <el-tab-pane label="不锈钢" name="stainlessSteel">
        <StainlessSteel />
      </el-tab-pane>
      <el-tab-pane label="软钢" name="softSteel">
        <SoftSteel />
      </el-tab-pane>
      <el-tab-pane label="亚克力" name="acrylic">
        <Acrylic />
      </el-tab-pane>
      <el-tab-pane label="塑料类" name="plastic">
        <Plastic />
      </el-tab-pane>
      <el-tab-pane label="攻牙、铣牙" name="tapping">
        <Tapping />
      </el-tab-pane>
      <el-tab-pane label="U钻" name="uDrill">
        <UDrill />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import MaterialCuttingParams from './components/material-cutting-params/index.vue'
import ToolSelectionGuide from './components/tool-selection-guide/index.vue'
import SpindleSpeedReference from './components/spindle-speed-reference/index.vue'
import FeedRateReference from './components/feed-rate-reference/index.vue'
import MoldSteel from './components/mold-steel/index.vue'
import CopperAluminum from './components/copper-aluminum/index.vue'
import StainlessSteel from './components/stainless-steel/index.vue'
import SoftSteel from './components/soft-steel/index.vue'
import Acrylic from './components/acrylic/index.vue'
import Plastic from './components/plastic/index.vue'
import Tapping from './components/tapping/index.vue'
import UDrill from './components/u-drill/index.vue'

const activeTab = ref('material')
</script>

<style lang="scss" scoped>
.cutting-params {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  min-height: 100vh;

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
}
</style>
