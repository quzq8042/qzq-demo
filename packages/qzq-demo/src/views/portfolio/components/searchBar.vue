<template>
  <div class="search-bar">
    <el-input
      v-model="keyword"
      placeholder="搜索商品名称或关键词"
      prefix-icon="el-icon-search"
      clearable
      @keyup.enter="handleSearch"
      @clear="handleSearch"
    />
    <el-button type="primary" @click="handleSearch">搜索</el-button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { debounce } from 'lodash'
import useProductStore from '@/store/modules/product'

const productStore = useProductStore()
const keyword = ref(productStore.searchKeyword)

// 监听store中搜索关键词的变化，更新本地状态
watch(
  () => productStore.searchKeyword,
  (newVal) => {
    if (newVal !== keyword.value) {
      keyword.value = newVal
    }
  }
)

// 防抖搜索函数
const debouncedSearch = debounce(() => {
  productStore.setSearchKeyword(keyword.value)
  productStore.fetchProducts()
}, 300)

// 监听关键词变化，触发防抖搜索
watch(keyword, (newVal) => {
  debouncedSearch()
})

// 处理搜索按钮点击
const handleSearch = () => {
  productStore.setSearchKeyword(keyword.value)
  productStore.fetchProducts()
}
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-bar .el-input {
  min-width: 300px;
}
</style>
