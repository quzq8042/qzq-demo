<template>
  <div class="tab-content">
    <div class="page-header">
      <h1>UG加工</h1>
      <p>UG加工模块的加工类型参考，包括平面铣削、带边界面铣、平面铣等多种类型</p>
    </div>
    <div class="strategy-categories">
      <div v-for="category in strategyCategories" :key="category.name" class="category-card">
        <div class="category-header">
          <span class="category-icon">{{ category.icon }}</span>
          <div class="category-info">
            <h3>{{ category.name }}</h3>
            <span class="category-label">{{ category.chinese }}</span>
          </div>
        </div>
        <div v-if="category.tips" class="category-tips">
          <span class="tip-icon">💡</span>
          <span>{{ category.tips }}</span>
        </div>
        <div class="feature-list">
          <div
            v-for="(feature, index) in category.features"
            :key="index"
            class="feature-item"
            @click="goToDetail(category.name, feature.name)"
          >
            <span class="feature-icon"><img :src="feature.icon" alt="feature-icon" /></span>
            <div class="feature-content">
              <span class="feature-name">{{ feature.name }}</span>
              <span class="feature-desc">{{ feature.description }}</span>
            </div>
            <span class="arrow-icon">→</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { strategyCategories } from './data.js'

const router = useRouter()

const goToDetail = (category, feature) => {
  router.push(`/cnc/ug-machining-strategy/detail/${category}/${encodeURIComponent(feature)}`)
}
</script>

<style lang="scss" scoped>
.tab-content {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  width: 100%;
  box-sizing: border-box;
}
.page-header {
  margin-bottom: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: #fff;

  h1 {
    font-size: 24px;
    margin: 0 0 8px 0;
    font-weight: bold;
  }

  p {
    font-size: 14px;
    margin: 0;
    opacity: 0.9;
  }
}
.strategy-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
}

.category-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border-left: 4px solid #667eea;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.15);
  }
}

.category-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  .category-icon {
    font-size: 28px;
  }

  .category-info {
    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }

    .category-label {
      font-size: 12px;
      color: #667eea;
      background: rgba(102, 126, 234, 0.1);
      padding: 2px 8px;
      border-radius: 4px;
    }
  }
}

.category-description {
  font-size: 13px;
  color: #666;
  margin-bottom: 16px;
  line-height: 1.6;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;

  &:hover {
    background: #f0f5ff;
    border-color: #667eea;
    transform: translateX(4px);
  }

  .feature-icon {
    img {
      width: 30px;
      height: 30px;
    }
  }

  .feature-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;

    .feature-name {
      font-size: 13px;
      font-weight: 600;
      color: #333;
    }

    .feature-desc {
      font-size: 12px;
      color: #888;
    }
  }

  .arrow-icon {
    font-size: 16px;
    color: #ccc;
    transition: color 0.2s;
  }

  &:hover .arrow-icon {
    color: #667eea;
  }
}

.category-tips {
  margin: 10px 0;
  padding: 12px;
  background: #fff3cd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #856404;

  .tip-icon {
    font-size: 16px;
  }
}
</style>
