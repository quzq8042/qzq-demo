<template>
  <div class="page-header">
    <div class="header-content">
      <div class="header-text">
        <h1>
          <el-icon class="header-icon"><component :is="iconComponent" /></el-icon>
          {{ title }}
        </h1>
        <p>{{ description }}</p>
      </div>
      <div v-if="$slots.actions" class="header-actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import * as ElementPlusIcons from '@element-plus/icons-vue'

const route = useRoute()

const title = computed(() => route.meta.title || '')
const description = computed(() => route.meta.description || '')

const iconComponent = computed(() => {
  const iconName = route.meta.icon
  return ElementPlusIcons[iconName] || ElementPlusIcons.HomeFilled
})
</script>

<style lang="scss" scoped>
.page-header {
  margin-bottom: 24px;
  padding: 24px 28px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6b8dd6 100%);
  border-radius: 16px;
  color: #fff;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
  }

  .header-text {
    flex: 1;
    h1 {
      font-size: 26px;
      margin: 0 0 10px 0;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 10px;

      .header-icon {
        font-size: 24px;
      }
    }

    p {
      font-size: 14px;
      margin: 0;
      opacity: 0.9;
      line-height: 1.6;
    }
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
    position: relative;

    :deep(.el-input) {
      width: 380px;

      .el-input__wrapper {
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 8px;
        box-shadow: none;

        &:hover {
          background: rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.4);
        }

        &.is-focus {
          background: rgba(255, 255, 255, 0.25);
          border-color: #fff;
        }
      }

      .el-input__inner {
        color: #fff;

        &::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }
      }

      .el-input__prefix svg {
        color: rgba(255, 255, 255, 0.8);
      }

      .el-input__suffix svg,
      .el-input__suffix i {
        color: rgba(255, 255, 255, 0.7);

        &:hover {
          color: #fff;
        }
      }
    }

    :deep(.el-button) {
      background: rgba(255, 255, 255, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.4);
      color: #fff;
      border-radius: 8px;

      &:hover {
        background: rgba(255, 255, 255, 0.35);
        border-color: #fff;
        color: #fff;
      }
    }
  }
}
</style>
