<template>
  <div class="main">
    <EquityChart :styles="styles" :data="chartData"></EquityChart>
  </div>
</template>
<script setup>
import EquityChart from './components/EquityChart/index.vue'
import { ref } from 'vue'
const styles = ref({
  height: '650px',
})
//股权树数据
const chartData = ref({
  id: 'abc1005',
  // 根节点名称
  name: '上海XXX股份有限公司',
  // 子节点列表
  children: [
    {
      id: 'abc1006',
      name: '深圳市XXX投资有限公司深圳市XXX投资有限公司深圳市XXX投资有限公司',
      percent: '100%', // 控股比例
      rounds: '天使轮', // 融资轮次
    },
    {
      id: 'abc1007',
      name: '山东XXX技术有限公司',
      percent: '100%',
      rounds: 'A轮',
    },
    {
      id: 'abc1008',
      name: '长沙XXX光伏材料有限公司',
      percent: '100%',
      rounds: '被收购',
      off: true, // 吊销/注销
    },
    {
      id: 'abc1009',
      name: '绍兴XXX科技发展有限公司',
      percent: '100%',
      children: [
        {
          id: 'abc1010',
          name: '绍兴XXX分析仪器有限公司',
          percent: '100%',
          children: [
            {
              id: 'abc1011',
              name: '绍兴XXX的子公司一',
              percent: '80%',
            },
            {
              id: 'abc1012',
              name: '绍兴XXX的子公司二',
              percent: '90%',
            },
            {
              id: 'abc1013',
              name: '绍兴XXX的子公司三',
              percent: '100%',
            },
          ],
        },
      ],
    },
    {
      id: 'abc1014',
      name: '湖南XXX电工科技有限公司',
      percent: '100%',
      children: [
        {
          id: 'abc1015',
          name: '湖南XXX自动化设备有限公司',
          percent: '100%',
          children: [
            {
              id: 'abc1016',
              name: '湖南XXX的子公司一',
              percent: '100%',
            },
            {
              id: 'abc1017',
              name: '湖南XXX的子公司二',
              percent: '90%',
            },
          ],
        },
      ],
    },
    {
      id: 'abc1020',
      name: '上海XXX分析仪器(集团)有限责任公司',
      percent: '100%',
      children: [
        {
          id: 'abc1021',
          name: '上海XXX分气体工业有限公司',
        },
      ],
    },
  ],
  // 父节点列表
  parents: [
    {
      id: 'abc2001',
      name: '香港XX集团有限责任公司',
      percent: '60%',
      address: '香港', //地址
      parents: [
        {
          id: 'abc2000',
          name: '香港XX集团有限公司',
          percent: '100%',
          address: '香港',
        },
      ],
    },
    {
      id: 'abc2002',
      name: '上海XXX集团',
      percent: '40%',
      parents: [
        {
          id: 'abc1010',
          name: '上海XXX有限公司',
          percent: '100%',
          parents: [
            {
              id: 'abc1011',
              name: '上海XXX的子公司一',
              percent: '80%',
            },
            {
              id: 'abc1012',
              name: '上海XXX的子公司二',
              percent: '90%',
            },
            {
              id: 'abc1013',
              name: '上海XXX的子公司三',
              percent: '100%',
            },
          ],
        },
      ],
    },
    {
      id: 'abc2003',
      name: '张三',
      percent: '40%',
      controlling: true, //实际控股人
    },
  ],
})
</script>
<style scoped>
.main {
  width: 100%;
  height: 100%;
  /* background: red; */
}
</style>
