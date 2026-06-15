const Pie1Option = ({ dataList }) => {
  return {
    tooltip: {},
    legend: {
      show: true,
      icon: 'circle',
      right: 'right',
      itemHeight: 12,
      itemWidth: 12,
    },
    series: [
      {
        type: 'pie',
        radius: ['30%', '50%'],
        center: ['40%', '50%'],
        label: {
          show: true,
          position: 'inner',
          formatter: ' {d}%',
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 0.5,
        },
        data: dataList,
      },
    ],
  }
}

export { Pie1Option }
