<template>
  <div>
    <div class="ball">
      <div class="red">
        <div>红球区</div>
        <ul>
          <li v-for="item in redBall" :key="item">{{ item }}</li>
        </ul>
      </div>
      <div class="blue">
        <div>蓝球区</div>
        <ul>
          <li v-for="item in blueBall" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
    <el-button @click="start">开始机选</el-button>
    <el-button @click="reset">重新开始</el-button>
    <div class="ball">
      <div class="red">
        <div>红球</div>
        <ul>
          <li v-for="item in redBallsSelected" :key="item" class="redball">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="blue">
        <div>蓝球</div>
        <ul>
          <li v-if="blueBallSelected" class="blueball">
            {{ blueBallSelected }}
          </li>
        </ul>
      </div>
    </div>
    <div class="history">记录</div>
    <div v-for="item in historyList" :key="item" class="ball">
      <ul>
        <li v-for="r in item.red" :key="r" class="redball">
          {{ r }}
        </li>
      </ul>
      <ul>
        <li v-if="item.blue" class="blueball">
          {{ item.blue }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const redBall = ref([
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
])
const blueBall = ref(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16'])
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
const redBallsSelected = ref([])
const blueBallSelected = ref('')
const historyList = ref([])
const start = () => {
  redBallsSelected.value = shuffleArray([...redBall.value]).slice(0, 6)
  blueBallSelected.value = shuffleArray([...blueBall.value])[0]
  historyList.value.push({
    red: redBallsSelected.value,
    blue: blueBallSelected.value,
  })
}
const reset = () => {
  redBallsSelected.value = []
  blueBallSelected.value = ''
  historyList.value = []
}
</script>

<style lang="scss" scoped>
/* 这里是组件的样式 */
.ball {
  display: flex;
  gap: 20px;
  .red {
    width: 500px;
    > div {
      font-size: 18px;
      font-weight: bold;
      color: #ff0000;
    }
  }
  .blue {
    width: 500px;
    > div {
      font-size: 18px;
      font-weight: bold;
      color: #0000ff;
    }
  }
}
.el-button {
  width: 200px;
  height: 50px;
  margin-left: 200px;
  background: green;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  margin-top: 50px;
  margin-bottom: 50px;
  &:nth-of-type(2) {
    background: red;
  }
}
li {
  display: inline-block;
  margin: 8px 5px;
  width: 30px;
  height: 30px;
  font: bold 18px/30px arial;
  border: 1px #ddd solid;
  color: #444;
  border-radius: 31px;
  text-align: center;
  background-image: -webkit-radial-gradient(circle at top, rgb(247, 247, 247), rgb(222, 222, 222));
  background-image: radial-gradient(circle at top, rgb(247, 247, 247), rgb(222, 222, 222));
}

.redball {
  color: #fff;
  background-image: -webkit-radial-gradient(circle at top, rgb(255, 51, 51), rgb(255, 0, 0));
  background-image: radial-gradient(circle at top, rgb(255, 51, 51), rgb(255, 0, 0));
}
.blueball {
  color: #fff;
  background-image: -webkit-radial-gradient(circle at top, rgb(0, 85, 204), rgb(0, 0, 225));
  background-image: radial-gradient(circle at top, rgb(0, 85, 204), rgb(0, 0, 225));
}
.history {
  font-weight: bold;
  font-size: 20px;
  margin-top: 50px;
  color: #444;
}
</style>
