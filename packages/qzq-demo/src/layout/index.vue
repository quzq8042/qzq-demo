<template>
  <div class="app-container">
    <!-- 头部导航 -->
    <!-- <header class="app-header">
      <nav class="header-nav">
        <router-link v-for="route in navRoutes" :key="route.path" :to="route.path" class="nav-item" active-class="active">
          {{ route.meta.title }}
        </router-link>
      </nav>
    </header> -->

    <div id="app-main">
      <router-view v-slot="{ Component, route }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="tagsViewStore.cachedViews">
            <component :is="Component" v-if="!route.meta.link" :key="route.path" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import useTagsViewStore from '@/store/modules/tagsView'

const tagsViewStore = useTagsViewStore()
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
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-nav {
  height: 100%;
  line-height: 60px;
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

#app-main {
  width: 100%;
  position: relative;
  flex: 1;
  min-height: calc(100vh - 60px); /* 添加固定最小高度 */
  overflow-y: auto;
  overflow-x: hidden;
}

.fixed-header + #app-main {
  padding-top: 60px;
}
</style>
