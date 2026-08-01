<template>
  <div class="faq-tab">
    <el-collapse v-model="activeNames" class="faq-collapse">
      <el-collapse-item v-for="(item, index) in faqs" :key="index" :name="index">
        <template #title>
          <div class="faq-question">
            <span class="faq-index">Q{{ index + 1 }}</span>
            <span>{{ item.question }}</span>
          </div>
        </template>
        <div class="faq-answer">
          <span class="answer-label">A：</span>
          <span v-if="item.type === 'img'" class="answer-content">
            <img :src="item.answer" alt="图片" />
          </span>
          <span v-else class="answer-content">{{ item.answer }}</span>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  faqs: {
    type: Array,
    required: true,
  },
})

const activeNames = ref([0])

watch(
  () => props.faqs,
  () => {
    activeNames.value = [0]
  }
)
</script>

<style lang="scss" scoped>
.faq-tab {
  padding: 4px 0;
}

.faq-collapse {
  --el-collapse-border-color: #e4e7ed;
  --el-collapse-header-bg-color: transparent;
  --el-collapse-content-bg-color: transparent;
  --el-collapse-header-text-color: #303133;
  --el-collapse-content-text-color: #606266;

  :deep(.el-collapse-item__header) {
    font-weight: 500;
    font-size: 15px;
    line-height: 1.6;
    padding: 0 4px;
  }

  :deep(.el-collapse-item__wrap) {
    border-bottom: 1px solid #f0f0f0;
  }

  :deep(.el-collapse-item__content) {
    padding: 12px 4px 16px;
  }
}

.faq-question {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.faq-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 24px;
  padding: 0 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  flex-shrink: 0;
}

.faq-answer {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 16px;
  background: #f8f9fb;
  border-radius: 8px;
  line-height: 1.8;
  font-size: 14px;
  color: #555;

  .answer-label {
    color: #667eea;
    font-weight: 600;
    flex-shrink: 0;
  }

  .answer-content {
    white-space: pre-line;
  }
}
</style>
