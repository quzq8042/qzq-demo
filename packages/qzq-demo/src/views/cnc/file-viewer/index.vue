<template>
  <div class="file-browser">
    <div class="browser-header">
      <div class="header-left">
        <div class="logo-icon">
          <el-icon><UploadFilled /></el-icon>
        </div>
        <span class="header-title">文件管理</span>
      </div>
      <div class="header-right">
        <span class="file-count">共 {{ fileCount }} 个文件</span>
      </div>
    </div>

    <div class="browser-content">
      <div class="file-tree-wrapper">
        <div class="tree-header">
          <div class="header-actions">
            <button class="action-btn active">
              <el-icon><List /></el-icon>
              <span>列表</span>
            </button>
          </div>
        </div>

        <div class="tree-content">
          <div v-if="loading" class="loading-state">
            <div class="loading-spinner"></div>
            <p>加载中...</p>
          </div>

          <div v-else-if="error" class="error-state">
            <div class="error-icon">
              <el-icon><CircleCloseFilled /></el-icon>
            </div>
            <p>{{ error }}</p>
            <button class="retry-btn" @click="loadFileTree">重新加载</button>
          </div>

          <template v-else>
            <div v-for="(item, index) in fileTreeData" :key="item.path" class="tree-item">
              <div class="custom-tree-node" @click="handleNodeClick(item)">
                <span class="node-number">{{ index + 1 }}</span>
                <span class="node-label">{{ item.name }}</span>
              </div>

              <div v-if="item.type === 'folder' && item.children?.length && expandedFolders.includes(item.path)" class="children-container">
                <div v-for="(child, childIndex) in item.children" :key="child.path" class="tree-child">
                  <div class="custom-tree-node child-node" @click="handleNodeClick(child)">
                    <span class="node-number">{{ index + 1 }}.{{ childIndex + 1 }}</span>
                    <span class="node-label">{{ child.name }}</span>
                    <button v-if="child.type === 'file'" class="download-action" @click.stop="downloadFile(child)">
                      <Download />
                    </button>
                  </div>

                  <div
                    v-if="child.type === 'folder' && child.children?.length && expandedFolders.includes(child.path)"
                    class="children-container nested"
                  >
                    <div v-for="(nested, nestedIndex) in child.children" :key="nested.path" class="tree-child">
                      <div class="custom-tree-node child-node" @click="handleNodeClick(nested)">
                        <span class="node-number">{{ index + 1 }}.{{ childIndex + 1 }}.{{ nestedIndex + 1 }}</span>
                        <span class="node-label">{{ nested.name }}</span>
                        <button class="download-action" @click.stop="downloadFile(nested)">
                          <Download />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="fileTreeData.length === 0" class="empty-state">
              <div class="empty-icon">
                <FolderOpen />
              </div>
              <p>暂无文件</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const fileTreeData = ref([])
const expandedFolders = ref([])
const loading = ref(true)
const error = ref(null)

const fileCount = computed(() => {
  let count = 0
  const countFiles = (items) => {
    items.forEach((item) => {
      if (item.type === 'file') count++
      if (item.children?.length) countFiles(item.children)
    })
  }
  countFiles(fileTreeData.value)
  return count
})

const collectFolders = (items) => {
  const folders = []
  items.forEach((item) => {
    if (item.type === 'folder' && item.children?.length) {
      folders.push(item.path)
      if (item.children) {
        folders.push(...collectFolders(item.children))
      }
    }
  })
  return folders
}

