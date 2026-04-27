<template>
  <div class="product-list">
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="6" animated />
    </div>

    <div v-else-if="productList.length === 0" class="empty-container">
      <el-empty description="暂无商品数据" />
    </div>

    <div v-else class="product-grid">
      <div v-for="product in productList" :key="product.id" class="product-item">
        <div class="product-image">
          <img src="@/assets/images/profile.jpg" :alt="product.name" />
        </div>
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-desc">{{ product.description }}</p>
          <div class="product-price">￥{{ product.price.toFixed(2) }}</div>
          <div class="product-stock" :class="{ 'out-of-stock': product.stock <= 0 }">
            {{ product.stock > 0 ? `库存: ${product.stock}` : '缺货' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import useProductStore from '@/store/modules/product'

const productStore = useProductStore()

// 从store获取商品数据和加载状态
const productList = computed(() => productStore.productList)
const loading = computed(() => productStore.loading)
</script>

<style scoped>
.product-list {
  flex: 1;
}

.loading-container {
  padding: 20px;
}

.empty-container {
  padding: 50px 0;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.product-item {
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.product-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 15px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  height: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-desc {
  font-size: 12px;
  color: #606266;
  margin-bottom: 10px;
  height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #f56c6c;
  margin-bottom: 5px;
}

.product-stock {
  font-size: 12px;
  color: #67c23a;
}

.product-stock.out-of-stock {
  color: #909399;
}
</style>
