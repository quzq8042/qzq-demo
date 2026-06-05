<template>
  <div class="calendar-header">
    <div class="header-left">
      <TimePicker :shadows="false" />
      <span v-if="holiday">{{ holiday }}</span>
    </div>
    <div class="header-left">
      <span>农历&nbsp;{{ lunarInfo.zodiac + '-' + lunarInfo.year }}年&nbsp;</span>
      <span>{{ lunarInfo.monthName }}&nbsp;</span>
      <span>{{ lunarInfo.dayName }}&nbsp;</span>
      <span v-if="lunarInfo.festival">{{ lunarInfo.festival }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import LunarCalendar from 'lunar-calendar'
import TimePicker from '@/components/TimePicker/index.vue'
//农历信息
const lunarInfo = ref({})
// 生肖列表
const zodiacList = ['子鼠', '丑牛', '寅虎', '卯兔', '辰龙', '巳蛇', '午马', '未羊', '申猴', '酉鸡', '戌狗', '亥猪']

// 根据单个生肖字映射到完整生肖名称
const getFullZodiac = (singleZodiac) => {
  if (!singleZodiac) return ''
  return zodiacList.find((zodiac) => zodiac.includes(singleZodiac)) || ''
}

// 获取今天日期并转换农历
const getTodayInfo = () => {
  // 农历转换
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const lunar = LunarCalendar.solarToLunar(year, month, day)
  lunarInfo.value = {
    zodiac: getFullZodiac(lunar.zodiac),
    year: lunar.lunarYear,
    monthName: lunar.lunarMonthName,
    dayName: lunar.lunarDayName,
    festival: lunar.lunarFestival || '', // 农历节日
  }
}
getTodayInfo()

// 节日数据
const holidays = {
  '01-01': '元旦节',
  '02-14': '情人节',
  '03-08': '妇女节',
  '03-15': '消费者权益日',
  '04-01': '愚人节',
  '05-01': '劳动节',
  '05-04': '青年节',
  '06-01': '儿童节',
  '07-01': '建党节',
  '08-01': '建军节',
  '09-10': '教师节',
  '10-01': '国庆节',
  '10-06': '老人节',
  '11-11': '光棍节',
  '12-25': '圣诞节',
}

// 获取节日
const getHoliday = (month, day) => {
  const key = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  return holidays[key] || null
}

// 当前日期信息
const holiday = computed(() => {
  const now = new Date()
  return getHoliday(now.getMonth() + 1, now.getDate())
})
</script>

<style lang="scss" scoped>
/* 头部日期信息 */
.calendar-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-size: 16px;
  font-weight: bold;
  font-family: 'Courier New', monospace;
  opacity: 0.9;
}

.header-left {
  display: flex;
  align-items: center;
}
</style>