const loadFileTree = async () => {
  loading.value = true
  error.value = null
  try {
    const data = [
      {
        name: '模板',
        type: 'folder',
        path: '/模板',
        children: [
          { name: '出图模板.prt', type: 'file', path: '/模板/出图模板.prt', url: '/files/模板/出图模板.prt' },
          {
            name: 'model-plain-1-mm-template.prt',
            type: 'file',
            path: '/模板/model-plain-1-mm-template.prt',
            url: '/files/模板/model-plain-1-mm-template.prt',
          },
          { name: '角色.mtx', type: 'file', path: '/模板/角色.mtx', url: '/files/模板/角色.mtx' },
        ],
      },
      {
        name: '文档',
        type: 'folder',
        path: '/文档',
        children: [
          { name: '螺纹底孔对照表8.jpg', type: 'file', path: '/文档/螺纹底孔对照表8.jpg', url: '/files/文档/螺纹底孔对照表8.jpg' },
          {
            name: '6.UG NX12.0基础命令教程课件全套-超详细讲解.pdf',
            type: 'file',
            path: '/文档/6.UG NX12.0基础命令教程课件全套-超详细讲解.pdf',
            url: '/files/文档/6.UG NX12.0基础命令教程课件全套-超详细讲解.pdf',
          },
          {
            name: '3.顺逆铣运用及方向识别.pptx',
            type: 'file',
            path: '/文档/3.顺逆铣运用及方向识别.pptx',
            url: '/files/文档/3.顺逆铣运用及方向识别.pptx',
          },
          { name: '7.编程基本步骤.docx', type: 'file', path: '/文档/7.编程基本步骤.docx', url: '/files/文档/7.编程基本步骤.docx' },
          {
            name: '第20讲：制图模块常用参数.pptx',
            type: 'file',
            path: '/文档/第20讲：制图模块常用参数.pptx',
            url: '/files/文档/第20讲：制图模块常用参数.pptx',
          },
          {
            name: '1.机械制图入门学习.pptx',
            type: 'file',
            path: '/文档/1.机械制图入门学习.pptx',
            url: '/files/文档/1.机械制图入门学习.pptx',
          },
          { name: '机械识图2014版.doc', type: 'file', path: '/文档/机械识图2014版.doc', url: '/files/文档/机械识图2014版.doc' },
          {
            name: '公制挤牙丝锥-孔径参考表.png',
            type: 'file',
            path: '/文档/公制挤牙丝锥-孔径参考表.png',
            url: '/files/文档/公制挤牙丝锥-孔径参考表.png',
          },
          {
            name: '新版本的底壁铣涅盘而生.pptx',
            type: 'file',
            path: '/文档/新版本的底壁铣涅盘而生.pptx',
            url: '/files/文档/新版本的底壁铣涅盘而生.pptx',
          },
          {
            name: 'BSPT(PT)和NPT牙的区别.docx',
            type: 'file',
            path: '/文档/BSPT(PT)和NPT牙的区别.docx',
            url: '/files/文档/BSPT(PT)和NPT牙的区别.docx',
          },
          { name: '01.常用刀具认识.pdf', type: 'file', path: '/文档/01.常用刀具认识.pdf', url: '/files/文档/01.常用刀具认识.pdf' },
          { name: 'G M代码表.xls', type: 'file', path: '/文档/G M代码表.xls', url: '/files/文档/G M代码表.xls' },
          {
            name: '加工参数表-2025-6(1).xlsx',
            type: 'file',
            path: '/文档/加工参数表-2025-6(1).xlsx',
            url: '/files/文档/加工参数表-2025-6(1).xlsx',
          },
          { name: '挤压丝锥的底孔尺寸.pdf', type: 'file', path: '/文档/挤压丝锥的底孔尺寸.pdf', url: '/files/文档/挤压丝锥的底孔尺寸.pdf' },
          {
            name: 'CNC切削参数表-丝锥加工参数表.xls',
            type: 'file',
            path: '/文档/CNC切削参数表-丝锥加工参数表.xls',
            url: '/files/文档/CNC切削参数表-丝锥加工参数表.xls',
          },
          {
            name: '机加cnc数控设备切削参数表.xls',
            type: 'file',
            path: '/文档/机加cnc数控设备切削参数表.xls',
            url: '/files/文档/机加cnc数控设备切削参数表.xls',
          },
          {
            name: '顺铣与逆铣区别及运用场景.jpg',
            type: 'file',
            path: '/文档/顺铣与逆铣区别及运用场景.jpg',
            url: '/files/文档/顺铣与逆铣区别及运用场景.jpg',
          },
          {
            name: '4.UG12-软件安装没打不开没反映解决方法.pptx',
            type: 'file',
            path: '/文档/4.UG12-软件安装没打不开没反映解决方法.pptx',
            url: '/files/文档/4.UG12-软件安装没打不开没反映解决方法.pptx',
          },
          { name: '刀具基础知识.ppt', type: 'file', path: '/文档/刀具基础知识.ppt', url: '/files/文档/刀具基础知识.ppt' },
          {
            name: '2..MCS工件座标系设置要点.pptx',
            type: 'file',
            path: '/文档/2..MCS工件座标系设置要点.pptx',
            url: '/files/文档/2..MCS工件座标系设置要点.pptx',
          },
          {
            name: '第2讲：软件的入门-草图命令.pptx',
            type: 'file',
            path: '/文档/第2讲：软件的入门-草图命令.pptx',
            url: '/files/文档/第2讲：软件的入门-草图命令.pptx',
          },
          { name: 'G管螺纹的基本尺寸.jpg', type: 'file', path: '/文档/G管螺纹的基本尺寸.jpg', url: '/files/文档/G管螺纹的基本尺寸.jpg' },
          { name: '英制普通螺纹.jpg', type: 'file', path: '/文档/英制普通螺纹.jpg', url: '/files/文档/英制普通螺纹.jpg' },
          { name: 'ugnx12.0快捷键.xls', type: 'file', path: '/文档/ugnx12.0快捷键.xls', url: '/files/文档/ugnx12.0快捷键.xls' },
          { name: '软件自动编程流程.pptx', type: 'file', path: '/文档/软件自动编程流程.pptx', url: '/files/文档/软件自动编程流程.pptx' },
          { name: '7.数控刀具介绍.ppt', type: 'file', path: '/文档/7.数控刀具介绍.ppt', url: '/files/文档/7.数控刀具介绍.ppt' },
          { name: 'U钻进给参数.xlsx', type: 'file', path: '/文档/U钻进给参数.xlsx', url: '/files/文档/U钻进给参数.xlsx' },
          { name: '镗刀铰刀转数进给.jpg', type: 'file', path: '/文档/镗刀铰刀转数进给.jpg', url: '/files/文档/镗刀铰刀转数进给.jpg' },
          {
            name: 'CNC加工热处理工件-高硬度工件-刀具进给参数表.xls',
            type: 'file',
            path: '/文档/CNC加工热处理工件-高硬度工件-刀具进给参数表.xls',
            url: '/files/文档/CNC加工热处理工件-高硬度工件-刀具进给参数表.xls',
          },
          { name: '沉头孔对照表.PNG', type: 'file', path: '/文档/沉头孔对照表.PNG', url: '/files/文档/沉头孔对照表.PNG' },
          { name: '数控机床简介.doc', type: 'file', path: '/文档/数控机床简介.doc', url: '/files/文档/数控机床简介.doc' },
          {
            name: '基准平面创建与使用方法-2.jpg',
            type: 'file',
            path: '/文档/基准平面创建与使用方法-2.jpg',
            url: '/files/文档/基准平面创建与使用方法-2.jpg',
          },
          {
            name: '基准平面创建与使用方法-1.jpg',
            type: 'file',
            path: '/文档/基准平面创建与使用方法-1.jpg',
            url: '/files/文档/基准平面创建与使用方法-1.jpg',
          },
          {
            name: '刀具切削参数 (version 1).xls',
            type: 'file',
            path: '/文档/刀具切削参数 (version 1).xls',
            url: '/files/文档/刀具切削参数 (version 1).xls',
          },
          { name: 'CNC刀库表等.xls', type: 'file', path: '/文档/CNC刀库表等.xls', url: '/files/文档/CNC刀库表等.xls' },
          { name: '5.国标公差及符号.pptx', type: 'file', path: '/文档/5.国标公差及符号.pptx', url: '/files/文档/5.国标公差及符号.pptx' },
          {
            name: '最全机械制图基础知识.pdf',
            type: 'file',
            path: '/文档/最全机械制图基础知识.pdf',
            url: '/files/文档/最全机械制图基础知识.pdf',
          },
          { name: '顺逆铣对比视图.png', type: 'file', path: '/文档/顺逆铣对比视图.png', url: '/files/文档/顺逆铣对比视图.png' },
          {
            name: '2.工厂常用形位公差及符号.ppt',
            type: 'file',
            path: '/文档/2.工厂常用形位公差及符号.ppt',
            url: '/files/文档/2.工厂常用形位公差及符号.ppt',
          },
          {
            name: '工厂常用形位公差及符号.ppt',
            type: 'file',
            path: '/文档/工厂常用形位公差及符号.ppt',
            url: '/files/文档/工厂常用形位公差及符号.ppt',
          },
          { name: '界面认识.png', type: 'file', path: '/文档/界面认识.png', url: '/files/文档/界面认识.png' },
          {
            name: 'CNC各种材料选用刀具与转速参数表.xls',
            type: 'file',
            path: '/文档/CNC各种材料选用刀具与转速参数表.xls',
            url: '/files/文档/CNC各种材料选用刀具与转速参数表.xls',
          },
          {
            name: '飞平面刀路的优化与注意点.pptx',
            type: 'file',
            path: '/文档/飞平面刀路的优化与注意点.pptx',
            url: '/files/文档/飞平面刀路的优化与注意点.pptx',
          },
          {
            name: '5.解决及优化NX若干问题集合.pptx',
            type: 'file',
            path: '/文档/5.解决及优化NX若干问题集合.pptx',
            url: '/files/文档/5.解决及优化NX若干问题集合.pptx',
          },
          { name: '7.形位公差及检测.ppt', type: 'file', path: '/文档/7.形位公差及检测.ppt', url: '/files/文档/7.形位公差及检测.ppt' },
          { name: '6.形位公差代号.pdf', type: 'file', path: '/文档/6.形位公差代号.pdf', url: '/files/文档/6.形位公差代号.pdf' },
          {
            name: '6.加工中心常用刀具一览.pptx',
            type: 'file',
            path: '/文档/6.加工中心常用刀具一览.pptx',
            url: '/files/文档/6.加工中心常用刀具一览.pptx',
          },
          {
            name: '三种不同缩放体的使用技巧.pptx',
            type: 'file',
            path: '/文档/三种不同缩放体的使用技巧.pptx',
            url: '/files/文档/三种不同缩放体的使用技巧.pptx',
          },
          { name: '切削及铣削计算公式.pdf', type: 'file', path: '/文档/切削及铣削计算公式.pdf', url: '/files/文档/切削及铣削计算公式.pdf' },
          { name: '第3讲：草图绘制-1.pptx', type: 'file', path: '/文档/第3讲：草图绘制-1.pptx', url: '/files/文档/第3讲：草图绘制-1.pptx' },
          {
            name: '1-02.CNC加工刀具认识.ppt',
            type: 'file',
            path: '/文档/1-02.CNC加工刀具认识.ppt',
            url: '/files/文档/1-02.CNC加工刀具认识.ppt',
          },
          {
            name: '1-03.CNC加工材料认识.ppt',
            type: 'file',
            path: '/文档/1-03.CNC加工材料认识.ppt',
            url: '/files/文档/1-03.CNC加工材料认识.ppt',
          },
          { name: '世界座标角度认识.png', type: 'file', path: '/文档/世界座标角度认识.png', url: '/files/文档/世界座标角度认识.png' },
          {
            name: '5.CNC机床设备与加工刀具介绍.pptx',
            type: 'file',
            path: '/文档/5.CNC机床设备与加工刀具介绍.pptx',
            url: '/files/文档/5.CNC机床设备与加工刀具介绍.pptx',
          },
          { name: '3.形位公差及符号.pptx', type: 'file', path: '/文档/3.形位公差及符号.pptx', url: '/files/文档/3.形位公差及符号.pptx' },
          { name: '常用几何约束及符号.png', type: 'file', path: '/文档/常用几何约束及符号.png', url: '/files/文档/常用几何约束及符号.png' },
          { name: 'ug快捷键.doc', type: 'file', path: '/文档/ug快捷键.doc', url: '/files/文档/ug快捷键.doc' },
          {
            name: '螺丝攻牙钻孔径对照表.xls',
            type: 'file',
            path: '/文档/螺丝攻牙钻孔径对照表.xls',
            url: '/files/文档/螺丝攻牙钻孔径对照表.xls',
          },
          {
            name: 'UG平面铣和面铣的区别平面铣和型腔铣的区别.doc',
            type: 'file',
            path: '/文档/UG平面铣和面铣的区别平面铣和型腔铣的区别.doc',
            url: '/files/文档/UG平面铣和面铣的区别平面铣和型腔铣的区别.doc',
          },
          { name: '建模技巧.doc', type: 'file', path: '/文档/建模技巧.doc', url: '/files/文档/建模技巧.doc' },
          {
            name: 'UG学习必备草图快捷键.doc',
            type: 'file',
            path: '/文档/UG学习必备草图快捷键.doc',
            url: '/files/文档/UG学习必备草图快捷键.doc',
          },
          { name: '4-刀具参数.doc', type: 'file', path: '/文档/4-刀具参数.doc', url: '/files/文档/4-刀具参数.doc' },
          { name: '4.常用量具.pptx', type: 'file', path: '/文档/4.常用量具.pptx', url: '/files/文档/4.常用量具.pptx' },
          { name: '4.粗糙度.pptx', type: 'file', path: '/文档/4.粗糙度.pptx', url: '/files/文档/4.粗糙度.pptx' },
          { name: '粗糙度.pptx', type: 'file', path: '/文档/粗糙度.pptx', url: '/files/文档/粗糙度.pptx' },
          { name: '产品公差.pptx', type: 'file', path: '/文档/产品公差.pptx', url: '/files/文档/产品公差.pptx' },
          { name: '尺寸标注方法.ppt', type: 'file', path: '/文档/尺寸标注方法.ppt', url: '/files/文档/尺寸标注方法.ppt' },
          { name: '机械制图培训资料.ppt', type: 'file', path: '/文档/机械制图培训资料.ppt', url: '/files/文档/机械制图培训资料.ppt' },
          { name: '三视图视图教程.ppt', type: 'file', path: '/文档/三视图视图教程.ppt', url: '/files/文档/三视图视图教程.ppt' },
        ],
      },
    ]
    fileTreeData.value = data
    expandedFolders.value = collectFolders(data)
  } catch (err) {
    error.value = err.message
    console.error('加载文件树失败:', err)
  } finally {
    loading.value = false
  }
}

