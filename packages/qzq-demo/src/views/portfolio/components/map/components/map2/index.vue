<template>
  <div class="homebox">
    <div id="container" ref="baiduRef"></div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const baiduRef = ref()
const map = ref()
let blist = ref([])
const districtLoading = ref(0)
function initMap() {
  map.value = new BMap.Map('container', { enableMapClick: false }) // 创建地图实例 //关闭底图可点功能
  const point = new BMap.Point(113.9548, 22.539) // 创建点坐标
  map.value.centerAndZoom(point, 11) // 初始化地图，设置中心点坐标和地图级别
  map.value.enableScrollWheelZoom(true) // 滚轮缩放
}

/*
=====添加行政区域=====
 */

function addDistrict(districtName) {
  //使用计数器来控制加载过程

  districtLoading.value++

  var bdary = new BMap.Boundary()

  bdary.get(districtName, function (rs) {
    //获取行政区域

    var count = rs.boundaries.length //行政区域的点有多少个

    for (var i = 0; i < count; i++) {
      blist.value.push({ points: rs.boundaries[i], name: districtName })
    }

    //加载完成区域点后计数器-1

    districtLoading.value--

    if (districtLoading.value == 0) {
      //全加载完成后画端点

      drawBoundary()
    }
  })
}

function getBoundary() {
  addDistrict('辽宁省')
  // addDistrict("河北省");
}
/*
 
=====点击行政区域事件=====
 
*/

function drawBoundary() {
  //包含所有区域的点数组
  var pointArray = []
  //循环添加各闭合区域
  for (var i = 0; i < blist.value.length; i++) {
    //添加多边形层并显示
    var ply = new BMap.Polygon(blist.value[i].points, {
      strokeWeight: 1, //边框宽度
      trokeColor: '#014F99', //边框颜色
      fillColor: ' #DDE4F0', //填充颜色
    }) //建立多边形覆盖物
    ply.name = blist.value[i].name
    map.value.addOverlay(ply)

    //将点增加到视野范围内
    var path = ply.getPath()
    pointArray = pointArray.concat(path)
  }
  map.value.setViewport(pointArray) //调整视野
}

setTimeout(function () {
  getBoundary()
}, 100)

onMounted(() => {
  initMap()
  // etLongitudeLatitude();
})

onUnmounted(() => {
  map.value = null // 销毁地图实例
})
</script>

<style scoped>
#container {
  width: 1000px;
  height: 600px;
}
</style>
