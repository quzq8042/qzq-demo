<template>
  <div>
    <ChartsPart id="demo" height="400px" :option="ChartTestData"></ChartsPart>
  </div>
</template>

<script>
//引入组件 略去
import ChartsPart from '../../index1.vue'
export default {
  components: {
    ChartsPart,
  },

  data() {
    return {
      ChartTestData: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [3, 2, 5, 1, 5, 6, 2],
            type: 'line',
          },
        ],
      },
    }
  },
}
</script>
