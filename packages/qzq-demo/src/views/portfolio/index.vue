<template>
  <div class="app-wrapper">
    <nav>
      <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @select="handleOpen">
        <el-menu-item v-for="route in navRoutes" :key="route.path" :index="route.path">
          <span>{{ route.meta.title }}</span>
        </el-menu-item>
      </el-menu>
    </nav>
    <div style="margin-left: 200px">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

import { watch, ref, onMounted } from 'vue'
const defaultActive = ref('')
const navRoutes = ref([])
const router = useRouter()
const route = useRoute()

// 在组件挂载时初始化导航项，只计算一次
onMounted(() => {
  const findPortfolioRoute = (routes) => {
    for (const r of routes) {
      if (r.path === '/portfolio') {
        return r
      }
      if (r.children && r.children.length > 0) {
        const found = findPortfolioRoute(r.children)
        if (found) return found
      }
    }
    return null
  }

  const portfolioRoute = findPortfolioRoute(router.options.routes)
  if (portfolioRoute && portfolioRoute.children && portfolioRoute.children.length > 0) {
    navRoutes.value = portfolioRoute.children.filter((child) => !child.hidden).filter((child) => child.meta && child.meta.title)
  }
})
watch(
  () => route,
  (newVal, oldVal) => {
    defaultActive.value = newVal.path
  },
  {
    immediate: true,
  }
)

const handleOpen = (key, keyPath) => {
  router.push({
    path: key,
  })
}
</script>

<style scoped lang="scss">
.app-wrapper {
  position: relative;
}

nav {
  position: fixed;
  width: 200px;
  top: 60px;
  height: calc(100vh - 60px);
  left: 0;
  z-index: 1000;
  overflow: auto;

  .el-menu-vertical-demo {
    width: 100%;
    height: 100%;
    font-weight: bold;

    .el-menu-item.is-active {
      background-color: #87cefa;
    }
  }
}
</style>
