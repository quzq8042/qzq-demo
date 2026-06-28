<template>
  <div class="app-wrapper">
    <nav v-if="navRoutes.length > 0">
      <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @select="handleOpen">
        <el-menu-item v-for="route in navRoutes" :key="route.path" :index="route.path">
          <span>{{ route.meta.title }}</span>
        </el-menu-item>
      </el-menu>
    </nav>
    <div :class="['content-wrapper', { 'has-sidebar': navRoutes.length > 0 }]">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { watch, ref, computed } from 'vue'
import { getToken } from '@/utils/auth'
import { decrypt } from '@/utils/jsencrypt'

const defaultActive = ref('')
const navRoutes = ref([])
const router = useRouter()
const route = useRoute()

const sidebarRoutes = ['/cnc', '/front-end']

const findParentRoute = (routes, currentPath) => {
  for (const r of routes) {
    if (sidebarRoutes.includes(r.path) && currentPath.startsWith(r.path)) {
      return r
    }
    if (r.children && r.children.length > 0) {
      const found = findParentRoute(r.children, currentPath)
      if (found) return found
    }
  }
  return null
}

const updateNavRoutes = (currentPath) => {
  const token = getToken()
  const isQz = token ? decrypt(token) === import.meta.env.VITE_APP_LOGINNAME_ADMIN : false

  const parentRoute = findParentRoute(router.options.routes, currentPath)
  if (parentRoute && parentRoute.children && parentRoute.children.length > 0) {
    navRoutes.value = parentRoute.children
      .filter((child) => !child.hidden)
      .filter((child) => {
        if (!isQz && child.meta?.requireQz) {
          return false
        }
        return true
      })
      .filter((child) => child.meta && child.meta.title)
  } else {
    navRoutes.value = []
  }
}

watch(
  () => route.path,
  (newPath) => {
    defaultActive.value = newPath
    updateNavRoutes(newPath)
  },
  { immediate: true }
)

const handleOpen = (key) => {
  router.push({ path: key })
}
</script>

<style scoped lang="scss">
.app-wrapper {
  position: relative;
}

.content-wrapper {
  padding: 24px;
  min-height: calc(100vh - var(--header-height));
  box-sizing: border-box;
  transition: margin-left 0.3s ease;

  &.has-sidebar {
    margin-left: var(--sidebar-width);
  }
}

nav {
  position: fixed;
  width: var(--sidebar-width);
  top: var(--header-height);
  height: calc(100vh - var(--header-height));
  left: 0;
  z-index: 1000;
  overflow: auto;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1), inset -2px 0 10px rgba(255, 255, 255, 0.05);

  .el-menu-vertical-demo {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    padding: 16px 0;

    .el-menu-item {
      height: 48px;
      line-height: 48px;
      margin: 4px 12px;
      border-radius: 12px;
      color: #333333;
      font-weight: 500;
      font-size: 15px;
      transition: all 0.3s ease;
      border: none;
      background: transparent;

      &:hover {
        background: rgba(135, 206, 250, 0.15);
        color: #333333;
        font-weight: bold;
        transform: translateX(8px);
        box-shadow: 0 4px 15px rgba(135, 206, 250, 0.2);
      }

      &.is-active {
        background: linear-gradient(135deg, rgba(135, 206, 250, 0.3) 0%, rgba(70, 130, 180, 0.4) 100%);
        color: #4f3d3d;
        font-weight: bold;
        box-shadow: 0 4px 20px rgba(135, 206, 250, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(135, 206, 250, 0.3);
      }

      span {
        margin-left: 8px;
      }
    }
  }
}

// 滚动条美化
nav::-webkit-scrollbar {
  width: 6px;
}

nav::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

nav::-webkit-scrollbar-thumb {
  background: rgba(135, 206, 250, 0.4);
  border-radius: 3px;

  &:hover {
    background: rgba(135, 206, 250, 0.6);
  }
}
</style>
