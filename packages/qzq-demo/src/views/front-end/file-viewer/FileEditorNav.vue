<template>
  <li ref="buttonRef" v-click-outside="onClickOutside" :class="[active ? 'active' : '']" @click="changeActiveFile">
    <span class="file-icon" v-html="fileIconHtml"></span>
    <span class="file-name">{{ fileName }}</span>
    <span class="close-btn" @click.stop="deleteFile(1)">x</span>
  </li>
  <el-popover ref="popoverRef" :virtual-ref="buttonRef" trigger="contextmenu" title="" virtual-triggering effect="dark">
    <div class="popover-content">
      <button @click="deleteFile(1)">关闭</button>
      <button @click="deleteFile(2)">关闭其他</button>
      <button @click="deleteFile(3)">关闭所有</button>
    </div>
  </el-popover>
</template>

<script setup>
import { computed, ref, unref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
const props = defineProps({
  fileName: {
    type: String,
    default: '',
  },
  fileType: {
    type: String,
    default: 'py',
  },
  fileKey: {
    type: String,
    default: '',
  },
  active: {
    type: Boolean,
    default: false,
  },
})
// 根据fileKey后缀获取文件类型

const emits = defineEmits(['changeActiveFile', 'deleteFiles'])
const changeActiveFile = () => {
  emits('changeActiveFile', props.fileKey)
}
// 1关闭 2关闭其他 3关闭所有
const deleteFile = (type) => {
  emits('deleteFiles', { key: props.fileKey, type })
}

const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}

import { getFileIconFromName } from 'atom-material-icons'
const fileIconHtml = computed(() => {
  const icon = getFileIconFromName(props.fileName)
  return icon.default
})
</script>

<style scoped lang="scss">
li {
  background-color: var(--tab-bg-color);
  border-bottom: 2px solid var(--tab-bg-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 0 10px;
  height: 50px;
  &:hover {
    background-color: var(--menu-bg-color-hover);
  }
  &.active {
    background-color: #2b2b2b;
    border-bottom: 2px solid var(--active-color);
  }

  span {
    &.file-icon {
      margin-right: 4px;
      display: flex;
      align-items: center;
    }
    &.file-name {
      margin-right: 4px;
      color: var(--active-color);
    }
    &.close-btn {
      color: #fff;
      margin-left: 10px;
    }
  }
}

.popover-content {
  display: flex;
  flex-direction: column;
  button {
    background: transparent;
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    text-align: left;
    cursor: pointer;
    border: 1px solid transparent;
    &:hover {
      border: 1px solid #f2f2f2;
      background-color: #2a2d2e;
    }
  }
}
</style>