const handleNodeClick = (item) => {
  if (item.type === 'folder') {
    toggleExpand(item)
  } else if (item.type === 'file') {
    downloadFile(item)
  }
}

const toggleExpand = (item) => {
  const index = expandedFolders.value.indexOf(item.path)
  if (index > -1) {
    expandedFolders.value.splice(index, 1)
  } else {
    expandedFolders.value.push(item.path)
  }
}

const downloadFile = (file) => {
  const link = document.createElement('a')
  link.href = file.url
  link.download = file.name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

onMounted(() => {
  loadFileTree()
})
</script>

<style lang="scss" scoped>
.file-browser {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--header-height) - 52px);
  background: #f8fafc;
}

.browser-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.file-count {
  font-size: 13px;
  color: #64748b;
  background: #f1f5f9;
  padding: 6px 14px;
  border-radius: 20px;
}

.browser-content {
  flex: 1;
  padding: 24px;
  overflow: auto;
}

.file-tree-wrapper {
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.tree-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
  background: #fafbfc;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  color: #64748b;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #334155;
  }

  &.active {
    background: #e0e7ff;
    color: #4f46e5;
  }

  svg {
    width: 16px;
    height: 16px;
  }
}

.tree-content {
  padding: 8px 0;
}

.tree-item {
  border-bottom: 1px solid #f1f5f9;
  overflow-y: auto;

  &:last-child {
    border-bottom: none;
  }
}

