<template>
  <div class="elliptic">
    <div v-for="(item, index) in dataList" :key="index">
      {{ `${item.name} ${item.value}` }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const dataList = ref([
  {
    name: '申请专利',
    value: '252',
  },
  {
    name: '授权专利',
    value: '140',
  },
  {
    name: '授权发明专利',
    value: '86',
  },
  {
    name: '高价值专利',
    value: '45',
  },
])
</script>

<style lang="scss" scoped>
/* 这里是组件的样式 */
.elliptic {
  width: 400px;
  height: 300px;
  margin: 0 auto;
  border: 1px solid black;
  position: relative;

  div {
    border: 1px solid #797979;
    position: absolute;
    border-radius: 50%;
    font-size: 12px;
    text-align: center;
  }

  div:nth-of-type(1) {
    width: 340px;
    height: 230px;
    bottom: 5%;
    left: 7%;
    line-height: 60px;
  }

  div:nth-of-type(2) {
    width: 280px;
    height: 160px;
    bottom: 10%;
    left: 14%;
    background: #f2f2f2;
    line-height: 40px;
  }

  div:nth-of-type(3) {
    width: 220px;
    height: 120px;
    bottom: 10%;
    left: 21%;
    background: #d8dfef;
    line-height: 40px;
  }

  div:nth-of-type(4) {
    width: 160px;
    height: 80px;
    bottom: 10%;
    left: 28%;
    background: #81a2e3;
    line-height: 80px;
  }
}
</style>
