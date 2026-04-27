/*
 * @Description: 防抖函数
 * @param {*} fn  需要进行防抖处理的原始函数（如搜索请求、窗口调整等）。
 * @param {*} delay  防抖时间间隔，单位为毫秒。
 * @param {*} immediate  是否立即执行第一次调用，默认为 false。
 */

function debounce(fn, delay, immediate = false) {
  let timer = null
  // 用于存储定时器的 ID，通过闭包在多次调用中共享，确保能清除上一次的定时器。
  return function (...args) {
    //     返回一个新函数（闭包），用于替代原函数执行。
    // ...args：剩余参数语法，收集所有传入的参数，确保原函数能获得完整参数。
    const callNow = immediate && !timer
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      timer = null
      if (!immediate) {
        fn.apply(this, args)
      }
    }, delay)

    if (callNow) {
      fn.apply(this, args)
    }
  }
}
