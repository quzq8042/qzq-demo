<template>
  <div :id="id" :style="style"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'MyEcharts',
  props: {
    id: {
      type: String,
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
    },
    option: {
      type: Object,
      default() {
        return {
          title: {
            text: '',
          },
          tooltip: {},
          legend: {
            data: [''],
          },
          xAxis: {
            type: 'category',
            data: [],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [],
              type: '',
            },
          ],
        }
      },
    },
  },
  data() {
    return {
      chart: '',
    }
  },
  computed: {
    style() {
      return {
        width: this.width,
        height: this.height,
      }
    },
  },
  watch: {
    option: {
      handler(newVal, oldVal) {
        if (this.chart) {
          this.chart.setOption(newVal)
        } else {
          this.init()
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.init()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resize)
  },

  methods: {
    init() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.option, true)
      this.$nextTick(() => {
        window.addEventListener('resize', this.resize)
      })
    },
    resize() {
      if (this.chart) {
        this.chart.resize()
      }
    },
  },
}
</script>
