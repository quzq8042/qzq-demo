const Graph1Option = ({ dataList, links, increaseAmplitude }) => {
  let data = []
  if (Array.isArray(dataList) && dataList.length) {
    data = dataList.map((item) => {
      return {
        name: item.name,
        itemStyle: {
          color: item.person ? '#FF6382' : '#00B5D0',
        },
      }
    })
  }
  return {
    tooltip: {
      show: true,
    },
    series: [
      {
        zoom: increaseAmplitude,
        roam: 'scale',
        type: 'graph',
        force: {
          layoutAnimation: true,
          gravity: 0.01,
          repulsion: 120,
          edgeLength: 200,
        },
        layout: 'force',
        symbol: 'circle',
        edgeSymbol: ['none', 'arrow'],
        symbolSize: 65, // 调整节点的大小

        normal: {
          lineStyle: {
            color: '#fff',
            width: 1,
            type: 'solid',
            opacity: 0.7,
          },
        },
        label: {
          show: true,
          width: 50,
          position: 'inside',
          overflow: 'breakAll',
          fontSize: 12,
          color: '#fff',
        },
        // 连接两个关系对象的线上的标签
        edgeLabel: {
          show: true,
          fontSize: 12,
          // 标签内容
          formatter: function (param) {
            return param.data.category
          },
        },
        data: data,
        links: links,
      },
    ],
  }
}
export { Graph1Option }
