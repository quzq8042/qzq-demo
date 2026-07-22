<template>
  <div class="detail-page">
    <div class="page-header">
      <div class="header-left">
        <span class="feature-icon-large"><img :src="featureData.icon" alt="" /></span>
        <div class="header-info">
          <h1>{{ featureData.name }}</h1>
          <span class="category-tag">{{ categoryName }}</span>
        </div>
      </div>
      <el-button type="primary" plain @click="goBack"> <i class="el-icon-arrow-left"></i> 返回 </el-button>
    </div>

    <div class="content-section">
      <div class="section-card">
        <h2>功能描述</h2>
        <p>{{ featureData.description }}</p>
      </div>

      <div class="section-card">
        <h2>参数设置指南</h2>
        <div class="params-grid">
          <div v-for="(param, index) in featureData.params" :key="index" class="param-item">
            <div class="param-header">
              <span class="param-icon">{{ param.icon }}</span>
              <span class="param-name">{{ param.name }}</span>
            </div>
            <div class="param-desc">{{ param.description }}</div>
            <div class="param-value">
              <span class="label">推荐值：</span>
              <span class="value">{{ param.value }}</span>
            </div>
            <div v-if="param.tip" class="param-tip">
              <span class="tip-icon">💡</span>
              <span>{{ param.tip }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="section-card">
        <h2>适用场景</h2>
        <ul class="scenario-list">
          <li v-for="(scenario, index) in featureData.scenarios" :key="index">
            <span class="scenario-icon">✓</span>
            {{ scenario }}
          </li>
        </ul>
      </div>

      <div class="section-card">
        <h2>UG操作步骤</h2>
        <ol class="step-list">
          <li v-for="(step, index) in featureData.steps" :key="index">
            <span class="step-number">{{ index + 1 }}</span>
            <span class="step-content">{{ step }}</span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { strategyCategories } from '../data.js'

const router = useRouter()
const route = useRoute()

const categoryName = ref('')
const featureData = ref({
  name: '',
  icon: '',
  description: '',
  params: [],
  scenarios: [],
  steps: [],
})

const goBack = () => {
  router.back()
}

onMounted(() => {
  const { category, feature } = route.params
  if (category && feature) {
    const categoryData = strategyCategories.find((item) => item.name === category)
    if (categoryData) {
      categoryName.value = categoryData.chinese
      const featureItem = categoryData.features.find((f) => f.name === decodeURIComponent(feature))
      if (featureItem) {
        featureData.value = {
          name: featureItem.name,
          icon: featureItem.icon || '📋',
          description: featureItem.description || '',
          params: featureItem.params || [],
          scenarios: featureItem.scenarios || [],
          steps: featureItem.steps || [],
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.detail-page {
  padding: 20px;
  min-height: 100vh;
  background: #f5f7fa;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 20px 24px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;

  .header-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .feature-icon-large {
    img {
      width: 48px;
      height: 48px;
    }
  }

  .header-info {
    h1 {
      margin: 0 0 4px 0;
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }

    .category-tag {
      font-size: 12px;
      color: #667eea;
      background: rgba(102, 126, 234, 0.1);
      padding: 4px 12px;
      border-radius: 20px;
    }
  }
}

.content-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0 0 16px 0;
    padding-bottom: 12px;
    border-bottom: 2px solid #667eea;
  }

  p {
    font-size: 14px;
    color: #666;
    line-height: 1.8;
    margin: 0;
  }
}

.params-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.param-item {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 16px;

  .param-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;

    .param-icon {
      font-size: 16px;
    }

    .param-name {
      font-size: 14px;
      font-weight: 600;
      color: #333;
    }
  }

  .param-desc {
    font-size: 12px;
    color: #888;
    margin-bottom: 8px;
  }

  .param-value {
    font-size: 13px;
    margin-bottom: 8px;

    .label {
      color: #666;
    }

    .value {
      color: #667eea;
      font-weight: 600;
    }
  }

  .param-tip {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #856404;
    padding: 8px;
    background: #fff3cd;
    border-radius: 6px;

    .tip-icon {
      font-size: 14px;
    }
  }
}

.scenario-list {
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: #f8f9fa;
    border-radius: 8px;
    font-size: 13px;
    color: #666;

    .scenario-icon {
      color: #52c41a;
      font-weight: bold;
    }
  }
}

.step-list {
  margin: 0;
  padding: 0;
  counter-reset: step;

  li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px dashed #eee;
    font-size: 14px;
    color: #666;
    counter-increment: step;

    &:last-child {
      border-bottom: none;
    }

    .step-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      background: #667eea;
      color: #fff;
      border-radius: 50%;
      font-size: 14px;
      font-weight: 600;
      flex-shrink: 0;
    }

    .step-content {
      padding-top: 4px;
    }
  }
}
</style>
