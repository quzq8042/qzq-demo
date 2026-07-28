<template>
  <div class="cutting-params">
    <div class="page-header">
      <div class="header-content">
        <div class="header-text">
          <h1>CNC加工参数参考</h1>
          <p>提供常见材料切削参数、刀具选择指南、主轴转速及进给量参考，适用于UG加工模块</p>
        </div>
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-value">16+</span>
            <span class="stat-label">材料类型</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">10+</span>
            <span class="stat-label">刀具类型</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">80+</span>
            <span class="stat-label">参数配置</span>
          </div>
        </div>
      </div>
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
import { Cpu } from '@element-plus/icons-vue'
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

  .page-header {
    margin-bottom: 24px;
    padding: 24px 28px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6b8dd6 100%);
    border-radius: 16px;
    color: #fff;
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
    }

    .header-text {
      h1 {
        font-size: 26px;
        margin: 0 0 10px 0;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 10px;

        .header-icon {
          font-size: 24px;
        }
      }

      p {
        font-size: 14px;
        margin: 0;
        opacity: 0.9;
        line-height: 1.6;
      }
    }

    .header-stats {
      display: flex;
      gap: 32px;

      .stat-item {
        text-align: center;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        padding: 12px 20px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.2);

        .stat-value {
          display: block;
          font-size: 24px;
          font-weight: 700;
          line-height: 1;
        }

        .stat-label {
          display: block;
          font-size: 12px;
          margin-top: 4px;
          opacity: 0.85;
        }
      }
    }
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

@media (max-width: 768px) {
  .cutting-params {
    .page-header {
      padding: 20px;

      .header-content {
        flex-direction: column;
        gap: 20px;
      }

      .header-stats {
        width: 100%;
        justify-content: center;
      }
    }
  }
}
</style>
