<template>
  <div class="style-effect">
    <div class="container" :style="{ '--n': n }">
      <div v-for="(row, rowIndex) in 3" :key="row" class="line">
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
    <div class="box">
      <div class="rotation">
        <div v-for="item in 5" :key="item" class="item">
          <img class="img" lazy="auto" :src="getImagePath(item)" alt="图" />
        </div>
      </div>
      <div class="rotation-items">
        <div v-for="i in 9" :key="i" class="items"></div>
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
.style-effect {
  padding-bottom: 50px;
}
/* 这里是组件的样式 */
.container {
  padding: 20px 0;
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

<style lang="scss" scoped>
.box {
  display: flex;
  padding-top: 100px;
}
</style>

<!-- 旋转组件 -->
<style lang="scss" scoped>
/* 这里是组件的样式 */
.rotation {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-template:
    'A A B'
    'D E B'
    'D C C';
  gap: 5px;
  animation: rotation 10s linear infinite;
  .item {
    overflow: hidden;
    border: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
    &:nth-child(1) {
      grid-area: A;
    }
    &:nth-child(2) {
      grid-area: B;
    }
    &:nth-child(3) {
      grid-area: C;
    }
    &:nth-child(4) {
      grid-area: D;
    }
    &:nth-child(5) {
      grid-area: E;
    }
    > img {
      width: 260%;
      height: 260%;
      object-fit: cover;

      animation: rotation 10s linear infinite reverse;
    }
  }
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

<!-- 格子组件 -->
<style lang="scss" scoped>
.rotation-items {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  background-color: #000;
  transition: grid-template-rows 0.5s, grid-template-columns 0.5s;
}
@for $i from 1 through 9 {
  .items:nth-child(#{$i}) {
    background-color: hsl($i * 40%, 100%, 80%);
  }

  // 当鼠标悬停在第 $i 个格子上时，放大对应行和列
  .rotation-items:has(.items:nth-child(#{$i}):hover) {
    // 计算当前格子所在的行号 (1~3)
    $r: floor(($i - 1) / 3 + 1);
    // 计算当前格子所在的列号 (1~3)
    $c: ($i - 1) % 3 + 1;
    // 创建初始网格比例列表
    $arr: 1fr 1fr 1fr;
    // 将第 $r 行的比例改为 2fr（放大）
    $rows: set-nth($arr, $r, 2fr);
    // 将第 $c 列的比例改为 2fr（放大）
    $columns: set-nth($arr, $c, 2fr);
    // 应用修改后的行比例
    grid-template-rows: $rows;
    // 应用修改后的列比例
    grid-template-columns: $columns;
  }
}
</style>
