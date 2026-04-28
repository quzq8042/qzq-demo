<template>
  <div class="schedule-container">
    <!-- 左侧科目列表 -->
    <div class="subject-list">
      <div
        v-for="(subject, index) in subjects"
        :key="index"
        class="subject-item"
        :style="{ backgroundColor: subject.color }"
        draggable="true"
        @dragstart="handleDragStart($event, subject)"
      >
        {{ subject.text }}
      </div>
    </div>

    <!-- 右侧课程表 -->
    <div class="schedule-table-wrapper">
      <h2 class="table-title">课程表</h2>
      <div class="schedule-table">
        <table>
          <thead>
            <tr class="table-header">
              <th class="period-header">时段</th>
              <th class="section-header">节次</th>
              <th v-for="(day, index) in weekDays" :key="index" class="day-header">{{ day }}</th>
            </tr>
          </thead>
          <tbody>
            <!-- 上午4节 -->
            <tr v-for="row in 4" :key="'am-' + row">
              <td v-if="row === 1" :rowspan="4" class="period-cell">上午</td>
              <td class="section-cell">第{{ row }}节</td>
              <td
                v-for="(day, dayIndex) in weekDays"
                :key="dayIndex"
                class="day-cell"
                @dragover.prevent="handleDragOver($event)"
                @dragleave="handleDragLeave($event)"
                @drop="handleDrop($event, 'am', row, dayIndex)"
              >
                <span
                  v-if="getCellSubject('am', row, dayIndex)"
                  :style="{ backgroundColor: getCellSubject('am', row, dayIndex).color }"
                  class="subject-content"
                  draggable="true"
                  @dragstart="handleDragStart($event, 'am', row, dayIndex)"
                  @dragend="handleDragEnd"
                >
                  {{ getCellSubject('am', row, dayIndex).text }}
                  <span class="delete-btn" @click.stop="deleteSubject('am', row, dayIndex)">×</span>
                </span>
              </td>
            </tr>
            <!-- 下午4节 -->
            <tr v-for="row in 4" :key="'pm-' + row">
              <td v-if="row === 1" :rowspan="4" class="period-cell">下午</td>
              <td class="section-cell">第{{ row + 4 }}节</td>
              <td
                v-for="(day, dayIndex) in weekDays"
                :key="dayIndex"
                class="day-cell"
                @dragover.prevent="handleDragOver($event)"
                @dragleave="handleDragLeave($event)"
                @drop="handleDrop($event, 'pm', row, dayIndex)"
              >
                <span
                  v-if="getCellSubject('pm', row, dayIndex)"
                  :style="{ backgroundColor: getCellSubject('pm', row, dayIndex).color }"
                  class="subject-content"
                  draggable="true"
                  @dragstart="handleDragStart($event, 'pm', row, dayIndex)"
                  @dragend="handleDragEnd"
                >
                  {{ getCellSubject('pm', row, dayIndex).text }}
                  <span class="delete-btn" @click.stop="deleteSubject('pm', row, dayIndex)">×</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 科目列表
const subjects = ref([
  { text: '语文', color: '#FFE4E1' },
  { text: '数学', color: '#E0FFE0' },
  { text: '英语', color: '#E0E0FF' },
  { text: '音乐', color: '#FFFFE0' },
  { text: '政治', color: '#FFE0FF' },
  { text: '历史', color: '#E0FFFF' },
  { text: '体育', color: '#FFF0E0' },
])

// 星期列表
const weekDays = ref(['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'])

// 当前拖拽的科目
const draggedSubject = ref(null)
// 拖拽源位置（用于移动时删除原位置）
const dragSource = ref(null)

// 课程表数据结构: schedule[时段][节次][星期] = subject
const schedule = reactive({
  am: Array(4)
    .fill(null)
    .map(() => Array(7).fill(null)),
  pm: Array(4)
    .fill(null)
    .map(() => Array(7).fill(null)),
})

// 获取单元格中的科目
const getCellSubject = (period, row, dayIndex) => {
  return schedule[period][row - 1][dayIndex]
}

// 拖拽开始
const handleDragStart = (event, period, row, dayIndex) => {
  // 获取拖拽的科目
  let subject = null
  if (period && row !== undefined && dayIndex !== undefined) {
    // 从表格内拖拽
    subject = getCellSubject(period, row, dayIndex)
    dragSource.value = { period, row, dayIndex }
  } else {
    // 从左侧列表拖拽
    subject = period // period 参数实际上是 subject
    dragSource.value = null
  }

  draggedSubject.value = subject
  event.dataTransfer.effectAllowed = 'copy'
}

