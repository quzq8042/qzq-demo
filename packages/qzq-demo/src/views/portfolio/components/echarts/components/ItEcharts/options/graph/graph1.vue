<template>
  <div class="type-echart">
    <div class="btn-group">
      <div class="btn-left">
        <div>公司</div>
        <div>自然人</div>
      </div>
      <div class="btn-right">
        <div @click="refresh">
          <span
            ><el-icon>
              <Refresh /> </el-icon></span
          >还原
        </div>
        <div @click="zoomIn">
          <span
            ><el-icon>
              <ZoomIn /> </el-icon></span
          >放大
        </div>
        <div @click="zoomOut">
          <span
            ><el-icon>
              <ZoomOut /> </el-icon></span
          >缩小
        </div>
        <div @click="downLoad">
          <span
            ><el-icon>
              <Download /> </el-icon></span
          >保存
        </div>
      </div>
    </div>
    <ItEcharts id="type-echart-graph1" ref="graph1" :chart-data="typeEchartOption" :get-chart-option="Graph1Option"> </ItEcharts>
  </div>
</template>
<script>
export default {
  name: 'Graph1',
}
</script>
<script setup>
import { ref, toRaw } from 'vue'
import ItEcharts from '../../index.vue'
import { Graph1Option } from './Graph1'
const graph1 = ref(null)
const typeEchartOption = ref({
  dataList: [
    {
      name: '深圳市AAAAAAAA有限公司',
    },
    {
      name: '深圳市BBBBBBBB有限公司',
    },
    {
      name: '张三',
      person: true, // 是否为自然人 默认false
    },
    {
      name: '深圳市CCCCCCCC有限公司',
    },
  ],
  // 节点间的关系数据
  links: [
    {
      source: '深圳市AAAAAAAA有限公司', // 源节点名称
      target: '深圳市BBBBBBBB有限公司', // 目标节点名称
      category: '供应关系', // 关系对象连接线上的标签内容
    },
    {
      source: '深圳市BBBBBBBB有限公司',
      target: '张三',
      category: '客户',
    },
    {
      source: '张三',
      target: '深圳市AAAAAAAA有限公司',
      category: '供应关系',
    },
    {
      source: '张三',
      target: '深圳市CCCCCCCC有限公司',
      category: '供应关系',
    },
  ],
  increaseAmplitude: 1,
})
const zoomIn = () => {
  typeEchartOption.value.increaseAmplitude = 1.2
}
const zoomOut = () => {
  typeEchartOption.value.increaseAmplitude = 0.8
}
const refresh = () => {
  typeEchartOption.value.increaseAmplitude = 1
  graph1.value.returnResize()
}
const downLoad = () => {
  let img = new Image()
  img.src = graph1.value.returnChart().getDataURL({
    type: 'png',
    pixelRatio: 2,
    backgroundColor: '#fff',
  })
  img.onload = () => {
    let canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    let ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)
    let dataUrl = canvas.toDataURL('image/png')
    let a = document.createElement('a')
    let event = new MouseEvent('click')
    a.download = '企业关系图谱.png'
    a.href = dataUrl
    a.dispatchEvent(event)
    a.remove()
  }
}
</script>
<style scoped lang="scss">
.type-echart {
  margin: 0 auto;
  width: 800px;
  height: 600px;
  border: 1px solid;
  overflow: hidden;
}

.btn-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f9fafb;
  margin: 0 15px;
  font-size: 12px;

  .btn-left {
    display: flex;

    div {
      margin-right: 30px;
      position: relative;

      &:nth-of-type(1)::after {
        content: '';
        position: absolute;
        left: -12px;
        top: 5px;
        border-radius: 50%;
        width: 7px;
        height: 7px;
        background: #00b5d0;
      }

      &:nth-of-type(2)::after {
        content: '';
        position: absolute;
        left: -12px;
        top: 5px;
        border-radius: 50%;
        width: 7px;
        height: 7px;
        background: #ff6382;
      }
    }
  }

  .btn-right {
    display: flex;
    align-items: center;

    div {
      padding: 0 10px;
      cursor: pointer;
      border-right: 1px solid #becbd5;

      &:last-child {
        border-right: none;
      }

      span {
        margin-right: 5px;
        color: #becbd5;
      }
    }
  }
}
</style>
