const Bar1Option = ({ xAxisList, dataList }) => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    legend: {
      left: 20,
      itemHeight: 14,
      itemWidth: 14,
      icon: 'circle',
    },
    xAxis: [
      {
        type: 'category',
        data: xAxisList,
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
      {
        type: 'value',
      },
    ],
    series: [
      ...dataList.map((item) => {
        if (item.type === 'bar') {
          return {
            type: 'bar',
            barWidth: 18,
            // barGap: 2,
            name: item.name,
            data: item.value,
          }
        } else if (item.type === 'line') {
          return {
            type: 'line',
            yAxisIndex: 1,
            name: item.name,
            data: item.value,
          }
        }
      }),
    ],
  }
}

export { Bar1Option }
