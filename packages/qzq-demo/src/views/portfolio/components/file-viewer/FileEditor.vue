<template>
  <div ref="file_editor_ref" class="file-editor-ref"></div>
</template>

<script setup>
const props = defineProps({
  content: {
    type: String,
    default: '',
  },
  lang: {
    type: String,
    default: 'py',
  },
  isEdit: {
    type: Boolean,
    default: true,
  },
})
const file_editor_ref = ref(null)
let editor = ref(null)

import { basicSetup } from 'codemirror'
// import { language } from '@codemirror/language'
// import { acceptCompletion } from '@codemirror/autocomplete'

import { EditorState, Compartment } from '@codemirror/state'
import {
  EditorView,
  keymap,
  highlightSpecialChars,
  drawSelection,
  highlightActiveLine,
  dropCursor,
  rectangularSelection,
  crosshairCursor,
  lineNumbers,
  highlightActiveLineGutter,
} from '@codemirror/view'
import { defaultHighlightStyle, syntaxHighlighting, indentOnInput, bracketMatching, foldGutter, foldKeymap } from '@codemirror/language'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete'
// import { searchKeymap, highlightSelectionMatches } from '@codemirror/search'
// import { lintKeymap } from '@codemirror/lint'

import { javascript } from '@codemirror/lang-javascript'
import { html } from '@codemirror/lang-html'
import { python } from '@codemirror/lang-python'
import { sql } from '@codemirror/lang-sql'
import { css } from '@codemirror/lang-css'
import { json } from '@codemirror/lang-json'
import { markdown } from '@codemirror/lang-markdown'
import { yaml } from '@codemirror/lang-yaml'
import { go } from '@codemirror/lang-go'

const languageMap = {
  js: javascript(),
  html: html(),
  css: css(),
  py: python(),
  sql: sql(),
  json: json(),
  md: markdown(),
  yaml: yaml(),
  yml: yaml(),
  go: go(),
}

// 自定义样式

const customTheme = EditorView.theme({
  '&': {
    height: '100%',
    overflow: 'auto',
  },
  '.cm-scroller': {
    overflow: 'auto',
  },
  '.cm-content': {},
  '.cm-gutters': {
    backgroundColor: 'transparent',
    borderRightColor: 'transparent',
  },
  '.cm-activeLineGutter': {
    backgroundColor: 'transparent',
  },
  '.cm-line': {
    color: '#a9b7c6',
  },
  '.ͼg': {
    color: '#a9b7c6',
  },
  '.ͼc': {
    color: '#a9b7c6',
  },
  '.ͼl': {
    color: '#a9b7c6',
  },
})
const init = (lang) => {
  if (editor.value) editor.value.destroy()
  editor.value = new EditorView({
    parent: file_editor_ref.value,
    doc: props.content || '',
    editable: !props.isEdit,
    extensions: [
      basicSetup,
      languageMap[lang] || python(),
      lineNumbers(), // 显示行号
      customTheme,
      // foldGutter(), // 显示代码折叠标记
      // highlightSpecialChars(), // 高亮特殊字符
      // history(),
      // drawSelection(), // 自定义光标和选择
      // dropCursor(), //显示拖拽光标
      // EditorState.allowMultipleSelections.of(true), //允许多个光标和选择
      // indentOnInput(), // 根据输入自动缩进。
      // syntaxHighlighting(defaultHighlightStyle), // 语法高亮
      // bracketMatching(), // 匹配括号
      // closeBrackets(), // 自动关闭括号
      // autocompletion(), //自动补全
      // rectangularSelection(), // 允许矩形选择
      // crosshairCursor(), // 按住 Alt 键时显示十字光标
      // highlightActiveLine(), //  高亮当前行
      // highlightActiveLineGutter(), //高亮当前行的行号
      // highlightSelectionMatches(), // 高亮当前选中的文本
      keymap.of([
        // 自定义键盘映射
        // ...closeBracketsKeymap,// 括号自动补全
        // ...defaultKeymap, //键盘映射
        // ...searchKeymap, //  搜索相关关键
        // ...historyKeymap, // Redo/undo keys
        // ...foldKeymap, // 折叠
        // ...completionKeymap, // 自动补全
        // Keys related to the linter system
        // ...lintKeymap,
      ]),
    ],
  })
}
const getDoc = () => {
  return editor.value.state.doc.toString()
}

const setValue = (content) => {
  if (editor.value) {
    editor.value.dispatch({
      changes: {
        from: 0,
        to: editor.value.state.doc.length,
        insert: content || '',
      },
    })
  }
}

onMounted(() => {
  init(props.lang)
})
defineExpose({
  getDoc,
  setValue,
})
</script>

<style scoped lang="scss">
.file-editor-ref {
  height: 100%;
  &:deep(.cm-editor) {
    user-select: none;
  }
}
</style>
