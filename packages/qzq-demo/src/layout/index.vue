<template>
  <div class="app-container">
    <!-- 头部导航 -->
    <Header />

    <div id="app-main">
      <router-view v-slot="{ Component, route }">
        <keep-alive :include="tagsViewStore.cachedViews">
          <component :is="Component" v-if="!route.meta.link" :key="route.path" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import Header from './components/header/index.vue'
import useTagsViewStore from '@/store/modules/tagsView'

const tagsViewStore = useTagsViewStore()
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

#app-main {
  width: 100%;
  position: relative;
  flex: 1;
  min-height: calc(100vh - var(--header-height)); /* 添加固定最小高度 */
  overflow-y: auto;
  overflow-x: hidden;
}

.fixed-header + #app-main {
  padding-top: var(--header-height);
}
</style>
