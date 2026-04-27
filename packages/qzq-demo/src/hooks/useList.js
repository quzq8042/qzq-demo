import { ref, computed, watch } from 'vue'
import { scrollTo } from '@/utils/scroll-to.js'
/**
 * @description useList 页面列表操作方法封装
 *
 * @param {Function} request 请求方法
 * @param {Object} {
    options, // 请求参数
    tableOptions,  // 表格配置{}
    request, // 请求函数
    isAdd // 请求到的数据递增还是替换
 * }
 * @return {Object} {
    apiOptions,// 请求参数
    listPage, // 当前页码
    listLoading, // 加载中
    listTotal, // 总数
    listData, //  数据
    getListData, // 请求数据
    getTableOptions, // 表格配置
    sortOptions, // 排序配置
    selectOptions, // 筛选配置
    handlePageChange, //  页码改变
    handleSizeChange, //  每页条数改变
    }
 */

// 案例
// let demo = {
//   options: {
//     markNum: '',
//     skipNum: '',
//     lastDated: '',
//     dataType: '',
//     createTime: '',
//   },
//   tableOptions: [
//     {
//       dataIndex: 'id',// 唯一字段
//       title: 'ID',// 名称
//       width: '7', // 宽度
//       align: 'left', // 表格对齐方式
//       headerAlign: 'left',//标头对齐方式
//       tdslot: true,// 自定义表格
//       thslot: true,// 自定义标头
//       sortable:true,// 是否开启排序
//       selectable: true, // 是否开启筛选
//       selectOptions: [ // 筛选配置
//         { value: '', name: '全部' },
//         { value: '1', name: '会议通知' },
//         { value: '2', name: '通知公告' },
//       ],

//     },
//   ],
//   request: getTaskList,
// }

export const useList = ({ options, tableOptions, request, isAdd = false, isScrollTo = true }) => {
  const listLoading = ref(false)
  const listData = ref([])
  const listTotal = ref(0)
  const defaultOptinos = {
    pageNum: 1,
    pageSize: 10,
  }

  const apiOptions = ref(Object.assign({}, defaultOptinos, options))

  const getListData = async () => {
    listLoading.value = true
    if (isScrollTo) {
      scrollTo(0)
    }
    listData.value = []
    const res = await request(apiOptions.value)
    const { list, total } = res
    if (isAdd && apiOptions.value.pageNum != 1) {
      listData.value = listData.value.concat(list || [])
    } else {
      listData.value = list || []
    }

    listTotal.value = total || 0
    listLoading.value = false
  }
  getListData()

  const listPage = computed({
    get: () => apiOptions.value.pageNum,
    set: (val) => {
      apiOptions.value = {
        ...apiOptions.value,
        pageNum: val,
      }
      getListData()
    },
  })

  const sortKeys = tableOptions.filter((option) => option.sortable).map((option) => option.dataIndex)
  const selectKeys = tableOptions.filter((option) => option.selectable).map((option) => option.dataIndex)

  const getTableOptions = computed(() => {
    return tableOptions
  })

  // 排序
  const sortOptions = computed({
    get: () => {
      return sortKeys.reduce((acc, key) => {
        if (Reflect.has(apiOptions.value, key)) {
          acc[key] = apiOptions.value[key]
        }
        return acc
      }, {})
    },
    set: (val) => {
      let valObj = sortKeys.reduce((acc, key) => {
        if (Reflect.has(val, key)) {
          acc[key] = val[key]
        }
        return acc
      }, {})
      apiOptions.value = {
        ...apiOptions.value,
        ...valObj,
      }
      listPage.value = 1
    },
  })

  // 筛选
  let selectOptions = computed({
    get: () => {
      return selectKeys.reduce((acc, key) => {
        if (Reflect.has(apiOptions.value, key)) {
          acc[key] = apiOptions.value[key]
        }
        return acc
      }, {})
    },
    set: (val) => {
      let valObj = selectKeys.reduce((acc, key) => {
        if (Reflect.has(val, key)) {
          acc[key] = val[key]
        }
        return acc
      }, {})
      apiOptions.value = {
        ...apiOptions.value,
        ...valObj,
      }
      listPage.value = 1
    },
  })

  // 分页
  const handlePageChange = (val) => {
    if (val) {
      listPage.value = val
    }
  }
  const handleSizeChange = (val) => {
    if (val) {
      apiOptions.value = {
        ...apiOptions.value,
        pageSize: val,
      }
      listPage.value = 1
    }
  }

  return {
    apiOptions, // 请求参数
    listPage, // 当前页码
    listLoading, // 加载中
    listTotal, // 总数
    listData, //  数据
    getListData, // 请求数据
    getTableOptions, // 表格配置
    sortOptions, // 排序配置
    selectOptions, // 筛选配置
    handlePageChange, //  页码改变
    handleSizeChange, //  每页条数改变
  }
}
