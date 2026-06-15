<template>
  <div id="borrow">
    <!-- 操作按钮组 -->
    <div class="functionBox">
      <div class="functionItem" @click="toggleFullScreen">
        <el-tooltip class="box-item" effect="dark" content="全屏" placement="left">
          <img src="./images/iconFull.webp" alt="" />
        </el-tooltip>
      </div>
      <div class="functionItem" @click="expandAllNodes()">
        <el-tooltip class="box-item" effect="dark" content="全部展开" placement="left">
          <img src="./images/iconPlus.webp" alt="" />
        </el-tooltip>
      </div>
      <div class="functionItem" @click="foldAllNodes()">
        <el-tooltip class="box-item" effect="dark" content="全部收起" placement="left">
          <img src="./images/iconMinus.webp" alt="" />
        </el-tooltip>
      </div>
      <div class="functionItem" @click="foldAllNodes()">
        <el-tooltip class="box-item" effect="dark" content="刷新" placement="left">
          <img src="./images/iconRefresh.webp" alt="" />
        </el-tooltip>
      </div>
      <div class="functionItem" @click="downloadImpByChart">
        <el-tooltip class="box-item" effect="dark" content="下载" placement="left">
          <img src="./images/iconDownload.webp" alt="" />
        </el-tooltip>
      </div>
    </div>
    <!-- 绘制架构图盒子 -->
    <div id="appc" ref="appc" :style="styles"></div>
  </div>
</template>
<script>
export default {
  name: 'EquityChart',
}
</script>
<script setup>
import * as d3 from 'd3'
import { onMounted, ref } from 'vue'
import { ElTooltip } from 'element-plus'
const props = defineProps({
  styles: {
    type: Object,
    default: () => {
      return {
        height: '650px',
      }
    },
  },
  data: {
    type: Object,
    default: () => {},
  },
})

//一些配置项
const config = ref({
  // 节点的横向距离
  dx: 200,
  // 节点的纵向距离
  dy: 170,
  // svg的viewBox的宽度
  width: 0,
  // svg的viewBox的高度
  height: 650,
  // 节点的矩形框宽度
  rectWidth: 170,
  // 节点的矩形框高度
  rectHeight: 70,
})

const svgs = ref(null)
const gAlls = ref(null)
const gLinks = ref(null)
const gNodes = ref(null)
// 给树加坐标点的方法
const tree = ref(null)
// 投资公司树的根节点
const rootOfDown = ref(null)
// 股东树的根节点
const rootOfUp = ref(null)
//是否全屏
const isFullscreen = ref(true)
onMounted(() => {
  drawChart({
    type: 'fold',
  })
  window.addEventListener('resize', function () {
    //ESC退出全屏改变图表
    if (!checkFull()) {
      isFullscreen.value = true
    }
    const svg = document.getElementById('mysvg')
    svg.setAttribute('height', window.innerHeight)
  })
})

