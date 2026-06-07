<template>
  <div class="type-echart">
    <div v-for="item in list.sort((a, b) => a.value - b.value)" :key="item.name" class="items">
      <p>{{ item.name }}</p>
      <div :style="{ width: (item.value / list[list.length - 1].value) * 100 + '%' }">
        <span>{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const list = ref([
  {
    name: '科技小巨人',
    value: '1026',
  },
  {
    name: '制造业单项冠军',
    value: '1292',
  },
  {
    name: '隐形冠军',
    value: '1517',
  },
  {
    name: '独角兽企业',
    value: '2019',
  },
  {
    name: '专精特新企业',
    value: '7517',
  },
  {
    name: '高新技术企业',
    value: '34504',
  },
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
    width: 350px;
    display: flex;
    margin: 0 auto;
    align-items: center;
    font-size: 12px;

    p {
      margin-right: 10px;
      flex-shrink: 0;
      color: #787878;
      text-align: right;
      width: 50%;
    }

    div {
      height: 20px;
      background: #ff8c3b;
      border-radius: 0 10px 10px 0;
      line-height: 20px;

      span {
        margin-left: 10px;
        text-shadow: -0.5px -0.5px 0 #fff, 0.5px -0.5px 0 #fff, -0.5px 0.5px 0 #fff, 0.5px 0.5px 0 #fff;
      }
    }
  }
}
</style>
