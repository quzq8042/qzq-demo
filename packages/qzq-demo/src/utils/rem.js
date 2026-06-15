const baseSize = 16

function setRem() {
  const deviceWidth = document.documentElement.clientWidth || window.innerWidth
  const maxWidth = 1920
  const minWidth = 320

  const validWidth = Math.min(Math.max(deviceWidth, minWidth), maxWidth)
  const scale = validWidth / 1920

  let fontSize = baseSize * Math.min(scale, 2)
  fontSize = Math.max(fontSize, 12)

  document.documentElement.style.fontSize = fontSize + 'px'
}

setRem()

if (window.addEventListener) {
  window.addEventListener('resize', setRem)
  window.addEventListener('orientationchange', setRem)
}
