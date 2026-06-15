<template>
  <div class="container">
    <div class="box">
      <div class="box1">
        <div v-for="item in list" :key="item.id" class="items" draggable="true" @dragstart="dragStart($event, item)">
          {{ item.name }}
        </div>
      </div>
      <div ref="box2" class="box2" @dragover.prevent @drop="dropEnd($event)">
        <div v-for="(item, index) in list2" :key="item.id" class="items right">
          <div v-if="list2.length > 1" class="delete" @click="delItem(index)">
            <el-icon>
              <CircleCloseFilled />
            </el-icon>
          </div>
          <span>{{ item.name }}</span>
        </div>
      </div>
      <div class="box3">
        <el-button type="primary" @click="resetting">重置</el-button>
        <p>result：{{ list2 }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sortablejs from 'sortablejs'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
const list = [
  { id: 1, name: '手机' },
  { id: 2, name: '电脑' },
  { id: 3, name: '耳机' },
]
const list2 = ref([])
const box2 = ref(null)
//左边拖拽事件
const dragStart = (e, device) => {
  e.dataTransfer.setData('id', device.id)
  e.dataTransfer.setData('name', device.name)
}
//拖拽至右边事件
const dropEnd = (e) => {
  const id = e.dataTransfer.getData('id')
  const name = e.dataTransfer.getData('name')
  if (id) {
    let obj = {
      id,
      name,
    }
    const index = list2.value.findIndex((item) => item.id === obj.id)
    if (index === -1) {
      list2.value.push(obj)
    } else {
      ElMessage.error('当前数据已存在,请勿重复添加')
      return
    }
  }
}

onMounted(() => {
  Sortablejs.create(box2.value, {
    animation: 150,
    ghostClass: 'blue-background-class',
    // 右边上下拖拽数据处理
    onEnd: ({ newIndex, oldIndex }) => {
      const dragItem = list2.value[oldIndex]
      list2.value.splice(oldIndex, 1)
      list2.value.splice(newIndex, 0, dragItem)
    },
  })
})
//右边单项删除事件
const delItem = (index) => {
  list2.value.splice(index, 1)
}
//将右边数据重置
const resetting = () => {
  list2.value = []
}
</script>

<style lang="scss" scoped>
/* 这里是组件的样式 */
.container {
  padding: 20px;
}
.box {
  display: flex;
  margin-bottom: 10px;
}

.box1,
.box2 {
  width: 300px;
  height: 600px;
  border: 1px solid #ccc;
  overflow-y: auto;
}

.box2 {
  margin-left: 50px;
}

.box3 {
  padding: 10px;
  margin-left: 50px;
  border: 1px solid #ccc;
  width: 300px;
  .el-button {
    margin-bottom: 10px;
  }
}
.items {
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: skyblue;
  margin-top: 10px;
  margin-left: 10px;
}

.right {
  position: relative;
}

.delete {
  color: red;
  position: absolute;
  top: -10px;
  right: -10px;
}
</style>
