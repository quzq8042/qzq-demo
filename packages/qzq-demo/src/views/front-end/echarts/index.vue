<template>
  <div class="echarts-container">
    <Sunburst1></Sunburst1>
    <GraphChearts></GraphChearts>
    <BarChearts1></BarChearts1>
    <BarChearts2></BarChearts2>
    <BarChearts3></BarChearts3>
    <PieChearts></PieChearts>
    <PieChearts2></PieChearts2>
    <PieChearts3></PieChearts3>
  </div>
</template>

<script setup>
import Sunburst1 from './components/ItEcharts/options/sunburst/sunburst1.vue'

import GraphChearts from './components/ItEcharts/options/graph/graph1.vue'

import BarChearts1 from './components/ItEcharts/options/bar/bar1.vue'
import BarChearts2 from './components/ItEcharts/options/bar/bar2.vue'
import BarChearts3 from './components/ItEcharts/options/bar/bar3.vue'

import PieChearts from './components/ItEcharts/options/pie/pie1.vue'
import PieChearts2 from './components/ItEcharts/options/pie/pie2.vue'
import PieChearts3 from './components/ItEcharts/options/pie/pie3.vue'
</script>

<style lang="scss" scoped>
/* 这里是组件的样式 */
.echarts-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
