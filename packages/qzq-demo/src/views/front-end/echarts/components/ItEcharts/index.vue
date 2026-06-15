<template>
  <div :id="id" :class="['it-echarts', classId]"></div>
</template>

<script>
export default {
  name: 'ItEcharts',
}
</script>

<script setup>
import * as echarts from 'echarts'

import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  classId: {
    type: String,
    default: '',
  },
  option: {
    type: Object,
    default: () => {
      return {}
    },
  },
  chartData: {
    type: Object,
    default: () => {
      return {}
    },
  },
  getChartOption: {
    type: Function,
    default: () => {
      return Function
    },
  },
})
const emits = defineEmits(['echarts-click'])
let chart
let options = ref()
onMounted(() => {
  if (props.classId) {
    var className = document.getElementsByClassName(props.classId)
    for (const item of className) {
      if (!item.id) {
        chart = echarts.init(item)
      }
    }
  } else {
    chart = echarts.init(document.getElementById(props.id), null, {
      devicePixelRatio: 2,
    })
  }
  init(chart)
  resize(chart)
})
watch(
  () => props.chartData,
  (newTime, oldTime) => {
    init(chart)
  },
  { deep: true }
)

let interval = 0

const init = (chart) => {
  options.value = props.getChartOption(props.chartData)
  chart.setOption(options.value)
  nextTick(() => {
    chart.resize()
  })
  chart.on('click', function (params) {
    emits('echarts-click', params, props.chartData.name)
  })
}

onUnmounted(() => {
  clearInterval(interval)
})

const resize = () => {
  let timer = 0
  window.addEventListener('resize', () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      returnResize()
    }, 300)
  })
}

const returnChart = () => chart
const returnResize = () => {
  init(chart)
}

defineExpose({ returnChart, returnResize })
</script>

<style scoped>
.it-echarts {
  width: 100%;
  height: 100%;
}
</style>
