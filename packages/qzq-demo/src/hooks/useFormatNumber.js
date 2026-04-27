import { computed } from 'vue'

const formatNumber2 = (value) => {
  // 判断有效数值（包含0）
  if (value === null || value === undefined || isNaN(Number(value))) {
    return '0'
  }
  // 转换为数字并保留两位小数
  const num = Number(value).toFixed(2)
  // 去除无效零和小数点
  return num.replace(/(\.0*$|(\.\d*[1-9])0+$)/, '$2')
}

const useFormatNumber = () => {
  const formatNumber = computed(() => (value) => {
    return formatNumber2(value)
  })
  return {
    formatNumber,
  }
}
export default useFormatNumber

export { formatNumber2 }
