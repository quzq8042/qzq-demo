<template>
  <header class="app-header">
    <nav class="header-nav">
      <router-link v-for="route in navRoutes" :key="route.path" :to="route.path" class="nav-item" active-class="active">
        {{ route.meta.title }}
      </router-link>
    </nav>
    <div class="header-right">
      <time-picker class="time-picker"></time-picker>
      <el-button type="primary" @click="handleLogout">退出登录</el-button>
    </div>
  </header>
</template>

<script setup>
import TimePicker from '../time-picker/index.vue'
const router = useRouter()

// 从路由配置中提取导航项
const navRoutes = computed(() => {
  return router.options.routes
    .flatMap((route) => {
      // 处理嵌套路由
      if (route.children && route.children.length > 0) {
        return route.children.filter((child) => !child.hidden)
      }
      return route.hidden ? [] : [route]
    })
    .filter((route) => route.meta && route.meta.title)
})
import useUserStore from '@/store/modules/user'
import { ElMessage, ElMessageBox } from 'element-plus'
const handleLogout = () => {
  ElMessageBox.confirm('是否确认退出登录?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      useUserStore()
        .logOut()
        .then(() => {
          router.push({ path: '/login' })
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })
}
</script>

<style lang="scss" scoped>
/* 这里是组件的样式 */
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  padding: 0 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-nav {
  height: 100%;
  line-height: var(--header-height);
  display: flex;
  gap: 10px;
}

.nav-item {
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    border-bottom: 2px solid #ffffff;
  }

  &.active {
    border-bottom: 2px solid #ffffff;

    font-weight: bold;
  }
}
.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
