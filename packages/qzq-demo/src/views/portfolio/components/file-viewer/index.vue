<template>
  <div class="files-page-box">
    <div>
      <div class="btns-box">
        <el-button class="btn-up" @click="createFileInput()">上传文件</el-button>
      </div>
    </div>
    <div class="file-box">
      <div class="file-list">
        <div class="file-list-title">文件查看器</div>
        <div v-if="files">
          <el-tree style="max-width: 600px" :data="files" :props="defaultProps" @node-click="handleNodeClick">
            <template #default="{ node }">
              <span class="file-tree-node">
                <span class="file-icon" v-html="fileIconHtml(node)"></span>
                <span class="file-tree-node-name">{{ node.label }}</span>
              </span>
            </template>
          </el-tree>
        </div>
      </div>
      <div class="file-editor">
        <ul class="file-editor-nav">
          <template v-for="key in Object.keys(FileEditorList)" :key="key">
            <FileEditorNav
              :file-key="key"
              :file-type="getFileType(key)"
              :file-name="FileEditorList[key].name"
              :active="activeFileEditor === key"
              @changeActiveFile="changeActiveFileEditor"
              @deleteFiles="deleteFilesEditor"
            ></FileEditorNav>
          </template>
        </ul>

        <div v-for="key in Object.keys(FileEditorList)" :key="key" class="file-edit-box">
          <FileEditor
            v-show="key === activeFileEditor"
            :ref="(el) => setItemRef(key, el)"
            :content="FileEditorList[key]?.content || ''"
            :lang="getFileType(key)"
          ></FileEditor>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 根据文件path获取文件类型
const getFileType = computed(() => (path) => {
  return path.split('.').pop().toLowerCase()
})

// ==========文件目录start ==================
const files = ref(null)
const createFileInput = async () => {
  // file api
  // 句柄
  const handle = await showDirectoryPicker()
  await processHandle(handle)
  files.value = handle.children
}

const processHandle = async (handle) => {
  if (handle.kind === 'file') {
    return
  }
  handle.children = []
  // 异步迭代器
  const values = await handle.values()
  for await (const item of values) {
    handle.children.push(item)
    await processHandle(item) // 递归处理子目录
  }
}

const defaultProps = {
  children: 'children',
  label: 'name',
}

let FileEditorList = reactive({})
let activeFileEditor = ref(null)
const handleNodeClick = async (item) => {
  if (item.kind === 'directory') {
    return
  }
  const file = await item.getFile()

  // 使用文件的唯一路径作为key（通过构建完整路径）
  const filePath = await getFilePath(item)

  // 检查文件是否已在编辑器中打开
  if (FileEditorList[filePath]) {
    // 如果已打开，切换到该标签页
    activeFileEditor.value = filePath
    return
  }

  // 读取文件内容
  const reader = new FileReader()
  reader.onload = (e) => {
    // 将文件添加到编辑器列表
    FileEditorList[filePath] = {
      name: file.name,
      content: e.target.result,
      file: file,
    }
    // 设置为活动标签页
    activeFileEditor.value = filePath
  }
  reader.readAsText(file)
}

// 递归获取文件的完整路径
const getFilePath = async (item) => {
  if (!item.parent) {
    return item.name
  }
  const parentPath = await getFilePath(item.parent)
  return parentPath + '/' + item.name
}

import { getFileIconFromName, getFolderIconFromName } from 'atom-material-icons'
const fileIconHtml = computed(() => (item) => {
  const icon = item.data.items ? getFolderIconFromName(item.data.name) : getFileIconFromName(item.data.name)
  return icon.default
})

// ==========文件目录 end=====================

// ========== 文件页签 start===============
import FileEditorNav from './FileEditorNav.vue'

