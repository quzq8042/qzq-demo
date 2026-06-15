<template>
  <div class="fill">
    <div class="hello">
      <input type="file" @change="getJSONdata" />
      <br />
      <br />
      <div>上传Excel文件转为JSON数据（<span style="color: red; font-weight: bold">第一行为JSON属性</span>,后续行为属性值）：</div>
      <br />
      <el-input v-model="JSONData" style="width: 1000px" :rows="20" type="textarea" />
    </div>
  </div>
</template>

<script setup>
import { read, utils } from 'xlsx'
import { ref } from 'vue'
const JSONData = ref([])
const getJSONdata = (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.readAsBinaryString(file)
  reader.onload = function (e) {
    const data = e.target.result
    const zzexcel = read(data, {
      type: 'binary',
    })
    //   console.log("zzexcel", zzexcel);
    const result = []
    for (let i = 0; i < zzexcel.SheetNames.length; i++) {
      const newData = utils.sheet_to_json(zzexcel.Sheets[zzexcel.SheetNames[i]])
      result.push(...newData)
    }
    JSONData.value = JSON.stringify(result)
    // console.log('result', JSON.stringify(result))
  }
}
</script>
<style scoped lang="scss">
.fill {
  padding: 20px;
}
</style>
