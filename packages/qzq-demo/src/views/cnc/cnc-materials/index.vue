<template>
  <div class="cnc-materials-container">
    <PageHeader>
      <template #actions>
        <el-input v-model="searchText" placeholder="搜索资料名称..." clearable style="width: 320px">
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <el-button type="primary" @click="resetSearch">重置</el-button>
      </template>
    </PageHeader>

    <div class="table-card">
      <el-table :data="filteredMaterials" style="width: 100%" border stripe highlight-current-row empty-text="暂无资料">
        <el-table-column type="index" label="序号" width="70" align="center" />
        <el-table-column prop="name" label="名称" min-width="260">
          <template #default="{ row }">
            <span class="material-name" v-html="highlightKeyword(row.name)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="extractCode" label="提取码" width="160" align="center">
          <template #default="{ row }">
            <el-tag type="info" size="large" effect="plain" class="extract-tag">
              {{ row.extractCode }}
              <el-icon class="copy-icon" @click="copyCode(row.extractCode)"><DocumentCopy /></el-icon>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" align="center">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleDownload(row)">
              <el-icon><Download /></el-icon>
              <span>下载</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div v-if="!filteredMaterials.length" class="no-result">
        <el-empty description="未找到匹配的资料，请尝试其他关键词" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, Download, DocumentCopy } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import PageHeader from '../components/PageHeader.vue'
import { materials } from './data.js'

const searchText = ref('')

const filteredMaterials = computed(() => {
  const keyword = searchText.value.trim().toLowerCase()
  if (!keyword) return materials
  return materials.filter((m) => m.name.toLowerCase().includes(keyword))
})

const highlightKeyword = (text) => {
  const keyword = searchText.value.trim().toLowerCase()
  if (!keyword) return text
  const regex = new RegExp(`(${keyword})`, 'gi')
  return String(text).replace(regex, '<span class="highlight">$1</span>')
}

const resetSearch = () => {
  searchText.value = ''
}

const copyCode = async (code) => {
  try {
    await navigator.clipboard.writeText(code)
    ElMessage.success(`提取码 ${code} 已复制到剪贴板`)
  } catch {
    ElMessage.warning('复制失败，请手动复制')
  }
}

const handleDownload = (row) => {
  window.open(row.url, '_blank')
}
</script>

<style lang="scss" scoped>
.cnc-materials-container {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  min-height: 100vh;
}

.table-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

  :deep(.el-table) {
    border-radius: 8px;
    overflow: hidden;

    th.el-table__cell {
      background: #f8f9fb;
      color: #2d3748;
      font-weight: 600;
    }

    .el-table__row:hover > td.el-table__cell {
      background: #f5f7ff;
    }
  }

  :deep(.highlight) {
    background-color: #ffeb3b;
    color: #d32f2f;
    font-weight: bold;
    padding: 0 2px;
    border-radius: 2px;
  }
}

.material-name {
  font-weight: 500;
  color: #2d3748;
}

.extract-tag {
  font-family: 'Consolas', 'Monaco', monospace;
  letter-spacing: 1px;

  .copy-icon {
    margin-left: 6px;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
      color: #667eea;
    }
  }
}

.no-result {
  padding: 20px 0;
}
</style>
