<template>
  <router-view />
</template>

<script setup>
import { watchUpdate } from '@/utils/watchUpdate/index.js'
import { ElMessageBox } from 'element-plus'

const update = () => {
  // 代码更新通知更新
  const up = new watchUpdate()
  let hasDialogModel = false
  up.on('update', () => {
    if (!sessionStorage.getItem('NEEDUPDTE') && !hasDialogModel) {
      hasDialogModel = true
      ElMessageBox.confirm('系统已更新，需要刷新页面重新加载数据', '提示', {
        confirmButtonText: '刷新',
        cancelButtonText: '取消',
        customClass: 'custom-message-box custom-message-update-box',
        center: true,
      })
        .then(() => {
          hasDialogModel = false
          localStorage.clear()
          location.reload()
        })
        .catch(() => {
          hasDialogModel = false
          sessionStorage.setItem('NEEDUPDTE', true)
        })
    }
  })
}
if (import.meta.env.VITE_APP_ENV === 'production') {
  update()
}
</script>
