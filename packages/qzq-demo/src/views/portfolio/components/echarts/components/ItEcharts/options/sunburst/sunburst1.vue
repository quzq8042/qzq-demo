<template>
  <div class="type-echart">
    <ItEcharts id="type-echart-sunburst1" :chart-data="typeEchartOption" :get-chart-option="Sunburst1Option"></ItEcharts>
  </div>
</template>
<script>
export default {
  name: 'Sunburst1',
}
</script>
<script setup>
import { ref } from 'vue'
import ItEcharts from '../../index.vue'
import { Sunburst1Option } from './Sunburst1'

const typeEchartOption = ref({
  dataList: [
    {
      name: '行政处罚',
      children: [
        {
          name: '警告',
          value: 2,
        },
        {
          name: '罚款',
          value: 6,
        },
        {
          name: '吊销证件',
          value: 3,
        },
        {
          name: '行政拘留',
          value: 6,
        },
      ],
    },
    {
      name: '司法纠纷',
      children: [
        {
          name: '违法犯罪',
          value: 5,
        },
        {
          name: '劳动纠纷',
          value: 6,
        },
        {
          name: '知产纠纷',
          value: 8,
        },
        {
          name: '商业纠纷',
          value: 6,
        },
      ],
    },
    {
      name: '企业失信',
      children: [
        {
          name: '轻微',
          value: 6,
        },
        {
          name: '一般',
          value: 5,
        },
        {
          name: '严重',
          value: 4,
        },
      ],
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
