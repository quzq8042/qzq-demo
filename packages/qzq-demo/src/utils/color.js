// 将rgb颜色值转换成hsv  rgb(99, 200, 247)
export const rgbToHsv = (val) => {
  if (val) {
    const regex = /rgb\((\d+), (\d+), (\d+)\)/
    const match = val.match(regex)
    if (match) {
      let r = parseInt(match[1], 10)
      let g = parseInt(match[2], 10)
      let b = parseInt(match[3], 10)
      // 将RGB值从0-255范围转换到0-1范围
      r /= 255
      g /= 255
      b /= 255
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      let h,
        s,
        v = max

      const d = max - min
      s = max === 0 ? 0 : d / max

      if (max === min) {
        h = 0 // 颜色为灰度
      } else {
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0)
            break
          case g:
            h = (b - r) / d + 2
            break
          case b:
            h = (r - g) / d + 4
            break
        }
        h /= 6
      }

      return `hsv(${parseFloat((h * 360).toFixed(2))},${parseFloat((s * 100).toFixed(2))}%,${parseFloat((v * 100).toFixed(2))}%)`
      //  [h * 360, s * 100, v * 100]
    } else {
      return null
    }
  } else {
    return null
  }
}
//  将hsv转换成rgb  hsv(298, 90%, 67%)
export const hsvToRgb = (val) => {
  if (val) {
    const regex = /hsv\((\d+),(\d+)%, (\d+)%\)/
    const match = val.match(regex)

    if (match) {
      let h = parseInt(match[1], 10)
      let s = parseInt(match[2], 10)
      let v = parseInt(match[3], 10)

      // 将HSV值从百分比范围转换到0-1范围
      h /= 360
      s /= 100
      v /= 100

      let r, g, b

      const i = Math.floor(h * 6)
      const f = h * 6 - i
      const p = v * (1 - s)
      const q = v * (1 - f * s)
      const t = v * (1 - (1 - f) * s)

      switch (i % 6) {
        case 0:
          ;(r = v), (g = t), (b = p)
          break
        case 1:
          ;(r = q), (g = v), (b = p)
          break
        case 2:
          ;(r = p), (g = v), (b = t)
          break
        case 3:
          ;(r = p), (g = q), (b = v)
          break
        case 4:
          ;(r = t), (g = p), (b = v)
          break
        case 5:
          ;(r = v), (g = p), (b = q)
          break
      }

      // 将RGB值从0-1范围转换回0-255范围
      r = Math.round(r * 255)
      g = Math.round(g * 255)
      b = Math.round(b * 255)
      return `rgb(${r}, ${g}, ${b})`
    } else {
      return null
    }
  } else {
    return null
  }
}
// 将hsv(199, 60%, 97%) 中的 s 替换成60%
export const changeHsvS = (val) => {
  if (val) {
    const [p1, p2, p3] = val.split(',')
    return `${p1},60%,${p3}`
  } else {
    return null
  }
}

// 获取随机数
export const getRandomValues = (min = 0, max = 1) => {
  const crypto = window.crypto || window.webkitCrypto || window.mozCrypto || window.oCrypto || window.msCrypto
  if (!crypto || !crypto.getRandomValues) {
    throw new Error('Cryptographic API not available')
  }
  const randomValue = Math.abs(crypto.getRandomValues(new Uint32Array(1))[0])
  const scaledValue = randomValue / (Math.pow(2, 32) - 1) // 将随机数缩放到0到1之间

  return min + scaledValue * (max - min)
}

// 根据字符的编码值的最后一位获取颜色值
export const getColorByCharCode = (str) => {
  const code = getCharCode(str)
  const color = code % 10
  const hsv = `hsv(${(color + 1) * 36},90%, 67%)`
  let rgb = hsvToRgb(hsv)
  return rgb
}

export const getCharCode = (str) => {
  return str.charCodeAt(0)
}

// 根据色值限制 获取一个随机rgb色值
export const getRandomHsvRgb = () => {
  const h = Math.floor(Math.random() * 360)
  const hsv = `hsv(${h},90%, 67%)`
  return hsvToRgb(hsv)
}
