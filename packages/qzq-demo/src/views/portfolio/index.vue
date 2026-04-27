<template>
  <div class="product-page">
    <h2 class="page-title">商品列表</h2>

    <!-- 搜索栏 -->
    <SearchBar />

    <div class="page-content">
      <!-- 筛选面板 -->
      <FilterPanel />

      <!-- 商品列表 -->
      <div class="main-content">
        <ProductList />

        <!-- 分页组件 -->
        <Pagination />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SearchBar from './components/searchBar.vue'
import FilterPanel from './components/filterPanel.vue'
import ProductList from './components/product-list.vue'
import Pagination from './components/pagination.vue'
import useProductStore from '@/store/modules/product'

const productStore = useProductStore()
const route = useRoute()
const router = useRouter()
const isSyncing = ref(false) // 防止循环触发的标志

// 从URL参数初始化store状态
const initFromUrl = () => {
  if (isSyncing.value) return // 防止循环触发

  const { keyword, category, brand, minPrice, maxPrice, inStock, page, pageSize } = route.query

  if (keyword) productStore.setSearchKeyword(keyword)

  const filterOptions = {}
  if (category) filterOptions.category = category.split(',')
  if (brand) filterOptions.brand = brand.split(',')
  if (minPrice && maxPrice) filterOptions.priceRange = [parseFloat(minPrice), parseFloat(maxPrice)]
  if (inStock) filterOptions.inStock = inStock === 'true'

  if (Object.keys(filterOptions).length > 0) {
    productStore.setFilterOptions(filterOptions)
  }

  if (pageSize) productStore.setPageSize(parseInt(pageSize))
  if (page) productStore.setCurrentPage(parseInt(page))
}

// 将store状态同步到URL参数
const syncToUrl = () => {
  if (isSyncing.value) return // 防止循环触发

  isSyncing.value = true
  try {
    const query = {}

    if (productStore.searchKeyword) {
      query.keyword = productStore.searchKeyword
    }

    if (productStore.filterOptions.category && productStore.filterOptions.category.length > 0) {
      query.category = productStore.filterOptions.category.join(',')
    }

    if (productStore.filterOptions.brand && productStore.filterOptions.brand.length > 0) {
      query.brand = productStore.filterOptions.brand.join(',')
    }

    if (productStore.filterOptions.priceRange[0] > 0 || productStore.filterOptions.priceRange[1] < Infinity) {
      query.minPrice = productStore.filterOptions.priceRange[0] || 0
      query.maxPrice = productStore.filterOptions.priceRange[1] || 0
    }

    if (productStore.filterOptions.inStock) {
      query.inStock = 'true'
    }

    query.page = productStore.currentPage
    query.pageSize = productStore.pageSize

    // 比较新 query 与当前路由 query，只有不同时才更新
    const currentQuery = route.query
    const isSame =
      Object.keys(query).every((key) => String(query[key]) === String(currentQuery[key])) &&
      Object.keys(currentQuery).every((key) => key in query)

    if (!isSame) {
      router.replace({ query })
    }
  } finally {
    setTimeout(() => {
      isSyncing.value = false
    }, 100) // 短暂延迟确保状态同步完成
  }
}

// 清除URL参数
const clearUrlParams = () => {
  if (isSyncing.value) return // 防止循环触发

  isSyncing.value = true
  try {
    // 检查当前路由是否仍然是商品列表页面
    if (route.path === '/portfolio') {
      const query = {}
      router.replace({ query })
    }
  } finally {
    setTimeout(() => {
      isSyncing.value = false
    }, 100)
  }
}

// 监听路由变化，重新初始化
watch(
  () => route.query,
  (newQuery, oldQuery) => {
    if (JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
      initFromUrl()
      productStore.fetchProducts()
    }
  },
  { deep: true }
)

// 组件挂载时初始化
onMounted(() => {
  initFromUrl()
  productStore.fetchProducts()
})

// 组件卸载前清除URL参数
onBeforeUnmount(() => {
  productStore.resetFilters()
  clearUrlParams()
})

// 监听store状态变化，同步到URL
watch(
  () => [productStore.searchKeyword, productStore.filterOptions, productStore.currentPage, productStore.pageSize],
  () => {
    syncToUrl()
  },
  { deep: true }
)
</script>

<style scoped>
.product-page {
  padding: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.page-content {
  display: flex;
  gap: 20px;
}

.main-content {
  flex: 1;
}
</style>
