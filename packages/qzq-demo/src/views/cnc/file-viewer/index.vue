<template>
  <div class="file-browser">
    <div class="browser-header">
      <div class="header-left">
        <div class="logo-icon">
          <el-icon><UploadFilled /></el-icon>
        </div>
        <span class="header-title">文件管理</span>
      </div>
      <div class="header-right">
        <span class="file-count">共 {{ fileCount }} 个文件</span>
      </div>
    </div>

    <div class="browser-content">
      <div class="file-tree-wrapper">
        <div class="tree-header">
          <div class="header-actions">
            <button class="action-btn active">
              <el-icon><List /></el-icon>
              <span>列表</span>
            </button>
          </div>
        </div>

        <div class="tree-content">
          <div v-if="loading" class="loading-state">
            <div class="loading-spinner"></div>
            <p>加载中...</p>
          </div>

          <div v-else-if="error" class="error-state">
            <div class="error-icon">
              <el-icon><CircleCloseFilled /></el-icon>
            </div>
            <p>{{ error }}</p>
            <button class="retry-btn" @click="loadFileTree">重新加载</button>
          </div>

          <template v-else>
            <div v-for="(item, index) in fileTreeData" :key="item.path" class="tree-item">
              <div class="custom-tree-node" @click="handleNodeClick(item)">
                <span class="node-number">{{ index + 1 }}</span>
                <span class="node-label">{{ item.name }}</span>
              </div>

              <div v-if="item.type === 'folder' && item.children?.length && expandedFolders.includes(item.path)" class="children-container">
                <div v-for="(child, childIndex) in item.children" :key="child.path" class="tree-child">
                  <div class="custom-tree-node child-node" @click="handleNodeClick(child)">
                    <span class="node-number">{{ index + 1 }}.{{ childIndex + 1 }}</span>
                    <span class="node-label">{{ child.name }}</span>
                    <button v-if="child.type === 'file'" class="download-action" @click.stop="downloadFile(child)">
                      <Download />
                    </button>
                  </div>

                  <div
                    v-if="child.type === 'folder' && child.children?.length && expandedFolders.includes(child.path)"
                    class="children-container nested"
                  >
                    <div v-for="(nested, nestedIndex) in child.children" :key="nested.path" class="tree-child">
                      <div class="custom-tree-node child-node" @click="handleNodeClick(nested)">
                        <span class="node-number">{{ index + 1 }}.{{ childIndex + 1 }}.{{ nestedIndex + 1 }}</span>
                        <span class="node-label">{{ nested.name }}</span>
                        <button class="download-action" @click.stop="downloadFile(nested)">
                          <Download />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="fileTreeData.length === 0" class="empty-state">
              <div class="empty-icon">
                <FolderOpen />
              </div>
              <p>暂无文件</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const fileTreeData = ref([])
const expandedFolders = ref([])
const loading = ref(true)
const error = ref(null)

const fileCount = computed(() => {
  let count = 0
  const countFiles = (items) => {
    items.forEach((item) => {
      if (item.type === 'file') count++
      if (item.children?.length) countFiles(item.children)
    })
  }
  countFiles(fileTreeData.value)
  return count
})

const collectFolders = (items) => {
  const folders = []
  items.forEach((item) => {
    if (item.type === 'folder' && item.children?.length) {
      folders.push(item.path)
      if (item.children) {
        folders.push(...collectFolders(item.children))
      }
    }
  })
  return folders
}

const loadFileTree = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch('/api/files')
    if (!response.ok) {
      throw new Error('加载文件列表失败')
    }
    const data = await response.json()
    fileTreeData.value = data
    expandedFolders.value = collectFolders(data)
  } catch (err) {
    error.value = err.message
    console.error('加载文件树失败:', err)
  } finally {
    loading.value = false
  }
}

const handleNodeClick = (item) => {
  if (item.type === 'folder') {
    toggleExpand(item)
  } else if (item.type === 'file') {
    downloadFile(item)
  }
}

