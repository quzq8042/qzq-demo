import { createApp } from 'vue'

import Cookies from 'js-cookie'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'

import '@/assets/styles/index.scss' // global css

import BaiduMap from 'vue-baidu-map-3x'
import axios from 'axios'

import App from './App'
import store from './store'
import router from './router'
import directive from './directive' // directive

// 注册指令
import plugins from './plugins' // plugins
import { download } from '@/utils/request'

// svg图标
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon'
import elementIcons from '@/components/SvgIcon/svgicon'

import './permission' // permission control

import { useDict } from '@/utils/dict'
import { parseTime, resetForm, addDateRange, handleTree, selectDictLabel, selectDictLabels } from '@/utils/ruoyi'

const app = createApp(App)

// 全局方法挂载
app.config.globalProperties.useDict = useDict
app.config.globalProperties.download = download
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.resetForm = resetForm
app.config.globalProperties.handleTree = handleTree
app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.selectDictLabel = selectDictLabel
app.config.globalProperties.selectDictLabels = selectDictLabels

app.use(router)
app.use(store)
app.use(plugins)
app.use(elementIcons)
app.component('SvgIcon', SvgIcon)

app.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '52UijIgvDR7OZzS5H3I7S8jBSYNelrgQ',
  // v:'2.0',  // 默认使用3.0
  // type: 'WebGL' // ||API 默认API  (使用此模式 BMap=BMapGL)
})
app.config.globalProperties.$axios = axios
directive(app)

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
  locale: locale,
  // 支持 large、default、small
  size: Cookies.get('size') || 'default',
})

app.mount('#app')