// 拖拽经过
const handleDragOver = (event) => {
  event.dataTransfer.dropEffect = 'copy'
  // 找到 day-cell 元素
  const cell = event.target.closest('.day-cell')
  if (cell) {
    cell.classList.add('drag-over')
  }
}

// 拖拽离开
const handleDragLeave = (event) => {
  const cell = event.target.closest('.day-cell')
  if (cell) {
    cell.classList.remove('drag-over')
  }
}

// 拖拽结束
const handleDragEnd = () => {
  draggedSubject.value = null
  dragSource.value = null

  // 移除所有拖拽效果
  document.querySelectorAll('.day-cell').forEach((cell) => {
    cell.classList.remove('drag-over')
  })
}

// 放置
const handleDrop = (event, period, row, dayIndex) => {
  // 移除当前单元格的拖拽效果
  const cell = event.target.closest('.day-cell')
  if (cell) {
    cell.classList.remove('drag-over')
  }

  if (draggedSubject.value) {
    // 复制科目到目标单元格
    schedule[period][row - 1][dayIndex] = { ...draggedSubject.value }

    // 如果是从表格内拖拽，删除原位置（但不能是同一位置）
    if (dragSource.value) {
      const source = dragSource.value
      if (!(source.period === period && source.row === row && source.dayIndex === dayIndex)) {
        schedule[source.period][source.row - 1][source.dayIndex] = null
      }
    }
  }
}

// 删除科目
const deleteSubject = (period, row, dayIndex) => {
  schedule[period][row - 1][dayIndex] = null
}
</script>

<style scoped>
.schedule-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 左侧科目列表 */
.subject-list {
  width: 120px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .subject-item {
    padding: 15px 20px;
    border-radius: 8px;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: #333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: grab;
    transition: transform 0.2s;
  }
  .subject-item:active {
    cursor: grabbing;
  }
  .subject-item:hover {
    transform: scale(1.05);
  }
}

/* 右侧课程表 */
.schedule-table-wrapper {
  flex: 1;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.table-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.schedule-table {
  border-collapse: collapse;
  width: 100%;
}

/* 表头 */
.table-header {
  background-color: #4a90d9;
  color: #fff;
}

.period-header,
.section-header {
  width: 80px;
  padding: 12px;
  text-align: center;
  font-weight: bold;
  border: 1px solid #3a7bc8;
}

.day-header {
  padding: 12px;
  text-align: center;
  font-weight: bold;
  border: 1px solid #3a7bc8;
  min-width: 100px;
}

/* 时段单元格（上午/下午） */
.period-cell {
  width: 80px;
  padding: 12px;
  text-align: center;
  font-weight: bold;
  background-color: #e8f4fc;
  border: 1px solid #ccc;
  vertical-align: middle;
}

/* 节次单元格 */
.section-cell {
  width: 80px;
  padding: 12px;
  text-align: center;
  font-weight: 500;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
}

/* 日期单元格 */
.day-cell {
  padding: 8px;
  text-align: center;
  border: 1px solid #ccc;
  background-color: #fff;
  min-height: 60px;
  vertical-align: middle;
  transition: all 0.2s;
  position: relative;
}

/* 单元格悬停效果 */
.schedule-table tbody .day-cell:hover {
  background-color: #f5f5f5;
}

/* 拖拽悬停效果 */
.schedule-table tbody .day-cell.drag-over {
  background-color: #e8f4fc;
  border-color: #4a90d9;
}

/* 科目内容 */
.subject-content {
  display: inline-block;
  padding: 6px 16px 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  cursor: grab;
  position: relative;
  transition: all 0.2s;
}

.subject-content:active {
  cursor: grabbing;
}

.subject-content:hover {
  transform: scale(1.05);
}

/* 删除按钮 */
.delete-btn {
  position: absolute;
  right: -8px;
  top: -8px;
  width: 18px;
  height: 18px;
  background-color: #ff4444;
  color: #fff;
  border-radius: 50%;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
  display: none;
  text-align: center;
  font-weight: bold;
}

.subject-content:hover .delete-btn {
  display: block;
}

.delete-btn:hover {
  background-color: #cc0000;
}
</style>
