<template>
  <div class="cad-shortcut-key">
    <div class="search-container">
      <h1>CNC</h1>
      <el-input v-model="searchText" placeholder="搜索代码" clearable style="width: 300px" />
      <el-button type="primary" @click="resetSearch">重置</el-button>
      <el-button type="success" icon="Download" @click="exportMarkdown">导出 Markdown</el-button>
      <el-button type="warning" icon="Download" @click="exportExcel">导出 Excel</el-button>
    </div>

    <!-- 全局搜索结果 -->
    <div v-if="debouncedKeyword && hasSearchResults" class="search-result">
      <!-- 表格数据搜索结果 -->
      <div v-if="tableSearchResults.length">
        <h3>代码搜索结果（共 {{ tableSearchResults.length }} 条）</h3>
        <el-table :data="tableSearchResults" border style="width: 100%">
          <el-table-column v-for="col in searchResultColumns" :key="col.prop" v-bind="col">
            <template #default="{ row }">
              <span v-html="highlightKeyword(row[col.prop])"></span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 螺丝攻牙钻孔对照表搜索结果 -->
      <div v-if="screwTableSearchResults.length" class="image-search-result">
        <h3>螺丝攻牙钻孔对照表搜索结果（共 {{ screwTableSearchResults.length }} 条）</h3>
        <el-table :data="screwTableSearchResults" border style="width: 100%">
          <el-table-column v-for="(col, index) in screwTableColumns" :key="col.prop || `empty-${index}`" v-bind="col">
            <template #default="{ row }">
              <span v-if="col.prop" v-html="highlightKeyword(row[col.prop])"></span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 图片数据搜索结果 -->
      <div v-if="Object.keys(imageSearchResults).length" class="image-search-result">
        <h3>图片搜索结果（共 {{ Object.keys(imageSearchResults).length }} 条）</h3>
        <div class="image-grid">
          <div v-for="(img, fileName) in imageSearchResults" :key="fileName" class="image-item" @click="openImagePreview(img, fileName)">
            <img :src="img" :alt="fileName" class="thumbnail" />
            <span class="image-name" :title="fileName">{{ fileName }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索无结果提示 -->
    <div v-else-if="debouncedKeyword" class="no-result">
      <el-empty description="未找到匹配的命令，请尝试其他关键词" />
    </div>

    <!-- 原始标签页 -->
    <el-tabs v-else v-model="activeTab" type="card">
      <el-tab-pane v-for="tab in tabs" :key="tab.name" :label="tab.label" :name="tab.name">
        <template v-if="['code1', 'code2', 'code33'].includes(tab.name)">
          <el-table :data="tab.data" border style="width: 100%">
            <el-table-column type="index" label="序号" width="80" />
            <el-table-column v-for="col in tab.columns" :key="col.prop" v-bind="col" />
          </el-table>
        </template>
        <template v-else-if="tab.name === 'code3'">
          <div class="image-grid">
            <div v-for="(img, fileName) in tab.data" :key="fileName" class="image-item" @click="openImagePreview(img, fileName)">
              <img :src="img" :alt="fileName" class="thumbnail" />
              <span class="image-name" :title="fileName">{{ fileName }}</span>
            </div>
          </div>
        </template>
        <template v-else-if="tab.name === 'code4'">
          <code4 :data="tab.data" />
        </template>
      </el-tab-pane>
    </el-tabs>

    <!-- 图片预览弹窗 -->
    <Teleport to="body">
      <div v-if="previewVisible" class="image-preview-overlay" @click="closePreview">
        <div class="image-preview-container" @click.stop>
          <button class="image-preview-close-btn" @click="closePreview">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <img :src="previewImage" :alt="previewFileName" class="image-preview-image" />
          <span class="image-preview-caption">{{ previewFileName }}</span>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { tabs } from './data.js'
import code4 from './components/code4.vue'
import { useSearch } from './hooks/useSearch.js'
import { useExport } from './hooks/useExport.js'
import { useImagePreview } from './hooks/useImagePreview.js'

const activeTab = ref('code1')

const { searchText, debouncedKeyword, highlightKeyword, tableSearchResults, imageSearchResults, screwTableSearchResults, resetSearch } =
  useSearch(tabs)

const { exportMarkdown, exportExcel } = useExport(tabs)

const { previewVisible, previewImage, previewFileName, openImagePreview, closePreview } = useImagePreview()

const hasSearchResults = computed(() => {
  return tableSearchResults.value.length > 0 || Object.keys(imageSearchResults.value).length > 0 || screwTableSearchResults.value.length > 0
})

const searchResultColumns = [
  { prop: 'category', label: '分类', width: 200 },
  { prop: 'code', label: '代码', width: 250 },
  { prop: 'description', label: '注解' },
]

const screwTableColumns = [
  { prop: 'coarse_spec', label: '公制粗螺纹规格(单位:mm)', width: 120 },
  { prop: 'coarse_std', label: '标准径', width: 100 },
  { prop: 'coarse_max', label: '最大', width: 100 },
  { prop: 'coarse_min', label: '最小', width: 100 },
  { width: 60 },
  { prop: 'fine_spec', label: '公制细螺纹规格(单位:mm)', width: 120 },
  { prop: 'fine_std', label: '标准径', width: 100 },
  { prop: 'fine_max', label: '最大', width: 100 },
  { prop: 'fine_min', label: '最小', width: 100 },
]
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

    :deep(.highlight) {
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

  .image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 20px;
    padding: 20px;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
    border-radius: 12px;
    min-height: 200px;
  }

  .image-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    border-radius: 12px;
    padding: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(-2px);
    }
  }

  .thumbnail {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 8px;
    transition: transform 0.3s ease;
  }

  .image-item:hover .thumbnail {
    transform: scale(1.05);
  }

  .image-name {
    font-size: 12px;
    color: #666;
    text-align: center;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>

<style lang="scss">
.image-preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: imageFadeIn 0.2s ease;
}

.image-preview-container {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: imageZoomIn 0.3s ease;
}

.image-preview-close-btn {
  position: absolute;
  top: -40px;
  right: 0;
  width: 36px;
  height: 36px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
  }
}

.image-preview-image {
  max-width: 100%;
  max-height: 85vh;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.image-preview-caption {
  color: #fff;
  font-size: 14px;
  margin-top: 16px;
  text-align: center;
  max-width: 600px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@keyframes imageFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes imageZoomIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.image-search-result {
  margin-top: 20px;
}
</style>