.custom-tree-node {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
  }

  &.child-node {
    padding-left: 48px;
  }
}

.expand-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #64748b;
  }

  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;

    &.rotated {
      transform: rotate(90deg);
    }
  }
}

.expand-placeholder {
  width: 24px;
  height: 24px;
}

.node-number {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  margin-right: 10px;
  flex-shrink: 0;

  .custom-tree-node:hover & {
    background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  }
}

.node-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-right: 12px;
  transition: all 0.2s ease;

  svg {
    width: 18px;
    height: 18px;
  }

  .custom-tree-node:hover & {
    transform: scale(1.05);
  }
}

.custom-tree-node:has(.expand-icon:hover) .node-icon,
.custom-tree-node:hover .node-icon {
  transform: scale(1.05);
}

.node-icon.file-initial {
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
}

.tree-item:first-child .node-icon {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);

  svg {
    color: #d97706;
  }
}

.tree-item:nth-child(2) .node-icon {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);

  svg {
    color: #2563eb;
  }
}

.tree-item:nth-child(3) .node-icon {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);

  svg {
    color: #059669;
  }
}

.tree-item:nth-child(4) .node-icon {
  background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);

  svg {
    color: #db2777;
  }
}

.tree-item:nth-child(5) .node-icon {
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);

  svg {
    color: #4f46e5;
  }
}

