import { createWebHistory, createRouter, createWebHashHistory } from 'vue-router'
import { nextTick } from 'vue'

import Layout from '@/layout'
import ViewLayout from '@/views/layout/index.vue'

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再顶部导航栏出现 如401，login等页面，或者如一些编辑页面/edit/1

 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/cnc-intro/index'),
    name: 'CncIntro',
    meta: { title: 'CNC介绍', icon: 'dashboard', affix: true },
    hidden: true,
  },
  {
    path: '/subroutine',
    redirect: '/cnc',
    component: Layout,
    children: [
      {
        path: '/index',
        component: () => import('@/views/home/index'),
        name: 'Home',
        meta: { title: '个人简历', icon: 'dashboard', affix: true, requireQz: true },
      },
      {
        path: '/cnc',
        component: ViewLayout,
        name: 'cnc',
        redirect: '/cnc/cad-shortcut-key',
        meta: { title: 'CNC数控', icon: 'dashboard', affix: true },
        children: [
          {
            path: '/cnc/cutting-params',
            component: () => import('@/views/cnc/cutting-params/index'),
            name: 'CuttingParams',
            meta: {
              title: '切削参数',
              icon: 'Cpu',
              description: '提供常见材料切削参数、刀具选择指南、主轴转速及进给量参考，适用于UG加工模块',
              requireQz: true,
              tags: ['CNC', '加工', '参数', '参考'],
            },
          },
          {
            path: '/cnc/ug-machining-strategy',
            component: () => import('@/views/cnc/ug-machining-strategy/index'),
            name: 'UgMachiningStrategy',
            meta: {
              title: 'UG加工',
              icon: 'Tools',
              description: 'UG加工模块的加工类型参考，包括平面铣削、带边界面铣、平面铣等多种类型的加工策略，提供详细参数配置与工艺说明',
              requireQz: true,
              tags: ['UG', '加工', '参数', '参考'],
            },
          },
          {
            path: '/cnc/ug-machining-strategy/detail/:category/:feature',
            component: () => import('@/views/cnc/ug-machining-strategy/detail/index'),
            name: 'UgMachiningStrategyDetail',
            meta: { title: '加工策略详情', icon: 'Tools', description: 'UG 加工策略详细参数配置与工艺说明', requireQz: true },
            hidden: true,
          },
          {
            path: '/cnc/calculator',
            component: () => import('@/views/cnc/calculator/index'),
            name: 'Calculator',
            meta: {
              title: '计算工具',
              icon: 'Operation',
              description: '提供 CNC 材料重量、工时报价、球刀加工步距等实用计算工具',
              requireQz: true,
              tags: ['计算', '工具'],
            },
          },
          {
            path: '/cnc/process-card',
            component: () => import('@/views/cnc/process-card/index'),
            name: 'ProcessCard',
            meta: {
              title: '工艺卡模板',
              icon: 'DocumentCopy',
              description: '典型零件（轴、盘、箱体、齿轮）完整加工工艺卡片，涵盖下料→粗加工→精加工→检验全流程',
              requireQz: true,
              tags: ['工艺卡', '加工流程', '工序', '工时'],
            },
          },
          {
            path: '/cnc/cnc-code',
            component: () => import('@/views/cnc/cnc-code/index'),
            name: 'CncCode',
            meta: {
              title: 'CNC代码',
              icon: 'Document',
              description: '常用 G 代码、M 代码对照表，操作面板说明、刀具参数、螺丝攻牙钻孔对照等',
              tags: ['G代码', 'M代码', '刀具', '螺丝攻牙钻孔对照'],
            },
          },
          {
            path: '/cnc/cnc-log',
            component: () => import('@/views/cnc/cnc-log/index'),
            name: 'CncLog',
            meta: {
              title: '代码示例',
              icon: 'Tickets',
              description: '收集整理的 CNC 常用 G 代码、M 代码、程序示例，支持快速搜索定位',
              tags: ['记录', '管理', '代码'],
            },
          },
          {
            path: '/cnc/special-tool-creation',
            component: () => import('@/views/cnc/special-tool-creation/index'),
            name: 'SpecialToolCreation',
            meta: {
              title: '特殊刀具',
              icon: 'MagicStick',
              description: '内R刀、T型刀、燕尾刀、螺纹刀 四类特殊刀具的创建模板与参数说明',
              requireQz: true,
              tags: ['特殊刀具', '创建模板', '内R刀', 'T型刀', '燕尾刀', '螺纹刀'],
            },
          },
          {
            path: '/cnc/ug-shortcut-key',
            component: () => import('@/views/cnc/ug-shortcut-key/index'),
            name: 'UGShortcutKey',
            meta: {
              title: 'UG快捷键',
              icon: 'EditPen',
              description: 'UG 常用快捷命令速查，支持搜索、导出 Markdown 和 Excel',
              requireQz: true,
              tags: ['UG快捷键', 'UG加工', 'UG命令'],
            },
          },
          {
            path: '/cnc/cad-shortcut-key',
            component: () => import('@/views/cnc/cad-shortcut-key/index'),
            name: 'CadShortcutKey',
            meta: {
              title: 'CAD快捷键',
              icon: 'EditPen',
              description: 'CAD 绘图常用快捷命令速查，支持搜索、导出 Markdown 和 Excel',
              tags: ['CAD快捷键', 'CAD绘图', 'CAD命令'],
            },
          },
          {
            path: '/cnc/tolerance-chart',
            component: () => import('@/views/cnc/tolerance-chart/index'),
            name: 'ToleranceChart',
            meta: {
              title: '公差配合',
              icon: 'Tickets',
              description: 'ISO/GB 公差等级表、孔轴配合选择、公差带示意图、表面粗糙度参考表及符号标注说明',
              requireQz: true,
              tags: ['公差', '配合', '粗糙度', '机械制图'],
            },
          },
          {
            path: '/cnc/faq',
            component: () => import('@/views/cnc/faq/index'),
            name: 'Faq',
            meta: {
              title: '常见问题',
              icon: 'QuestionFilled',
              description: '涵盖入门、草图、建模、加工全流程的常见问题与解答，助您快速掌握 CNC 加工技能',
              requireQz: true,
              tags: ['入门', '草图', '建模', '加工'],
            },
          },
          {
            path: '/cnc/post-processor-guide',
            component: () => import('@/views/cnc/post-processor-guide/index'),
            name: 'PostProcessorGuide',
            meta: {
              title: '后处理指南',
              icon: 'Setting',
              description: '主流 CNC 控制器（FANUC/Siemens/Heidenhain/华中/KND/Haas）代码差异对比、后处理器选择与使用技巧',
              requireQz: true,
              tags: ['后处理', '控制器', 'G代码', 'FANUC', 'Siemens'],
            },
          },
          {
            path: '/cnc/cnc-safety',
            component: () => import('@/views/cnc/cnc-safety/index'),
            name: 'CncSafety',
            meta: {
              title: '数控安全',
              icon: 'Warning',
              description: 'CNC 机床开关机流程、安全操作规程、应急处理指南，确保车间安全生产',
              requireQz: true,
              tags: ['安全', '操作规范', '开关机', '应急'],
            },
          },
          {
            path: '/cnc/material-properties',
            component: () => import('@/views/cnc/material-properties/index'),
            name: 'MaterialProperties',
            meta: {
              title: '材料属性',
              icon: 'Brick',
              description: '常用金属材料（碳钢、合金钢、铸铁、铝合金等）的力学性能、物理属性、加工性查询',
              requireQz: true,
              tags: ['材料', '力学性能', '物理属性', '加工性'],
            },
          },
        ],
      },
      {
        path: '/front-end',
        component: ViewLayout,
        name: 'front-end',
        redirect: '/front-end/style-effect',
        meta: { title: '前端', icon: 'dashboard', affix: true, requireQz: true },
        children: [
          {
            path: '/front-end/style-effect',
            component: () => import('@/views/front-end/style-effect/index'),
            name: 'StyleEffect',
            meta: { title: '样式特效', icon: 'dashboard' },
          },
          {
            path: '/front-end/structure-chart',
            component: () => import('@/views/front-end/structure-chart/index'),
            name: 'StructureChart',
            meta: { title: '股权穿透图', icon: 'dashboard' },
          },
          {
            path: '/front-end/steps',
            component: () => import('@/views/front-end/steps/index'),
            name: 'Steps',
            meta: { title: '步骤条', icon: 'dashboard' },
          },
          {
            path: '/front-end/drag',
            component: () => import('@/views/front-end/drag/index'),
            name: 'Drag',
            meta: { title: '简单拖拽', icon: 'dashboard' },
          },
          {
            path: '/front-end/drag-kcb',
            component: () => import('@/views/front-end/drag-kcb/index'),
            name: 'DragKcb',
            meta: { title: '拖拽-课程表', icon: 'dashboard' },
          },
          {
            path: '/front-end/file-files',
            component: () => import('@/views/front-end/files/index'),
            name: 'Files',
            meta: { title: 'Excel文件-JSON', icon: 'dashboard' },
          },
          {
            path: '/front-end/websocket1',
            component: () => import('@/views/front-end/websocket1/index'),
            name: 'WebSocket1',
            meta: { title: 'WebSocket1', icon: 'dashboard' },
          },
          {
            path: '/front-end/websocket2',
            component: () => import('@/views/front-end/websocket2/index'),
            name: 'WebSocket2',
            meta: { title: 'WebSocket2', icon: 'dashboard' },
          },
          {
            path: '/front-end/websocket3',
            component: () => import('@/views/front-end/websocket3/index'),
            name: 'WebSocket3',
            meta: { title: 'WebSocket3', icon: 'dashboard' },
          },
          {
            path: '/front-end/file-viewer',
            component: () => import('@/views/front-end/file-viewer/index'),
            name: 'FileViewer',
            meta: { title: '文件查看器', icon: 'dashboard' },
          },
          {
            path: '/front-end/echarts',
            component: () => import('@/views/front-end/echarts/index'),
            name: 'Echarts',
            meta: { title: 'Echarts案例', icon: 'dashboard' },
          },
          {
            path: '/front-end/map',
            component: () => import('@/views/front-end/map/index'),
            name: 'Map',
            meta: { title: '地图', icon: 'dashboard' },
          },
          {
            path: '/front-end/other',
            component: () => import('@/views/front-end/other/index'),
            name: 'Other',
            meta: { title: '其他', icon: 'dashboard' },
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    name: 'Login',
    meta: { title: '登录', icon: 'login', affix: true },
    hidden: true,
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true,
  },
]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = []

const router = createRouter({
  // history: createWebHistory(),
  history: import.meta.env.VITE_APP_ENV === 'production' ? createWebHashHistory() : createWebHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return new Promise((resolve) => {
      nextTick(() => {
        const appMain = document.getElementById('app-main')
        if (appMain) {
          appMain.scrollTop = 0
        }
        resolve({ top: 0 })
      })
    })
  },
})

export default router
