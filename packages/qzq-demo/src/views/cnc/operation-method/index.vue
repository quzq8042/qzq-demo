<template>
  <div class="operation-method">
    <PageHeader />

    <el-tabs v-model="activeKey" type="card" class="tabs-container">
      <el-tab-pane v-for="method in operationMethods" :key="method.key" :label="method.title" :name="method.key">
        <div v-if="current" class="method-wrapper">
          <div class="method-header">
            <div class="header-icon">{{ current.icon }}</div>
            <div class="header-text">
              <h2>{{ current.title }} · {{ current.subtitle }}</h2>
              <p>{{ current.summary }}</p>
            </div>
          </div>

          <div class="method-body">
            <div class="body-left">
              <div class="image-card">
                <img :src="current.image" :alt="current.title" />
                <div class="image-badge">📷 UG 三维示意</div>
              </div>
            </div>

            <div class="body-right">
              <div v-for="(phase, idx) in current.steps" :key="idx" :class="['phase-card', { highlight: phase.highlight }]" :style="{ '--phase-color': phase.color }">
                <div class="phase-title">
                  <span class="phase-num">{{ idx + 1 }}</span>
                  <span class="phase-label">{{ phase.phase }}</span>
                </div>
                <ul class="phase-list">
                  <li v-for="(item, j) in phase.items" :key="j" class="phase-item">
                    <div class="item-title">
                      <span class="item-dot"></span>
                      <span>{{ item.title }}</span>
                    </div>
                    <div class="item-content">{{ item.content }}</div>
                    <div v-if="item.formula" class="item-formula">{{ item.formula }}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import { operationMethods } from './data.js'

const activeKey = ref(operationMethods[0].key)
const current = computed(() => operationMethods.find((m) => m.key === activeKey.value))
</script>

<style lang="scss" scoped>
.operation-method {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  min-height: 100vh;
}

.tabs-container {
  background: #fff;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);

  :deep(.el-tabs__header) {
    margin-bottom: 20px;
    background: #f8f9fb;
    border-radius: 8px;
    padding: 6px;
  }

  :deep(.el-tabs__nav-wrap::after) {
    display: none;
  }

  :deep(.el-tabs__item) {
    padding: 0 20px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 6px;
    height: 36px;
    line-height: 36px;
    transition: all 0.3s ease;
    border: none;

    &:hover {
      background: rgba(102, 126, 234, 0.1);
    }
  }

  :deep(.el-tabs__item.is-active) {
    color: #fff;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  }

  :deep(.el-tabs__active-bar) {
    display: none;
  }

  :deep(.el-tabs__content) {
    padding: 16px 8px;
  }
}

.method-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.method-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
  border: 1px solid #e8e4f5;

  .header-icon {
    font-size: 40px;
    flex-shrink: 0;
  }

  .header-text {
    h2 {
      margin: 0 0 6px;
      font-size: 20px;
      color: #333;
      font-weight: 600;
    }

    p {
      margin: 0;
      font-size: 13px;
      color: #666;
      line-height: 1.6;
    }
  }
}

.method-body {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 20px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
}

.body-left {
  position: sticky;
  top: 20px;
  align-self: start;
}

.image-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
  background: #1a1a2e;

  img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 3;
    object-fit: cover;
  }

  .image-badge {
    position: absolute;
    bottom: 10px;
    left: 10px;
    padding: 4px 10px;
    font-size: 12px;
    color: #fff;
    background: rgba(0, 0, 0, 0.55);
    border-radius: 4px;
    backdrop-filter: blur(4px);
  }
}

.body-right {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.phase-card {
  position: relative;
  padding: 18px 22px;
  border-radius: 12px;
  border: 1px solid #eef1f6;
  background: #fafbff;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 18px;
    bottom: 18px;
    width: 4px;
    border-radius: 0 3px 3px 0;
    background: var(--phase-color, #667eea);
  }

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    transform: translateX(4px);
  }

  &.highlight {
    background: linear-gradient(135deg, rgba(235, 51, 73, 0.06) 0%, rgba(247, 151, 30, 0.06) 100%);
    border-color: rgba(235, 51, 73, 0.25);

    .phase-label {
      color: #eb3349;
    }
  }
}

.phase-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;

  .phase-num {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--phase-color, #667eea);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    flex-shrink: 0;
  }

  .phase-label {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }
}

.phase-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.phase-item {
  padding: 10px 14px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #f0f2f6;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--phase-color, #667eea);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }
}

.item-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #333;

  .item-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--phase-color, #667eea);
    flex-shrink: 0;
  }
}

.item-content {
  font-size: 13px;
  color: #555;
  line-height: 1.7;
}

.item-formula {
  margin-top: 8px;
  padding: 8px 12px;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 14px;
  font-weight: 600;
  color: var(--phase-color, #667eea);
  background: rgba(102, 126, 234, 0.08);
  border-radius: 6px;
  border-left: 3px solid var(--phase-color, #667eea);
  letter-spacing: 0.5px;
}
</style>
