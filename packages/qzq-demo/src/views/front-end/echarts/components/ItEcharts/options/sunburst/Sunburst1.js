const colorList = [
  '#5D97FB',
  '#765DFB',
  '#76C3FB',
  '#ACE2D3',
  '#FCB3DA',
  '#A561FF',
  '#FFDA84',
  '#67DBFF',
  '#31D4BD',
  '#B9E89A',
  '#9FACFF',
  '#FFF278',
  '#FF8B8B',
  '#FE769B',
  '#EE84BF',
  '#C2CEFF',
  '#FFBD88',
  '#8AF1B3',
  '#A4C853',
  '#CEFF84',
  '#E4C1FF',
  '#D2D1EE',
  '#7BE4D2',
  '#A4CEFF',
  '#206EF2',
  '#A8EFFF',
]
const Sunburst1Option = ({ dataList }) => {
  return {
    series: {
      nodeClick: false,
      type: 'sunburst',
      emphasis: {
        focus: 'none',
      },
      data: dataList,
      label: {
        rotate: '0',
        formatter: '{b}\n{@score}',
      },
      sort: 'asc',
      center: ['50%', '50%'],
      color: colorList,
      itemStyle: {
        emphasis: {
          focus: false, // 取消点击时的高亮显示
        },
      },
      levels: [
        {
          r0: '0%',
          r: '55%',
          itemStyle: {
            borderWidth: 2,
          },
        },
        {
          r0: '0%',
          r: '55%',
          itemStyle: {
            borderWidth: 2,
          },
        },
        {
          r0: '75%',
          r: '55%',
          itemStyle: {
            borderWidth: 2,
          },
        },
      ],
    },
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: '{b} : {c}',
      fontSize: 16,
    },
  }
}

export { Sunburst1Option }
