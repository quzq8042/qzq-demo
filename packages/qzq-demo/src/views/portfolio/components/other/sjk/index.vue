<template>
  <div>
    <div class="box">
      <p>第{{ currentIndex + 1 }}个 \ 共{{ imgList.length }}个</p>
      <p>答案:{{ res(imgList[currentIndex]) }}</p>
      <img :src="imgList[currentIndex]" alt="" />
    </div>
    <div>
      <el-button @click="prev">上一个</el-button>
      <el-button @click="next">下一个</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import img1 from './smk/2-29.png'
import img2 from './smk/3-69.png'
import img3 from './smk/4-88.png'
import img4 from './smk/5-60.png'
import img5 from './smk/6-162.png'
import img6 from './smk/7-916.png'
import img7 from './smk/8-56.png'
import img8 from './smk/9-628.png'
import img9 from './smk/10-602.png'
import img10 from './smk/11-268.png'
import img11 from './smk/12-985.png'
import img12 from './smk/13-6289.png'
import img13 from './smk/14-6098.png'
import img14 from './smk/15-2901.png'
import img15 from './smk/16-8609.png'
import img16 from './smk/17-三角形-圆.png'
import img17 from './smk/18-圆.png'
import img18 from './smk/19-牛.png'
import img19 from './smk/20-蜻蜓.png'
import img20 from './smk/21-鸭子.png'
import img21 from './smk/22-金鱼.png'
import img22 from './smk/23-燕子.png'
import img23 from './smk/24-羊.png'
import img24 from './smk/25-兔子.png'
import img25 from './smk/26-蝴蝶.png'
import img26 from './smk/27-圆-剪刀.png'
import img27 from './smk/28-899-022.png'
import img28 from './smk/29-621-989.png'
import img29 from './smk/30-522.png'
import img30 from './smk/31-825.png'
import img31 from './smk/32-5-8.png'
import img32 from './smk/33-0-9.png'
import img33 from './smk/34-三角形-正方形.png'
import img34 from './smk/35-86.png'
import img35 from './smk/36-茶壶.png'
const imgList = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
  img21,
  img22,
  img23,
  img24,
  img25,
  img26,
  img27,
  img28,
  img29,
  img30,
  img31,
  img32,
  img33,
  img34,
  img35,
]
const currentIndex = ref(0)
const res = (v) => {
  let a = v.lastIndexOf('/')
  let b = v.substring(a + 1)
  let c = b.lastIndexOf('.')
  let d = b.substring(0, c)
  let e = d.indexOf('-')
  let f = d.substring(e + 1)
  return f
}
function prev() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = imgList.length - 1
  }
}
function next() {
  if (currentIndex.value < imgList.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
}
</script>

<style lang="scss" scoped>
/* 这里是组件的样式 */
.box {
  width: 50%;
  height: 300px;
  overflow: hidden;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