const changeActiveFileEditor = (key) => {
  activeFileEditor.value = key
}
const deleteFilesEditor = (value) => {
  const { key, type } = value
  let allkeysArr = Object.keys(FileEditorList)
  let keys = []
  let acitveindex = allkeysArr.findIndex((item) => item === key)
  switch (type) {
    case 1:
      keys = [key]
      acitveindex =
        key === activeFileEditor.value ? allkeysArr[acitveindex - 1] || allkeysArr[acitveindex + 1] || null : activeFileEditor.value
      break
    case 2:
      keys = allkeysArr.filter((ele) => ele !== key)
      acitveindex = key
      break
    case 3:
      keys = allkeysArr
      acitveindex = null
      break
    default:
      break
  }
  keys.map((key) => {
    delete FileEditorList[key]
  })
  changeActiveFileEditor(acitveindex || null)
}

// ========== 文件页签 end===============

// ========= 文件编辑器 start=====================

import FileEditor from './FileEditor.vue'
import { useRoute } from 'vue-router'
let FileEditor_refs = reactive({})
// 设置每个编辑器的ref
const setItemRef = (key, el) => {
  if (el) {
    FileEditor_refs[key] = el
  } else {
    delete FileEditor_refs[key]
  }
}

onBeforeUpdate(() => {
  FileEditor_refs = {}
})
// ========= 文件编辑器 end=====================
</script>

<style scoped lang="scss">
.files-page-box {
  & > div {
    &:nth-of-type(1) {
      display: flex;
      padding: 20px;
      justify-content: space-between;
    }
  }
  .btns-box {
    .btn-up {
      background: #29a4a4;
      height: 36px;
      padding: 0 16px;
      border-radius: 5px;
      color: #ffffff;
      line-height: 36px;
      border: none;
    }
  }
}

// =========
.file-box {
  --menu-bg-color: #252526;
  --content-bg-color: #2b2b2b;
  --font-color: rgb(169, 183, 198);
  --menu-bg-color-hover: rgba(255, 255, 255, 0.05);
  --active-color: #409eff;
  --tab-bg-color: rgba(49, 51, 53, 1);
  --menu-width: 237px;
  height: calc(100vh - var(--headerHeight));
  display: flex;
  .file-list {
    .file-list-title {
      color: var(--font-color);
      font-size: 16px;
      font-weight: 500;
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      border-bottom: 1px solid var(--tab-bg-color);
    }
  }
  & > div {
    &:nth-of-type(1) {
      flex-shrink: 0;
      width: var(--menu-width);
      background-color: var(--menu-bg-color);
      user-select: none;
      color: var(--font-color);
      border-right: 1px solid var(--tab-bg-color);
    }
    &:nth-of-type(2) {
      flex: 1;
      background-color: var(--content-bg-color);
    }
  }
  &:deep(.el-tree) {
    --el-tree-node-hover-bg-color: var(--menu-bg-color-hover);
    --el-fill-color-blank: transparent;
    --el-tree-text-color: var(--font-color);
  }
}
.file-search {
  display: flex;
  .search-input:deep(.el-input__wrapper) {
    margin-right: 10px;
    height: 30px;
    width: calc(100% - 30px);
    background-color: #3c3c3c;
    box-shadow: none;
    border: 1px solid #c0c4cc;
    // padding-left: 30px;
    outline: none;
    input {
      color: #c0c4cc;
    }
    input::placeholder {
      color: #c0c4cc;
    }
  }
}
.expand-btn {
  width: 30px;
  height: 30px;
  color: #c0c4cc;
  font-size: large;
  line-height: 30px;
}
.file-tree-node {
  display: flex;
  align-items: center;
  overflow: hidden;
  .file-icon {
    display: flex;
    align-items: center;
    margin-right: 4px;
  }
}

.file-editor {
  height: calc(100vh - var(--headerHeight));
  position: relative;
}
.file-editor-nav {
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  align-items: center;
  padding-left: 10px;
  height: 50px;
  background-color: var(--menu-bg-color);
  // width: calc(100% - var(--menu-width));
  overflow: hidden;
}

.file-edit-box {
  max-height: calc(100% - 30px);
  position: relative;
  overflow-y: auto;
}
</style>
