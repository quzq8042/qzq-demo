<template>
  <div class="type-echart">
    <div v-for="item in list.sort((a, b) => b.value1 - a.value1)" :key="item.name" class="items">
      <div class="after-content">
        <div :style="{ width: (item.value1 / list[0].value1) * 100 + '%' }"></div>
      </div>
      <p>{{ item.name }}</p>
      <div class="before-content">
        <div :style="{ width: (item.value2 / list[0].value2) * 100 + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const list = ref([
  { name: '长三角', value1: '200', value2: '300' },
  { name: '粤港澳珠三角', value1: '160', value2: '240' },
  { name: '京津冀', value1: '40', value2: '60' },
  { name: '长江中游', value1: '30', value2: '50' },
  { name: '成渝都市圈', value1: '20', value2: '30' },
])
</script>

<style lang="scss" scoped>
/* 这里是组件的样式 */
.type-echart {
  margin: 0 auto;
  width: 500px;
  height: 300px;
  border: 1px solid;

  .items {
    padding: 0 20px;
    display: flex;
    margin: 0 auto;
    align-items: center;
    font-size: 12px;
    display: flex;
    justify-content: center;

    p {
      width: 15%;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    div {
      flex: 1;
      height: 10px;
      background-color: #f0f0f0;
      position: relative;
    }

    .after-content {
      margin-right: 10px;

      div {
        position: absolute;
        height: 10px;
        width: 30%;
        right: 0;
        top: 0;
        background-color: red;
      }
    }

    .before-content {
      margin-left: 10px;

      div {
        position: absolute;
        height: 10px;
        width: 20px;
        left: 0;
        top: 0;
        background-color: pink;
      }
    }
  }
}
</style>
