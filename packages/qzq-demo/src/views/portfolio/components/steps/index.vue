<template>
  <div class="m-steps-area">
    <div class="m-steps">
      <div
        v-for="n in totalSteps"
        :key="n"
        :class="[
          'm-steps-item',
          {
            finished: current > n,
            process: current === n && n !== totalSteps,
            'last-process': current === totalSteps && n === totalSteps,
            'middle-wait': current < n && n !== totalSteps,
            'last-wait': current < n && n === totalSteps,
          },
        ]"
        @click="onChange(n)"
      >
        <div class="m-steps-icon">
          <span class="u-icon">{{ n }}</span>
        </div>
        <div class="m-steps-content">
          <div class="u-steps-title">{{ stepsLabel[n - 1] || 'Title' + n }}</div>
        </div>
      </div>
    </div>
    <el-button @click="onChange('back')">上一步</el-button>
    <el-button @click="onChange('next')">下一步</el-button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
  stepsLabel: {
    // 步骤title数组
    type: Array,
    default: () => {
      return []
    },
  },
  stepsDesc: {
    // 步骤description数组
    type: Array,
    default: () => {
      return []
    },
  },
  totalSteps: {
    // 总的步骤数
    type: Number,
    default: 5,
  },
  currentStep: {
    // 当前选中的步骤
    type: Number,
    default: 1,
  },
})
let current = ref(1)

