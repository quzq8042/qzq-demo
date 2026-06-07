<template>
  <div>
    <div>
      {{ formatPast('2024-1-1 11:11:11') }} <span>---------- "2024-1-1 11:11:11"</span>
      <br />
      {{ formatPast('2023-11-1 11:11:11') }} <span>---------- "2023-11-1 11:11:11"</span>
      <br />
      {{ formatPast('2015-07-10 21:32:01') }} <span>---------- "2015-07-10 21:32:01"</span>
      <br />
      {{ formatPast('2023-02-01 09:32:01', '-', false) }} <span>---------- "2023-02-01 09:32:01", "-", false</span>
      <br />
      {{ formatPast('2023.12.8 19:32:01', '/') }} <span>---------- "2023.12.8 19:32:01", "/"</span>
      <br />
      {{ formatPast('2023.12.8 19:32:01', '.') }} <span>---------- "2023.12.8 19:32:01", "."</span>
      <br />
      {{ formatPast('2023/5/10 11:32:01', '年月日') }} <span>---------- "2023/5/10 11:32:01", "年月日"</span>
      <br />
      {{ formatPast('2023/6/25 11:32:01', '月日', false) }} <span>---------- "2023/6/25 11:32:01", "月日", false</span>
      <br />
      {{ formatPast('2023/8/08 11:32:01', '年') }} <span>---------- "2023/8/08 11:32:01", "年"</span>
      <br />
    </div>
    <div>获取当前月的第一天及最后一天 {{ getFirstAndLastDayOfMonth() }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formatPast = (date, type = 'default', zeroFillFlag = true) => {
  // 定义countTime变量，用于存储计算后的数据
  let countTime
  // 获取当前时间戳
  let time = new Date().getTime()
  // 转换传入参数为时间戳
  let afferentTime = new Date(date).getTime()
  // 当前时间戳 - 传入时间戳
  time = Number.parseInt(`${time - afferentTime}`)
  if (time < 10000) {
    // 10秒内
    return '刚刚'
  } else if (time < 60000) {
    // 超过10秒少于1分钟内
    countTime = Math.floor(time / 1000)
    return `${countTime}秒前`
  } else if (time < 3600000) {
    // 超过1分钟少于1小时
    countTime = Math.floor(time / 60000)
    return `${countTime}分钟前`
  } else if (time < 86400000) {
    // 超过1小时少于24小时
    countTime = Math.floor(time / 3600000)
    return `${countTime}小时前`
  } else if (time >= 86400000 && type == 'default') {
    // 超过二十四小时（一天）且格式参数为默认"default"
    countTime = Math.floor(time / 86400000)
    //大于等于365天
    if (countTime >= 365) {
      return `${Math.floor(countTime / 365)}年前`
    }
    //大于等于30天
    if (countTime >= 30) {
      return `${Math.floor(countTime / 30)}个月前`
    }
    return `${countTime}天前`
  } else {
    // 一天（24小时）以上且格式不为"default"则按传入格式参数显示不同格式
    // 数字补零
    let Y = new Date(date).getFullYear()
    let M = new Date(date).getMonth() + 1
    let zeroFillM = M > 9 ? M : '0' + M
    let D = new Date(date).getDate()
    let zeroFillD = D > 9 ? D : '0' + D
    // 传入格式为"-" "/" "."
    if (type == '-' || type == '/' || type == '.') {
      return zeroFillFlag ? Y + type + zeroFillM + type + zeroFillD : Y + type + M + type + D
    }
    // 传入格式为"年月日"
    if (type == '年月日') {
      return zeroFillFlag ? Y + type[0] + zeroFillM + type[1] + zeroFillD + type[2] : Y + type[0] + M + type[1] + D + type[2]
    }
    // 传入格式为"月日"
    if (type == '月日') {
      return zeroFillFlag ? zeroFillM + type[0] + zeroFillD + type[1] : M + type[0] + D + type[1]
    }
    // 传入格式为"年"
    if (type == '年') {
      return Y + type
    }
  }
}

let arr = [
  { name: '李四', id: 2, pid: 0 }, //  []
  { name: '王五', id: 3, pid: 0 }, // []
  { name: '赵六', id: 4, pid: 3 }, // []
  { name: '吗六', id: 9, pid: 3 }, // []
  { name: '张三', id: 7, pid: 9 }, // []
  { name: '张五', id: 10, pid: 4 }, // []
]

/**
 * 递归模式，数组转tree
 * @param arr 目标数组
 * @param pid 第一级 目标id
 * @returns {*[]} tree
 * [
 *   { name: '李四', id: 2, pid: 0, children: [] },
 *   { name: '王五', id: 3, pid: 0, children: [ [Object], [Object] ] }
 * ]
 * @constructor
 */
function ArrayToTree(arr, pid = 0) {
  // 判断是否是数组 不是数组就返回 []
  if (!Array.isArray(arr) || !arr.length) return []
  let newArr = []
  arr.forEach((item) => {
    // 判断 当前item.pid 和 传入的pid 是否相等，相等就push 进去
    if (item.pid == pid) {
      newArr.push({
        ...item,
        children: ArrayToTree(arr, item.id),
      })
    }
  })
  return newArr
}
/**
 * 双重for循环模式，数组转tree
 * @param arr
 * @returns {any}
 * [
 *   { name: '李四', id: 2, pid: 0 },
 *   { name: '王五', id: 3, pid: 0, children: [ [Object], [Object] ] }
 * ]
 */
function arrToTreeOne(arr, pid = 0) {
  if (!Array.isArray(arr) || !arr.length) return []
  // 克隆一个新数组
  let copyArr = Object.assign([], arr)
  // 双重循环
  let newArr = copyArr.filter((item) => {
    arr.forEach((v) => {
      // 判断 id 和 pid 是否相同
      if (item.id === v.pid) {
        // 相同就判断有没有 children ， 有就push进去v 没有就 [v]
        if (item.children) {
          item.children.push(v)
        } else {
          item.children = [v]
        }
      }
    })

    if (item.pid == pid) return item
  })
  return newArr
}

/**
 * map模式 ，数组转tree
 * @param arr 目标数组
 * @param pid 第一级 目标id
 * @returns {*[]}
 * [
 *   { name: '李四', id: 2, pid: 0 },
 *   { name: '王五', id: 3, pid: 0, child: [ [Object], [Object] ] }
 * ]
 * @constructor
 */
function ArrAyToTreeMap(arr, pid = 0) {
  if (!Array.isArray(arr) || !arr.length) return []
  let map = {}
  // 把map的key 是item.id value是item
  arr.forEach((item) => (map[item.id] = item))
  let res = []
  arr.forEach((item) => {
    // item.pid 和 map的key 是否存在， 存在就 true 不存在就false
    let mapPid = map[item.pid]
    // 把pid顶级相等的插入进去
    if (item.pid == pid) {
      res.push(item)
    } else {
      if (mapPid) {
        // 存在就 判断 map的child 是否存在 ，不存在就赋值一个数组，在添加 item
        ;(mapPid.child || (mapPid.child = [])).push(item)
      }
    }
  })
  return res
}

/**
 * 过滤器的模式，数组转tree
 * @param arr
 * @returns []  数组对象的 tree  ，  有需要自己在 过滤一下指定的 pid
 * [
 *   { name: '李四', id: 2, pid: 0, children: [] },
 *   { name: '王五', id: 3, pid: 0, children: [ [Object], [Object] ] }
 * ]
 */
function arrToTreeArray(arr, pid = 0) {
  if (!Array.isArray(arr) || !arr.length) return []
  // 克隆一个新数组
  let copyArr = arr.filter((item) => {
    let children = arr.filter((v) => item.id === v.pid)
    item.children = children.length > 0 ? (item.children = children) : []
    if (item.pid == pid) {
      return item
    }
  })
  return copyArr
}
// console.log('[ ArrayToTree(arr) ] >', ArrayToTree(arr))
// console.log('[ arrToTreeOne(arr) ] >', arrToTreeOne(arr))
// console.log('[ ArrAyToTreeMap(arr) ] >', ArrAyToTreeMap(arr))
// console.log('[ arrToTreeArray(arr) ] >', arrToTreeArray(arr))

//获取当前月的第一天及最后一天
const getFirstAndLastDayOfMonth = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() // 注意：getMonth() 返回的月份是从0开始的

  // 获取当前月份的第一天
  const firstDay = new Date(year, month, 1)
  let firstDayOfMonth = firstDay
    .toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '-')

  // 获取当前月份的天数
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // 获取当前月份的最后一天
  const lastDay = new Date(year, month, daysInMonth)
  let lastDayOfMonth = lastDay
    .toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '-')
  return `第一天${firstDayOfMonth} 最后一天${lastDayOfMonth}`
}
</script>

<style lang="scss" scoped>
/* 这里是组件的样式 */
</style>
