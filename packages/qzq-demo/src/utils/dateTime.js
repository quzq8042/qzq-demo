import dayjs from 'dayjs'

/**
 * 格式化时间
 * @param {*} time
 * @param {*} format
 */
export const formattedTimeValue = (time, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!time) {
    return ''
  }
  return dayjs(time).format(format)
}
