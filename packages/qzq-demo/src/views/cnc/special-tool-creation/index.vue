<template>
  <div class="tool-template">
    <PageHeader />

    <el-tabs v-model="activeTab" type="card" class="tabs-container">
      <el-tab-pane v-for="tool in toolTypes" :key="tool.key" :label="tool.data.type" :name="tool.key">
        <ToolDetail :data="tool.data" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import ToolDetail from './components/ToolDetail.vue'
import { toolTypes } from './data.js'

const activeTab = ref('innerR')
</script>

<style lang="scss" scoped>
.tool-template {
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