.child-node .node-icon {
  background: #f1f5f9 !important;

  svg {
    color: #64748b !important;
  }
}

.node-label {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #334155;
}

.download-action {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: #f1f5f9;
  border-radius: 10px;
  cursor: pointer;
  opacity: 0;
  transform: translateX(8px);
  transition: all 0.2s ease;

  svg {
    width: 16px;
    height: 16px;
    color: #64748b;
  }

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

    svg {
      color: #fff;
    }
  }
}

.custom-tree-node:hover .download-action {
  opacity: 1;
  transform: translateX(0);
}

.children-container {
  background: #fafbfc;
  border-left: 2px solid #e2e8f0;

  &.nested {
    background: #f1f5f9;
    border-left-color: #cbd5e1;
  }
}

.tree-child {
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
}

.empty-icon {
  width: 80px;
  height: 80px;
  background: #f1f5f9;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 32px;
  margin-bottom: 16px;
}

.empty-state p {
  font-size: 14px;
  color: #94a3b8;
}

.loading-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-state p {
  font-size: 14px;
  color: #94a3b8;
}

.error-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 20px;
}

.error-icon {
  width: 80px;
  height: 80px;
  background: #fef2f2;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ef4444;
  font-size: 32px;
  margin-bottom: 16px;
}

.error-state p {
  font-size: 14px;
  color: #ef4444;
  margin-bottom: 16px;
}

.retry-btn {
  padding: 10px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
}
</style>
