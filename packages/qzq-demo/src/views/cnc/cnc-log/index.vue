<template>
  <div class="cnc-log-container">
    <h1 class="page-title">CNC 代码记录</h1>

    <div class="search-box">
      <el-input
        v-model="searchText"
        placeholder="搜索标题，如 G代码、M代码、程序示例..."
        clearable
        style="width: 400px"
        @keyup.enter="handleSearch"
        @input="handleInput"
      >
        <template #prefix>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </template>
      </el-input>
      <el-button type="primary" @click="handleSearch">搜索</el-button>

      <div v-if="showDropdown && searchResults.length > 0" class="search-dropdown">
        <div class="dropdown-header">找到 {{ searchResults.length }} 个结果：</div>
        <div v-for="(result, index) in searchResults" :key="index" class="dropdown-item" @click="scrollToTarget(result.id)">
          {{ result.title }}
        </div>
      </div>
    </div>

    <div v-for="section in sections" :id="section.id" :key="section.id" class="code-block">
      <h3><span class="anchor">#</span> {{ section.title }}</h3>
      <pre><code>{{ section.content }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { sections } from './data.js'
const searchText = ref('')
const showDropdown = ref(false)

const searchResults = computed(() => {
  if (!searchText.value.trim()) return []
  const keyword = searchText.value.toLowerCase()
  return sections.filter((section) => section.title.toLowerCase().includes(keyword))
})

const handleInput = () => {
  showDropdown.value = searchText.value.trim() !== ''
}

const handleSearch = () => {
  const keyword = searchText.value.trim()
  if (!keyword) return

  const results = searchResults.value
  if (results.length === 1) {
    scrollToTarget(results[0].id)
  } else if (results.length > 1) {
    showDropdown.value = true
  }
}

const scrollToTarget = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    element.classList.add('highlight')
    setTimeout(() => {
      element.classList.remove('highlight')
    }, 2000)
  }
  searchText.value = ''
  showDropdown.value = false
}
</script>

<style scoped>
.cnc-log-container {
  padding: 24px;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #667eea;
}

.search-box {
  position: relative;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 400px;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  z-index: 100;
  overflow: hidden;

  .dropdown-header {
    padding: 10px 16px;
    background: #f5f7fa;
    font-size: 13px;
    color: #909399;
    border-bottom: 1px solid #e4e7ed;
  }

  .dropdown-item {
    padding: 12px 16px;
    cursor: pointer;
    font-size: 14px;
    color: #606266;
    transition: all 0.2s;

    &:hover {
      background: #f5f7fa;
      color: #667eea;
    }
  }
}

.code-block {
  background: #1e1e1e;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  overflow-x: auto;
  transition: all 0.3s;

  &.highlight {
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
    background: #252526;
  }

  h3 {
    color: #61afef;
    font-size: 16px;
    margin-bottom: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;

    .anchor {
      color: #5c6370;
      font-size: 14px;
      opacity: 0;
      transition: opacity 0.2s;
    }

    &:hover .anchor {
      opacity: 1;
    }
  }

  pre {
    margin: 0;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.6;
    white-space: pre;

    code {
      color: #d4d4d4;
    }
  }
}
</style>
