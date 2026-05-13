<template>
  <div class="cad-shortcut-key">
    <div class="search-container">
      <h1>CAD快捷命令</h1>
      <el-input v-model="searchText" placeholder="搜索命令" clearable style="width: 300px" />
      <el-button type="primary" @click="resetSearch">重置</el-button>
    </div>

    <!-- 全局搜索结果 -->
    <div v-if="debouncedKeyword && globalSearchResults.length" class="search-result">
      <h3>搜索结果（共 {{ globalSearchResults.length }} 条）</h3>
      <el-table :data="globalSearchResults" border style="width: 100%">
        <el-table-column v-for="col in searchResultColumns" :key="col.prop" :prop="col.prop" :label="col.label" :width="col.width">
          <template #default="{ row }">
            <span v-html="highlightKeyword(row[col.prop])"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 搜索无结果提示 -->
    <div v-else-if="debouncedKeyword" class="no-result">
      <el-empty description="未找到匹配的命令，请尝试其他关键词" />
    </div>

    <!-- 原始标签页 -->
    <el-tabs v-else v-model="activeTab" type="card">
      <el-tab-pane v-for="tab in tabs" :key="tab.name" :label="tab.label" :name="tab.name">
        <el-table :data="tab.data" border style="width: 100%">
          <el-table-column v-for="col in tab.columns" :key="col.prop" v-bind="col" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { tabs } from './data'

const activeTab = ref('draw')
const searchText = ref('')
const debouncedKeyword = ref('')

// 防抖函数
let debounceTimer = null
const debounce = (fn, delay = 300) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(fn, delay)
}

// 监听搜索文本变化，使用防抖
watch(searchText, (val) => {
  debounce(() => {
    debouncedKeyword.value = val.toLowerCase().trim()
  })
})

// 组件卸载时清除定时器
onUnmounted(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})

// 搜索结果表格列配置
const searchResultColumns = [
  { prop: 'category', label: '分类', width: 120 },
  { prop: 'command', label: '快捷命令/快捷键', width: 150 },
  { prop: 'function', label: '功能', width: 150 },
  { prop: 'description', label: '描述' },
]

// 高亮关键词函数
const highlightKeyword = (text) => {
  if (!debouncedKeyword.value) return text
  const regex = new RegExp(`(${debouncedKeyword.value})`, 'gi')
  return String(text).replace(regex, '<span class="highlight">$1</span>')
}

// 全局搜索结果
const globalSearchResults = computed(() => {
  const keyword = debouncedKeyword.value
  if (!keyword) return []

  const results = []
  tabs.forEach((tab) => {
    tab.data.forEach((item) => {
      if (Object.values(item).some((val) => String(val).toLowerCase().includes(keyword))) {
        results.push({
          category: tab.label,
          command: item.command || item.shortcut,
          function: item.function || '-',
          description: item.description,
        })
      }
    })
  })
  return results
})
const resetSearch = () => {
  searchText.value = ''
  debouncedKeyword.value = ''
}
</script>

<style lang="scss" scoped>
.cad-shortcut-key {
  padding: 20px;
  .search-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    gap: 20px;
    h1 {
      font-size: 24px;
      font-weight: bold;
    }
  }
  .search-result {
    margin-bottom: 20px;
    h3 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #666;
    }
    .highlight {
      background-color: #ffeb3b;
      color: #d32f2f;
      font-weight: bold;
      padding: 0 2px;
      border-radius: 2px;
    }
  }
  .no-result {
    padding: 40px 0;
    text-align: center;
  }
}
</style>