// 初始化树结构数据
function drawChart(options) {
  // 宿主元素的d3选择器对象
  let host = d3.select(document.getElementById('appc'))
  // 宿主元素的DOM，通过node()获取到其DOM元素对象
  let dom = host.node()
  // 宿主元素的DOMRect
  let domRect = dom.getBoundingClientRect()
  // svg的宽度和高度
  config.value.width = domRect.width
  config.value.height = domRect.height
  let oldSvg = host.select('svg')
  // 如果宿主元素中包含svg标签了，那么则删除这个标签，再重新生成一个
  if (!oldSvg.empty()) {
    oldSvg.remove()
  }
  const svg = d3
    .create('svg')
    .attr('id', 'mysvg')
    .attr('viewBox', () => {
      let parentsLength = props.data.parents ? props.data.parents.length : 0
      return [
        -config.value.width / 2,
        // 如果有父节点，则根节点居中，否则根节点上浮一段距离
        parentsLength > 0 ? -config.value.height / 2 : -config.value.height / 3,
        config.value.width,
        config.value.height,
      ]
    })
    .style('user-select', 'none')
    .style('cursor', 'move')

  // 包括连接线和节点的总集合
  const gAll = svg.append('g').attr('id', 'all')
  svg
    .call(
      d3
        .zoom()
        .scaleExtent([0.5, 2])
        .on('zoom', (e) => {
          gAll.attr('transform', () => {
            return `translate(${e.transform.x},${e.transform.y}) scale(${e.transform.k})`
          })
        })
    )
    .on('dblclick.zoom', null) // 取消默认的双击放大事件
  gAlls.value = gAll
  // 连接线集合
  gLinks.value = gAll.append('g').attr('id', 'linkGroup')
  // 节点集合
  gNodes.value = gAll.append('g').attr('id', 'nodeGroup')
  // 设置好节点之间距离的tree方法
  tree.value = d3.tree().nodeSize([config.value.dx, config.value.dy])
  rootOfDown.value = d3.hierarchy(props.data, (d) => d.children)
  rootOfUp.value = d3.hierarchy(props.data, (d) => d.parents)
  tree.value(rootOfDown.value)
  ;[rootOfDown.value.descendants(), rootOfUp.value.descendants()].forEach((nodes) => {
    nodes.forEach((node) => {
      node._children = node.children || null
      if (options.type === 'all') {
        //如果是all的话，则表示全部都展开
        node.children = node._children
      } else if (options.type === 'fold') {
        //如果是fold则表示除了父节点全都折叠
        // 将非根节点的节点都隐藏掉（其实对于这个组件来说加不加都一样）
        if (node.depth) {
          node.children = null
        }
      }
    })
  })
  //箭头(下半部分)
  svg
    .append('marker')
    .attr('id', 'markerOfDown')
    .attr('markerUnits', 'userSpaceOnUse')
    .attr('viewBox', '0 -5 10 10') //坐标系的区域
    .attr('refX', 55) //箭头坐标
    .attr('refY', 0)
    .attr('markerWidth', 10) //标识的大小
    .attr('markerHeight', 10)
    .attr('orient', '90') //绘制方向，可设定为：auto（自动确认方向）和 角度值
    .attr('stroke-width', 2) //箭头宽度
    .append('path')
    .attr('d', 'M0,-5L10,0L0,5') //箭头的路径
    .attr('fill', '#215af3') //箭头颜色
  //箭头(上半部分)
  svg
    .append('marker')
    .attr('id', 'markerOfUp')
    .attr('markerUnits', 'userSpaceOnUse')
    .attr('viewBox', '0 -5 10 10') //坐标系的区域
    .attr('refX', -50) //箭头坐标
    .attr('refY', 0)
    .attr('markerWidth', 10) //标识的大小
    .attr('markerHeight', 10)
    .attr('orient', '90') //绘制方向，可设定为：auto（自动确认方向）和 角度值
    .attr('stroke-width', 2) //箭头宽度
    .append('path')
    .attr('d', 'M0,-5L10,0L0,5') //箭头的路径
    .attr('fill', '#215af3') //箭头颜色
  svgs.value = svg
  update()
  // 将svg置入宿主元素中
  host.append(function () {
    return svg.node()
  })
}
// 更新数据
function update(source) {
  if (!source) {
    source = {
      x0: 0,
      y0: 0,
    }
    // 设置根节点所在的位置（原点）
    rootOfDown.value.x0 = 0
    rootOfDown.value.y0 = 0
    rootOfUp.value.x0 = 0
    rootOfUp.value.y0 = 0
  }
  let nodesOfDown = rootOfDown.value.descendants().reverse()
  let linksOfDown = rootOfDown.value.links()
  let nodesOfUp = rootOfUp.value.descendants().reverse()
  let linksOfUp = rootOfUp.value.links()
  tree.value(rootOfDown.value)
  tree.value(rootOfUp.value)
  const myTransition = svgs.value.transition().duration(500)
  /***  绘制子公司树(下)  ***/
  const node1 = gNodes.value.selectAll('g.nodeOfDownItemGroup').data(nodesOfDown, (d) => {
    return d.data.id
  })
  const node1Enter = node1
    .enter()
    .append('g')
    .attr('class', 'nodeOfDownItemGroup')
    .attr('transform', (d) => {
      return `translate(${source.x0},${source.y0})`
    })
    .attr('fill-opacity', 0)
    .attr('stroke-opacity', 0)
    .style('cursor', 'pointer')
  // 外层的矩形框
  node1Enter
    .append('rect')
    .attr('width', (d) => {
      if (d.depth === 0) {
        return (d.data.name.length + 2) * 16
      }
      return config.value.rectWidth
    })
    .attr('height', (d) => {
      if (d.depth === 0) {
        return 40
      }
      return config.value.rectHeight
    })
    .attr('x', (d) => {
      if (d.depth === 0) {
        return (-(d.data.name.length + 2) * 16) / 2
      }
      return -config.value.rectWidth / 2
    })
    .attr('y', (d) => {
      if (d.depth === 0) {
        return -15
      }
      return -config.value.rectHeight / 2
    })
    .attr('rx', 5)
    .attr('stroke-width', 1)
    .attr('stroke', (d) => {
      if (d.depth === 0) {
        return '#5682ec'
      }
      return '#7A9EFF'
    })
    .attr('fill', (d) => {
      if (d.depth === 0) {
        return '#7A9EFF'
      }
      return '#FFFFFF'
    })
    .on('click', (e, d) => {
      nodeClickEvent(e, d)
    })
  // 文本主标题
  node1Enter
    .append('text')
    .attr('class', 'main-title')
    .attr('x', (d) => {
      return 0
    })
    .attr('y', (d) => {
      if (d.depth === 0) {
        return 10
      }
      return -14
    })
    .attr('text-anchor', (d) => {
      return 'middle'
    })
    .text((d) => {
      if (d.depth === 0) {
        return d.data.name
      } else {
        return d.data.name.length > 11 ? d.data.name.substring(0, 11) : d.data.name
      }
    })
    .attr('fill', (d) => {
      if (d.depth === 0) {
        return '#FFFFFF'
      }
      return '#000000'
    })
    .style('font-size', (d) => (d.depth === 0 ? 16 : 14))
    .style('font-family', '黑体')
    .style('font-weight', 'bold')
    .append('svg:title')
    .text((d) => d.data.name)

  // 副标题
  node1Enter
    .append('text')
    .attr('class', 'sub-title')
    .attr('x', (d) => {
      return 0
    })
    .attr('y', (d) => {
      return 5
    })
    .attr('text-anchor', (d) => {
      return 'middle'
    })
    .text((d) => {
      if (d.depth !== 0) {
        let subTitle = d.data.name.substring(11)
        if (subTitle.length > 10) {
          return subTitle.substring(0, 10) + '...'
        } else {
          return subTitle
        }
      }
    })
    .style('font-size', (d) => 14)
    .style('font-family', '黑体')
    .style('font-weight', 'bold')
    .append('svg:title')
    .text((d) => d.data.name)
  //融资轮次
  node1Enter
    .append('svg:rect')
    .attr('x', '-84')
    .attr('y', '14')
    .attr('rx', 5)
    .attr('width', (d) => {
      if (d.depth !== 0 && d.data.rounds) {
        return config.value.rectWidth - 2
      }
    })
    .attr('height', '20')
    .style('fill', '#E5F3FE')
  node1Enter
    .append('text')
    .attr('x', '0')
    .attr('dy', '30')
    .attr('text-anchor', 'middle')

    .attr('class', 'linkname')
    // .style("fill", "#666")
    .style('font-size', 12)
    .attr('fill', '#008BF8')
    .text(function (d) {
      if (d.depth !== 0 && d.data.rounds) {
        var str = '融资轮次：' + d.data.rounds
        return str.length > 13 ? str.substring(0, 18) + '..' : str
      }
    })

  // 控股比例
  node1Enter
    .append('text')
    .attr('class', 'percent')
    .attr('x', (d) => {
      return 15
    })
    .attr('y', (d) => {
      return -55
    })
    .text((d) => {
      if (d.depth !== 0) {
        return d.data.percent
      }
    })
    .attr('fill', '#0084FF')
    .style('font-family', '黑体')
    .style('font-size', (d) => 14)
  node1Enter
    .append('svg:rect')
    .attr('x', '-40')
    .attr('y', '-70')
    .attr('rx', 2)
    .attr('width', function (d) {
      return d.depth !== 0 && d.data.percent ? 30 : 0
    })
    .attr('height', function (d) {
      return d.depth !== 0 && d.data.percent ? 20 : 0
    })
    .style('fill', '#EBF5FF')
  node1Enter
    .append('text')
    .attr('x', '-37')
    .attr('dy', '-55')
    .attr('text-anchor', 'start')
    .style('fill', '#0084FF')
    .style('font-size', 12)
    .text(function (d) {
      return d.depth !== 0 && d.data.percent ? '控股' : ''
    })
  //吊销/注销
  node1Enter
    .append('svg:rect')
    .attr('x', '10')
    .attr('y', '-48')
    .attr('rx', 2)
    .attr('width', function (d) {
      return d.depth !== 0 && d.data.off ? 45 : 0
    })
    .attr('height', function (d) {
      return d.depth !== 0 && d.data.off ? 10 : 0
    })
    .style('fill', '#fde2e2')
  node1Enter
    .append('text')
    .attr('x', '15')
    .attr('dy', '-40')
    .attr('text-anchor', 'start')
    .style('fill', '#f89898')
    .style('font-size', 8)
    .text(function (d) {
      return d.depth !== 0 && d.data.off ? '吊销/注销' : ''
    })
  // 增加展开按钮
  const expandBtnG = node1Enter
    .append('g')
    .attr('class', 'expandBtn')
    .attr('transform', (d) => {
      return `translate(${0},${config.value.rectHeight / 2})`
    })
    .style('display', (d) => {
      // 如果是根节点，不显示
      if (d.depth === 0) {
        return 'none'
      }
      // 如果没有子节点，则不显示
      if (!d._children) {
        return 'none'
      }
    })
    .on('click', (e, d) => {
      if (d.children) {
        d._children = d.children
        d.children = null
      } else {
        d.children = d._children
      }
      update(d)
    })

  expandBtnG.append('circle').attr('r', 8).attr('fill', '#7A9EFF').attr('cy', 8)

  expandBtnG
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('fill', '#ffffff')
    .attr('y', 13)
    .style('font-size', 16)
    .style('font-family', '微软雅黑')
    .text((d) => {
      return d.children ? '-' : '+'
    })

  const link1 = gLinks.value.selectAll('path.linkOfDownItem').data(linksOfDown, (d) => d.target.data.id)

  const link1Enter = link1
    .enter()
    .append('path')
    .attr('class', 'linkOfDownItem')
    .attr('d', (d) => {
      let o = {
        source: {
          x: source.x0,
          y: source.y0,
        },
        target: {
          x: source.x0,
          y: source.y0,
        },
      }
      return drawLink(o)
    })
    .attr('fill', 'none')
    .attr('stroke', '#7A9EFF')
    .attr('stroke-width', 1)
    .attr('marker-end', 'url(#markerOfDown)')

  // 有元素update更新和元素新增enter的时候
  node1
    .merge(node1Enter)
    .transition(myTransition)
    .attr('transform', (d) => {
      return `translate(${d.x},${d.y})`
    })
    .attr('fill-opacity', 1)
    .attr('stroke-opacity', 1)

  // 有元素消失时
  node1
    .exit()
    .transition(myTransition)
    .remove()
    .attr('transform', (d) => {
      return `translate(${source.x0},${source.y0})`
    })
    .attr('fill-opacity', 0)
    .attr('stroke-opacity', 0)

  link1.merge(link1Enter).transition(myTransition).attr('d', drawLink)

  link1
    .exit()
    .transition(myTransition)
    .remove()
    .attr('d', (d) => {
      let o = {
        source: {
          x: source.x,
          y: source.y,
        },
        target: {
          x: source.x,
          y: source.y,
        },
      }
      return drawLink(o)
    })

  /***  绘制股东树(上)  ***/

  nodesOfUp.forEach((node) => {
    node.y = -node.y
  })

  const node2 = gNodes.value.selectAll('g.nodeOfUpItemGroup').data(nodesOfUp, (d) => {
    return d.data.id
  })

  const node2Enter = node2
    .enter()
    .append('g')
    .attr('class', 'nodeOfUpItemGroup')
    .attr('transform', (d) => {
      return `translate(${source.x0},${source.y0})`
    })
    .attr('fill-opacity', 0)
    .attr('stroke-opacity', 0)
    .style('cursor', 'pointer')

  // 外层的矩形框
  node2Enter
    .append('rect')
    .attr('width', (d) => {
      if (d.depth === 0) {
        return (d.data.name.length + 2) * 16
      }
      return config.value.rectWidth
    })
    .attr('height', (d) => {
      if (d.depth === 0) {
        return 40
      }
      return config.value.rectHeight
    })
    .attr('x', (d) => {
      if (d.depth === 0) {
        return (-(d.data.name.length + 2) * 16) / 2
      }
      return -config.value.rectWidth / 2
    })
    .attr('y', (d) => {
      if (d.depth === 0) {
        return -15
      }
      return -config.value.rectHeight / 2
    })
    .attr('rx', 5)
    .attr('stroke-width', 1)
    .attr('stroke', (d) => {
      if (d.depth === 0) {
        return '#5682ec'
      }
      return '#7A9EFF'
    })
    .attr('fill', (d) => {
      if (d.depth === 0) {
        return '#7A9EFF'
      }
      return '#FFFFFF'
    })
    .on('click', (e, d) => {
      nodeClickEvent(e, d)
    })
  // 文本主标题
  node2Enter
    .append('text')
    .attr('class', 'main-title')
    .attr('x', (d) => {
      return 0
    })
    .attr('y', (d) => {
      if (d.depth === 0) {
        return 10
      }
      return -14
    })
    .attr('text-anchor', (d) => {
      return 'middle'
    })
    .text((d) => {
      if (d.depth === 0) {
        return d.data.name
      } else {
        return d.data.name.length > 11 ? d.data.name.substring(0, 11) : d.data.name
      }
    })
    .attr('fill', (d) => {
      if (d.depth === 0) {
        return '#FFFFFF'
      }
      return '#000000'
    })
    .style('font-size', (d) => (d.depth === 0 ? 16 : 14))
    .style('font-family', '黑体')
    .style('font-weight', 'bold')
    .append('svg:title')
    .text((d) => d.data.name)
  // 副标题
  node2Enter
    .append('text')
    .attr('class', 'sub-title')
    .attr('x', (d) => {
      return 0
    })
    .attr('y', (d) => {
      return 5
    })
    .attr('text-anchor', (d) => {
      return 'middle'
    })
    .text((d) => {
      if (d.depth !== 0) {
        let subTitle = d.data.name.substring(11)
        if (subTitle.length > 10) {
          return subTitle.substring(0, 10) + '...'
        }
        return subTitle
      }
    })
    .style('font-size', (d) => 14)
    .style('font-family', '黑体')
    .style('font-weight', 'bold')
    .append('svg:title')
    .text((d) => d.data.name)

  // 控股比例
  node2Enter
    .append('text')
    .attr('class', 'percent')
    .attr('x', (d) => {
      return 12
    })
    .attr('y', (d) => {
      return 55
    })
    .text((d) => {
      if (d.depth !== 0) {
        return d.data.percent
      }
    })
    .attr('fill', function (d) {
      return d.data.controlling ? '#FA6B64' : '#000000'
    })
    .style('font-family', '黑体')
    .style('font-size', (d) => 14)
  //地址
  node2Enter
    .append('svg:rect')
    .attr('x', '50')
    .attr('y', '-55')
    .attr('rx', 2)
    .attr('width', function (d) {
      return d.depth !== 0 && d.data.address ? 28 : 0
    })
    .attr('height', function (d) {
      return d.depth !== 0 && d.data.address ? 15 : 0
    })
    .style('fill', ' #e1f3d8')
  node2Enter
    .append('text')
    .attr('x', '53')
    .attr('dy', '-44')
    .attr('text-anchor', 'start')
    .style('fill', '#95d475')
    .style('font-size', 10)
    .text(function (d) {
      return d.depth !== 0 && d.data.address ? d.data.address : ''
    })
  //实际控股人
  node2Enter
    .append('svg:rect')
    .attr('x', -50)
    .attr('y', -90)
    .attr('width', function (d) {
      return d.data.controlling ? 100 : 0
    })
    .attr('height', function (d) {
      return d.data.controlling ? 40 : 0
    })
    .attr('rx', 2)
    .style('stroke', function (d) {
      return d.data.controlling ? '#FA6B64' : '#F1B03A'
    })
    .style('fill', function (d) {
      return d.data.controlling ? '#FA6B64' : '#F1B03A' //节点背景色
    })
  node2Enter
    .append('svg:path')
    .attr('fill', (d) => {
      return d.data.controlling ? '#FA6B64' : '#F1B03A'
    })
    .attr('d', function (d) {
      if (d.data.controlling) {
        return 'M0 -44 L-10 -54 L10 -54 Z'
      } else {
        return ''
      }
    })
  node2Enter
    .append('text')
    .attr('x', '0')
    .attr('dy', '-74')
    .attr('text-anchor', 'middle')
    .style('fill', '#fff')
    .style('font-size', 12)
    .text(function (d) {
      return d.data.controlling ? '实际控制人' : ''
    })
  node2Enter
    .append('text')
    .attr('x', '0')
    .attr('dy', '-58')
    .attr('text-anchor', 'middle')
    .style('fill', '#fff')
    .style('font-size', 12)
    .text(function (d) {
      return d.data.controlling ? '受益所有人' : ''
    })
  // 增加展开按钮
  const expandBtnG2 = node2Enter
    .append('g')
    .attr('class', 'expandBtn')
    .attr('transform', (d) => {
      return `translate(${0},${-config.value.rectHeight / 2})`
    })
    .style('display', (d) => {
      // 如果是根节点，不显示
      if (d.depth === 0) {
        return 'none'
      }
      // 如果没有子节点，则不显示
      if (!d._children) {
        return 'none'
      }
    })
    .on('click', (e, d) => {
      if (d.children) {
        d._children = d.children
        d.children = null
      } else {
        d.children = d._children
      }
      update(d)
    })

  expandBtnG2.append('circle').attr('r', 8).attr('fill', '#7A9EFF').attr('cy', -8)

  expandBtnG2
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('fill', '#ffffff')
    .attr('y', -3)
    .style('font-size', 16)
    .style('font-family', '微软雅黑')
    .text((d) => {
      return d.children ? '-' : '+'
    })

  const link2 = gLinks.value.selectAll('path.linkOfUpItem').data(linksOfUp, (d) => d.target.data.id)

  const link2Enter = link2
    .enter()
    .append('path')
    .attr('class', 'linkOfUpItem')
    .attr('d', (d) => {
      let o = {
        source: {
          x: source.x0,
          y: source.y0,
        },
        target: {
          x: source.x0,
          y: source.y0,
        },
      }
      return drawLink(o)
    })
    .attr('fill', 'none')
    .attr('stroke', '#7A9EFF')
    .attr('stroke-width', 1)
    .attr('marker-end', 'url(#markerOfUp)')

  // 有元素update更新和元素新增enter的时候
  node2
    .merge(node2Enter)
    .transition(myTransition)
    .attr('transform', (d) => {
      return `translate(${d.x},${d.y})`
    })
    .attr('fill-opacity', 1)
    .attr('stroke-opacity', 1)
  // 有元素消失时
  node2
    .exit()
    .transition(myTransition)
    .remove()
    .attr('transform', (d) => {
      return `translate(${source.x0},${source.y0})`
    })
    .attr('fill-opacity', 0)
    .attr('stroke-opacity', 0)
  link2.merge(link2Enter).transition(myTransition).attr('d', drawLink)
  link2
    .exit()
    .transition(myTransition)
    .remove()
    .attr('d', (d) => {
      let o = {
        source: {
          x: source.x,
          y: source.y,
        },
        target: {
          x: source.x,
          y: source.y,
        },
      }
      return drawLink(o)
    })
  // node数据改变的时候更改一下加减号
  const expandButtonsSelection = d3.selectAll('g.expandBtn')
  expandButtonsSelection
    .select('text')
    .transition()
    .text((d) => {
      return d.children ? '-' : '+'
    })

  rootOfDown.value.eachBefore((d) => {
    d.x0 = d.x
    d.y0 = d.y
  })
  rootOfUp.value.eachBefore((d) => {
    d.x0 = d.x
    d.y0 = d.y
  })
}
// 直角连接线 by wushengyuan
function drawLink({ source, target }) {
  const halfDistance = (target.y - source.y) / 2
  const halfY = source.y + halfDistance
  return `M${source.x},${source.y} L${source.x},${halfY} ${target.x},${halfY} ${target.x},${target.y}`
}
// 展开所有的节点
function expandAllNodes() {
  drawChart({
    type: 'all',
  })
}
// 将所有节点都折叠
function foldAllNodes() {
  drawChart({
    type: 'fold',
  })
}
//点击节点获取节点数据
function nodeClickEvent(e, d) {}
//全屏-退出全屏
function toggleFullScreen(e) {
  isFullscreen.value = !isFullscreen.value
  FullScreen(document.getElementById('borrow'))
}
//全屏
function fullele() {
  return (
    document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || null
  )
}
//判断是否为全屏
function checkFull() {
  return !!(document.webkitIsFullScreen || fullele())
}
//全屏-退出全屏
function FullScreen(el) {
  if (isFullscreen.value) {
    //退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (!document.msRequestFullscreen) {
      document.msExitFullscreen()
    }
  } else {
    //进入全屏
    if (el.requestFullscreen) {
      el.requestFullscreen()
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen()
    } else if (el.webkitRequestFullscreen) {
      //改变平面图在google浏览器上面的样式问题
      el.webkitRequestFullscreen()
    } else if (el.msRequestFullscreen) {
      isFullscreen.value = true
      el.msRequestFullscreen()
    }
  }
}
//下载为图片
function downloadImpByChart(chartName) {
  //得到svg的真实大小
  const svg = document.querySelector('svg')
  let box = svg.getBBox(),
    x = box.x,
    y = box.y,
    width = box.width * 2,
    height = box.height * 2
  //克隆svg
  var node = svg.cloneNode(true)
  //重新设置svg的width,height,viewbox
  node.setAttribute('width', width * 2)
  node.setAttribute('height', height * 2)
  node.setAttribute('viewBox', [x, y, width, height])
  downloadSvgFn(node, width, height, props.data.name)
}
//下载
function downloadSvgFn(svg, width, height, rootName) {
  var serializer = new XMLSerializer()
  var source = '<?xml version="1.0" standalone="no"?>\r\n' + serializer.serializeToString(svg)
  var image = new Image()
  image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source)
  image.onload = function () {
    var canvas = document.createElement('canvas')
    canvas.width = width + 40
    canvas.height = height + 40
    var context = canvas.getContext('2d')
    context.rect(0, 0, canvas.width, canvas.height)
    context.fillStyle = '#fff'
    context.fill()
    context.drawImage(image, 20, 20)
    var url = canvas.toDataURL('image/png')
    var a = document.createElement('a')
    a.download = `${rootName}-股权穿透图.png`
    a.href = url
    a.click()
    return
  }
}
</script>

<style lang="scss" scoped>
#borrow {
  background: #fff;
  position: relative;
}
.functionBox {
  padding: 5px;
  position: absolute;
  right: 10px;
  bottom: 45%;
  display: flex;
  flex-direction: column;
  background: #f8f8f8;
  transition: all linear 0.2s;
  border-radius: 8px;

  .functionItem {
    color: #444;
    height: 35px;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 4px;
  }
  functionItem > img {
    width: 100%;
    height: 100%;
  }
  .functionItem:hover {
    background: rgb(233, 233, 233);
  }
}
</style>
