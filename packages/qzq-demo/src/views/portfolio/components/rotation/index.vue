<template>
  <div class="rotation">
    <div v-for="item in 5" :key="item" class="item">
      <img class="img" lazy="auto" :src="getImagePath(item)" alt="图" />
    </div>
  </div>
</template>

<script setup>
const getImagePath = (index) => {
  return new URL(`../hive-box/images/${index}.webp`, import.meta.url).href
}
</script>

<style lang="scss" scoped>
/* 这里是组件的样式 */
.rotation {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  margin-top: 50px;
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