const onChange = (n) => {
  // 点击切换选择步骤 back 上一步 next 下一步
  if (n == 'next' && current.value < props.totalSteps) {
    current.value++
  } else if (n == 'back' && current.value > 1) {
    current.value--
  } else if (n != 'next' && n != 'back') {
    current.value = n
  }
}
</script>
<style lang="scss" scoped>
.m-steps-area {
  width: 900px;
  margin: 0px auto;
  margin-top: 150px;
  .m-steps {
    padding: 30px 0;
    display: flex;
    .m-steps-item {
      display: inline-block;
      flex: 1; // 弹性盒模型对象的子元素都有相同的长度，且忽略它们内部的内容
      text-align: left;
      // overflow: hidden;
      font-size: 16px;
      line-height: 32px;
      display: flex;
      flex-direction: column;
      .m-steps-icon {
        display: inline-block;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        text-align: center;
        position: relative;
      }
      .m-steps-content {
        display: inline-block;
        vertical-align: top;
        .u-steps-title {
          display: inline-block;
        }
      }
    }
    .finished:not(:first-of-type) {
      cursor: pointer;
      .m-steps-icon {
        border: 2px solid rgb(51, 113, 255);
        .u-icon {
          color: rgb(51, 113, 255);
        }
        &::after {
          content: '';
          position: absolute;
          top: 15px;
          left: 32px;
          width: 75px;
          height: 2px;
          background: rgb(51, 113, 255);
          z-index: 2;
        }
        &::before {
          content: '';
          position: absolute;
          top: 15px;
          right: 32px;
          width: 75px;
          height: 2px;
          background: rgb(51, 113, 255);
          z-index: 2;
        }
      }
      .m-steps-content {
        color: rgba(102, 102, 102, 0.65);
        .u-steps-title {
          color: rgba(102, 102, 102, 0.85);
        }
        .u-steps-description {
          color: rgba(102, 102, 102, 0.65);
        }
      }
    }
    .finished:first-of-type {
      cursor: pointer;
      .m-steps-icon {
        border: 2px solid rgb(51, 113, 255);
        .u-icon {
          color: rgb(51, 113, 255);
        }
        &::after {
          content: '';
          position: absolute;
          top: 15px;
          left: 32px;
          width: 75px;
          height: 2px;
          background: rgb(51, 113, 255);
          z-index: 2;
        }
      }
      .m-steps-content {
        color: rgba(102, 102, 102, 0.65);
        .u-steps-title {
          color: rgba(102, 102, 102, 0.85);
        }
        .u-steps-description {
          color: rgba(102, 102, 102, 0.65);
        }
      }
    }
    .process:not(:first-of-type) {
      cursor: pointer;
      .m-steps-icon {
        background: rgb(51, 113, 255);
        border: 2px solid rgb(51, 113, 255);
        .u-icon {
          color: #fff;
        }
        &::after {
          content: '';
          position: absolute;
          top: 15px;
          left: 32px;
          width: 75px;
          height: 2px;
          background: rgb(51, 113, 255);
          z-index: 2;
        }
        &::before {
          content: '';
          position: absolute;
          top: 15px;
          right: 32px;
          width: 75px;
          height: 2px;
          background: rgb(51, 113, 255);
          z-index: 2;
        }
      }
      .m-steps-content {
        color: rgba(102, 102, 102, 0.65);
        .u-steps-title {
          color: rgba(102, 102, 102, 0.85);
        }
        .u-steps-description {
          color: rgba(102, 102, 102, 0.65);
        }
      }
    }
    .process:first-of-type {
      cursor: pointer;
      .m-steps-icon {
        background: rgb(51, 113, 255);
        border: 2px solid rgb(51, 113, 255);
        .u-icon {
          color: #fff;
        }
        &::after {
          content: '';
          position: absolute;
          top: 15px;
          left: 32px;
          width: 75px;
          height: 2px;
          background: rgb(51, 113, 255);
          z-index: 2;
        }
      }
      .m-steps-content {
        color: rgba(102, 102, 102, 0.65);
        .u-steps-title {
          color: rgba(102, 102, 102, 0.85);
        }
        .u-steps-description {
          color: rgba(102, 102, 102, 0.65);
        }
      }
    }
    .middle-wait {
      cursor: pointer;
      .m-steps-icon {
        border: 2px solid rgb(228, 228, 228);
        .u-icon {
          color: rgb(204, 204, 204);
        }
        &::after {
          content: '';
          position: absolute;
          top: 15px;
          left: 32px;
          width: 75px;
          height: 2px;
          background: rgb(228, 228, 228);
        }
        &::before {
          content: '';
          position: absolute;
          top: 15px;
          right: 32px;
          width: 75px;
          height: 2px;
          background: rgb(228, 228, 228);
        }
      }
      .m-steps-content {
        color: rgba(153, 153, 153, 0.65);
        .u-steps-title {
          color: rgba(153, 153, 153, 0.85);
        }
        .u-steps-description {
          color: rgba(153, 153, 153, 0.65);
        }
      }
    }
    .last-wait {
      cursor: pointer;
      .m-steps-icon {
        border: 2px solid rgb(228, 228, 228);
        .u-icon {
          color: rgb(204, 204, 204);
        }
        &::before {
          content: '';
          position: absolute;
          top: 15px;
          right: 32px;
          width: 75px;
          height: 2px;
          background: rgb(228, 228, 228);
        }
      }
      .m-steps-content {
        color: rgba(153, 153, 153, 0.65);
        .u-steps-title {
          color: rgba(153, 153, 153, 0.85);
        }
        .u-steps-description {
          color: rgba(153, 153, 153, 0.65);
        }
      }
    }
    .last-process {
      cursor: pointer;
      .m-steps-icon {
        background: rgb(51, 113, 255);
        border: 2px solid rgb(51, 113, 255);
        .u-icon {
          color: #fff;
        }
        &::before {
          content: '';
          position: absolute;
          top: 15px;
          right: 32px;
          width: 75px;
          height: 2px;
          background: rgb(51, 113, 255);
        }
      }
      .m-steps-content {
        color: rgba(102, 102, 102, 0.65);
        .u-steps-title {
          color: rgba(102, 102, 102, 0.85);
        }
        .u-steps-description {
          color: rgba(102, 102, 102, 0.65);
        }
      }
    }
  }
}
</style>