const toggleExpand = (item) => {
  const index = expandedFolders.value.indexOf(item.path)
  if (index > -1) {
    expandedFolders.value.splice(index, 1)
  } else {
    expandedFolders.value.push(item.path)
  }
}

const downloadFile = (file) => {
  const link = document.createElement('a')
  link.href = file.url
  link.download = file.name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

onMounted(() => {
  loadFileTree()
})
</script>

<style lang="scss" scoped>
.file-browser {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--header-height) - 52px);
  background: #f8fafc;
}

.browser-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.file-count {
  font-size: 13px;
  color: #64748b;
  background: #f1f5f9;
  padding: 6px 14px;
  border-radius: 20px;
}

.browser-content {
  flex: 1;
  padding: 24px;
  overflow: auto;
}

.file-tree-wrapper {
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.tree-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
  background: #fafbfc;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  color: #64748b;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #334155;
  }

  &.active {
    background: #e0e7ff;
    color: #4f46e5;
  }

  svg {
    width: 16px;
    height: 16px;
  }
}

.tree-content {
  padding: 8px 0;
}

.tree-item {
  border-bottom: 1px solid #f1f5f9;
  overflow-y: auto;

  &:last-child {
    border-bottom: none;
  }
}

.custom-tree-node {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
  }

  &.child-node {
    padding-left: 48px;
  }
}

.expand-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #64748b;
  }

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;

    &.rotated {
      transform: rotate(90deg);
    }
  }
}

.expand-placeholder {
  width: 24px;
  height: 24px;
}

.node-number {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  margin-right: 10px;
  flex-shrink: 0;

  .custom-tree-node:hover & {
    background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  }
}

.node-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-right: 12px;
  transition: all 0.2s ease;

  svg {
    width: 18px;
    height: 18px;
  }

  .custom-tree-node:hover & {
    transform: scale(1.05);
  }
}

.custom-tree-node:has(.expand-icon:hover) .node-icon,
.custom-tree-node:hover .node-icon {
  transform: scale(1.05);
}

.node-icon.file-initial {
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
}

.tree-item:first-child .node-icon {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);

  svg {
    color: #d97706;
  }
}

.tree-item:nth-child(2) .node-icon {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);

  svg {
    color: #2563eb;
  }
}

.tree-item:nth-child(3) .node-icon {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);

  svg {
    color: #059669;
  }
}

.tree-item:nth-child(4) .node-icon {
  background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);

  svg {
    color: #db2777;
  }
}

.tree-item:nth-child(5) .node-icon {
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);

  svg {
    color: #4f46e5;
  }
}

.child-node .node-icon {
  background: #f1f5f9 !important;

  svg {
    color: #64748b !important;
  }
}

.node-label {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #334155;
}

.download-action {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: #f1f5f9;
  border-radius: 10px;
  cursor: pointer;
  opacity: 0;
  transform: translateX(8px);
  transition: all 0.2s ease;

  svg {
    width: 16px;
    height: 16px;
    color: #64748b;
  }

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

    svg {
      color: #fff;
    }
  }
}

.custom-tree-node:hover .download-action {
  opacity: 1;
  transform: translateX(0);
}

.children-container {
  background: #fafbfc;
  border-left: 2px solid #e2e8f0;

  &.nested {
    background: #f1f5f9;
    border-left-color: #cbd5e1;
  }
}

.tree-child {
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
}

.empty-icon {
  width: 80px;
  height: 80px;
  background: #f1f5f9;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 32px;
  margin-bottom: 16px;
}

.empty-state p {
  font-size: 14px;
  color: #94a3b8;
}

.loading-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-state p {
  font-size: 14px;
  color: #94a3b8;
}

.error-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
}

.error-icon {
  width: 80px;
  height: 80px;
  background: #fef2f2;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ef4444;
  font-size: 32px;
  margin-bottom: 16px;
}

.error-state p {
  font-size: 14px;
  color: #ef4444;
  margin-bottom: 16px;
}

.retry-btn {
  padding: 10px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
}
</style>
