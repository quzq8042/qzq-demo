/**
 * @Description: 节流函数
 * @param {*} fn  需要进行节流处理的原始函数（如滚动事件、鼠标移动事件等）。
 * @param {*} delay  节流时间间隔，单位为毫秒。
 * @param {*} options  配置选项，包含 leading（是否立即执行第一次调用）和 trailing（是否在最后一次调用后执行）。
 */

function throttle(fn, delay, options = { leading: true, trailing: true }) {
  let timer = null
  let lastTime = 0

  return function (...args) {
    const now = Date.now()

    if (!lastTime && !options.leading) {
      lastTime = now
    }

    const remaining = delay - (now - lastTime)

    if (remaining <= 0 || remaining > delay) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      fn.apply(this, args)
      lastTime = now
    } else if (!timer && options.trailing) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        lastTime = options.leading ? Date.now() : 0
        timer = null
      }, remaining)
    }
  }
}
