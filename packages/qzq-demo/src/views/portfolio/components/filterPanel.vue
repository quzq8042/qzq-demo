<template>
  <div class="filter-panel">
    <h3 class="panel-title">筛选条件</h3>

    <!-- 分类筛选 -->
    <div class="filter-section">
      <h4>商品分类</h4>
      <el-checkbox-group v-model="localFilter.category" @change="handleFilterChange">
        <el-checkbox v-for="category in categories" :key="category.id" :label="category.id">
          {{ category.name }}
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <!-- 品牌筛选 -->
    <div class="filter-section">
      <h4>品牌</h4>
      <el-checkbox-group v-model="localFilter.brand" @change="handleFilterChange">
        <el-checkbox v-for="brand in brands" :key="brand.id" :label="brand.id">
          {{ brand.name }}
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <!-- 价格范围筛选 -->
    <div class="filter-section">
      <h4>价格范围</h4>
      <el-slider v-model="localFilter.priceRange" range :min="0" :max="10000" :step="100" @change="handleFilterChange" />
      <div class="price-range">￥{{ localFilter.priceRange[0] }} - ￥{{ localFilter.priceRange[1] }}</div>
    </div>

    <!-- 库存筛选 -->
    <div class="filter-section">
      <el-checkbox v-model="localFilter.inStock" @change="handleFilterChange"> 仅显示有库存商品 </el-checkbox>
    </div>

    <!-- 操作按钮 -->
    <div class="filter-actions">
      <el-button type="primary" @click="handleReset">重置筛选</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import useProductStore from '@/store/modules/product'

const productStore = useProductStore()

// 本地筛选状态
const localFilter = ref({
  category: productStore.filterOptions.category,
  brand: productStore.filterOptions.brand,
  priceRange: [...productStore.filterOptions.priceRange],
  inStock: productStore.filterOptions.inStock,
})

// 监听store中筛选条件的变化，更新本地状态
watch(
  () => productStore.filterOptions,
  (newVal) => {
    localFilter.value = {
      category: newVal.category,
      brand: newVal.brand,
      priceRange: [...newVal.priceRange],
      inStock: newVal.inStock,
    }
  },
  { deep: true }
)

// 获取分类和品牌列表
const categories = ref([])
const brands = ref([])

onMounted(async () => {
  await productStore.fetchCategories()
  await productStore.fetchBrands()
  categories.value = productStore.categories
  brands.value = productStore.brands
})

// 监听本地筛选条件变化
const handleFilterChange = () => {
  productStore.setFilterOptions(localFilter.value)
  productStore.fetchProducts()
}

// 重置筛选条件
const handleReset = () => {
  localFilter.value = {
    category: null,
    brand: null,
    priceRange: [0, 10000],
    inStock: false,
  }
  productStore.resetFilters()
  productStore.fetchProducts()
}
</script>

<style scoped>
.filter-panel {
  width: 250px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.panel-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e4e7ed;
}

.filter-section {
  margin-bottom: 20px;
}

.filter-section h4 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
}

.filter-section .el-checkbox {
  display: block;
  margin-bottom: 8px;
}

.price-range {
  margin-top: 10px;
  font-size: 12px;
  color: #606266;
  text-align: center;
}

.filter-actions {
  margin-top: 30px;
}
</style>
