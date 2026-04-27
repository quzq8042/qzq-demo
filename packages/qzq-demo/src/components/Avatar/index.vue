<template>
  <div class="avatar" :class="{ 'avatar-circle': circle }" :style="avatarStyle">
    <img v-if="src" :src="src" :alt="alt" class="avatar-img" @error="handleImageError" />
    <div v-else class="avatar-initial">
      {{ initial }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 图片地址
  src: {
    type: String,
    default: '',
  },
  // 替代文本
  alt: {
    type: String,
    default: '',
  },
  // 显示文本
  text: {
    type: String,
    default: '',
  },
  // 尺寸
  size: {
    type: [String, Number],
    default: 40,
  },
  // 是否圆形
  circle: {
    type: Boolean,
    default: true,
  },
  // 背景颜色
  bgColor: {
    type: String,
    default: '#667eea',
  },
  // 文字颜色
  textColor: {
    type: String,
    default: '#ffffff',
  },
})

// 计算首字
const initial = computed(() => {
  if (props.text && props.text.length > 0) {
    return props.text.charAt(0).toUpperCase()
  }
  return ''
})

// 计算样式
const avatarStyle = computed(() => {
  return {
    width: typeof props.size === 'number' ? `${props.size}px` : props.size,
    height: typeof props.size === 'number' ? `${props.size}px` : props.size,
    backgroundColor: props.bgColor,
    color: props.textColor,
    fontSize: `${props.size / 2}px`,
  }
})

// 处理图片加载失败
const handleImageError = (event) => {
  event.target.src = ''
}
</script>

<style scoped lang="scss">
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  font-weight: 600;

  &.avatar-circle {
    border-radius: 50%;
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-initial {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
}
</style>
