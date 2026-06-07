<template>
  <div class="type-echart">
    <div class="label">
      <div>企业数</div>
      <div>
        <span>{{ totle }}</span
        >&nbsp;家
      </div>
    </div>
    <ItEcharts id="type-echart-pie1" :chart-data="typeEchartOption" :get-chart-option="Pie1Option"></ItEcharts>
  </div>
</template>
<script>
export default {
  name: 'Pie1',
}
</script>
<script setup>
import { ref, computed } from 'vue'
import ItEcharts from '../../index.vue'
import { Pie1Option } from './Pie1'

const typeEchartOption = ref({
  dataList: [
    { name: '国有企业', value: 50 },
    { name: '私营企业', value: 150 },
    { name: '股份制企业', value: 82 },
    { name: '合资企业', value: 60 },
  ],
})
const totle = computed(() => {
  return typeEchartOption.value.dataList.reduce((a, b) => {
    return a + b.value
  }, 0)
})
</script>
<style scoped lang="scss">
.type-echart {
  margin: 0 auto;
  width: 450px;
  height: 300px;
  border: 1px solid;
  position: relative;
}

.label {
  text-align: center;
  padding: 10px;
  position: absolute;
  top: 40%;
  left: 33%;
  font-size: 12px;
  div > span {
    font-size: 14px;
  }
}
</style>
