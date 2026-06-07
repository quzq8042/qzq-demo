<template>
  <div class="type-echart">
    <ItEcharts id="type-echart-bar1" :chart-data="typeEchartOption" :get-chart-option="Bar1Option"></ItEcharts>
  </div>
</template>
<script>
export default {
  name: 'Bar1',
}
</script>
<script setup>
import { ref } from 'vue'
import ItEcharts from '../../index.vue'
import { Bar1Option } from './Bar1'

const typeEchartOption = ref({
  xAxisList: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
  dataList: [
    {
      name: '上市公司营业总收入 (亿元)',
      type: 'bar',
      value: [13.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6],
    },
    {
      name: '增速(%)',
      type: 'line',
      value: [-2.0, 2.2, 3.3, 4.5, 6.3, 18.2, 12.1],
    },
    {
      name: '增速1(%)',
      type: 'line',
      value: [-4.0, 23.2, 23.3, 34.5, 16.3, 28.2, 2.1],
    },
    {
      name: '增速2(%)',
      type: 'line',
      value: [-1.0, 13.2, 13.3, 14.5, 16.3, 38.2, 13.1],
    },
  ],
})
</script>
<style scoped>
.type-echart {
  margin: 0 auto;
  width: 500px;
  height: 400px;
  border: 1px solid;
}
</style>
