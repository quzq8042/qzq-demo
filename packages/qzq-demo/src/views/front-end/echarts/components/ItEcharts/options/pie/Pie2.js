const Pie2Option = ({ dataList }) => {
  return {
    tooltip: {},
    legend: {
      top: '5%',
      show: true,
      itemHeight: 12,
      itemWidth: 12,
    },
    series: [
      {
        type: 'pie',
        radius: ['30%', '50%'],
        center: ['50%', '50%'],
        label: {
          show: true,
          formatter: ' {b} {d}%',
        },
        data: dataList,
      },
    ],
  }
}

export { Pie2Option }
