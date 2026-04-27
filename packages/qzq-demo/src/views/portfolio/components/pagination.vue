<template>
  <div class="pagination">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import useProductStore from '@/store/modules/product'

const productStore = useProductStore()

// 从store获取分页数据
const currentPage = computed({
  get: () => productStore.currentPage,
  set: (value) => productStore.setCurrentPage(value),
})

const pageSize = computed({
  get: () => productStore.pageSize,
  set: (value) => productStore.setPageSize(value),
})

const total = computed(() => productStore.total)

// 处理每页数量变化
const handleSizeChange = (size) => {
  productStore.setPageSize(size)
  productStore.fetchProducts()
}

// 处理页码变化
const handleCurrentChange = (page) => {
  productStore.setCurrentPage(page)
  productStore.fetchProducts()
}
</script>

<style scoped>
.pagination {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>
