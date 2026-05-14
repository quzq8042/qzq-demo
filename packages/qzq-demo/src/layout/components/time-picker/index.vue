<template>
  <div class="clock-container">
    <div class="date">{{ date }}</div>
    <div class="time">{{ time }}</div>
    <div class="greeting">{{ greeting }}</div>
  </div>
</template>

<script setup>
const time = ref(null)
const date = ref(null)
const greeting = ref(null)
function updateClock() {
  const now = new Date()

  // 更新时间
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  time.value = `${hours}:${minutes}:${seconds}`

  // 更新日期
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const weekday = weekdays[now.getDay()]
  date.value = `${year}-${month}-${day} ${weekday}`

  // 更新问候语
  const hour = now.getHours()
  if (hour < 6) {
    greeting.value = '夜深了，注意休息'
  } else if (hour < 12) {
    greeting.value = '早上好！'
  } else if (hour < 18) {
    greeting.value = '下午好！'
  } else {
    greeting.value = '晚上好！'
  }
}

// 初始更新
updateClock()
// 每秒更新一次
setInterval(updateClock, 1000)
</script>

<style lang="scss" scoped>
/* 这里是组件的样式 */
.clock-container {
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: calc(var(--header-height) - 25px);
  color: #ffffff;
}
.time,
.date {
  font-size: 16px;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  margin-right: 10px;
}
.greeting {
  font-size: 14px;
  font-weight: 500;
}
</style>
