<template>
  <div class="type-echart">
    <ItEcharts id="type-echart-pie2" :chart-data="typeEchartOption" :get-chart-option="Pie2Option"></ItEcharts>
  </div>
</template>
<script>
export default {
  name: 'Pie2',
}
</script>
<script setup>
import { ref } from 'vue'
import ItEcharts from '../../index.vue'
import { Pie2Option } from './Pie2'

const typeEchartOption = ref({
  dataList: [
    { name: '市内', value: 25 },
    { name: '市外', value: 175 },
  ],
})
</script>
<style scoped lang="scss">
.type-echart {
  margin: 0 auto;
  width: 450px;
  height: 300px;
  border: 1px solid;
}
</style>
