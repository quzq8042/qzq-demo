<template>
  <div class="container" :style="{ '--n': n }">
    <div v-for="(row, rowIndex) in n" :key="row" class="line">
      <div
        v-for="(col, colIndex) in n"
        :key="col"
        class="item"
        :class="getItemClass(rowIndex, colIndex)"
        @mouseenter="handleEnter(rowIndex, colIndex)"
        @mouseleave="handleLeave"
      >
        <img class="img" lazy="auto" :src="getImagePath(col)" alt="图" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const n = 10
const hoveredRow = ref(-1)
const hoveredCol = ref(-1)

const getImagePath = (index) => {
  return new URL(`./images/${index}.webp`, import.meta.url).href
}

// 判断是否是相邻六边形
const isNeighbor = (row, col) => {
  if (hoveredRow.value === -1) return false

  const hRow = hoveredRow.value
  const hCol = hoveredCol.value
  const rowDiff = Math.abs(row - hRow)

  if (rowDiff === 0) {
    // 同一行：左边或右边
    return Math.abs(col - hCol) === 1
  } else if (rowDiff === 1) {
    // 上下一行
    if (hRow % 2 === 0) {
      // 偶数行（左对齐）：上/下一行的同列和后一列
      return col === hCol || col === hCol + 1
    } else {
      // 奇数行（右偏移）：上/下一行的同列和前一列
      return col === hCol || col === hCol - 1
    }
  }
  return false
}

const getItemClass = (row, col) => {
  if (hoveredRow.value === -1) return ''
  if (hoveredRow.value === row && hoveredCol.value === col) return 'active'
  if (isNeighbor(row, col)) return 'neighbor'
  return ''
}

const handleEnter = (row, col) => {
  hoveredRow.value = row
  hoveredCol.value = col
}

const handleLeave = () => {
  hoveredRow.value = -1
  hoveredCol.value = -1
}
</script>

<style lang="scss" scoped>
/* 这里是组件的样式 */
.container {
  --size: calc((100vw - var(--sidebar-width)) / var(--n));
  overflow: hidden;
  .line {
    display: flex;
    &:nth-child(even) {
      transform: translateX(calc(var(--size) / -2));
    }
    &:nth-child(n + 2) {
      margin-top: calc(var(--size) / -6);
    }
  }
  .item {
    flex-shrink: 0;
    width: var(--size);
    height: var(--size);
    outline: 2px solid #fff;
    -webkit-clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
    clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;

    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: opacity 0.3s ease;
    }

    &.active {
      transform: scale(1.15);
      z-index: 10;
      outline-width: 3px;
    }

    &.neighbor {
      transform: scale(0.9);
      .img {
        opacity: 0.4;
      }
    }
  }
}
</style>
