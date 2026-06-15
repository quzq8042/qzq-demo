<template>
  <div class="other">
    <div>
      <h3>时间相关的计算</h3>
      <times></times>
    </div>
    <div>
      <h3>双色球选号(随机数)</h3>
      <ssq></ssq>
    </div>
    <div>
      <h3>视觉卡</h3>
      <sjk></sjk>
    </div>
  </div>
</template>

<script setup>
import times from './times/index.vue'
import ssq from './ssq/index.vue'
import sjk from './sjk/index.vue'
</script>

<style lang="scss" scoped>
/* 这里是组件的样式 */
.other {
  > div {
    border-bottom: 1px solid #ddd;
    padding-bottom: 40px;
  }
}
h3 {
  margin: 20px 0;
  font-weight: bold;
}
</style>
