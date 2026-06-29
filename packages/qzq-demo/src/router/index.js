import { createWebHistory, createRouter, createWebHashHistory } from 'vue-router'

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
            path: '/cnc/cad-shortcut-key',
            component: () => import('@/views/cnc/cad-shortcut-key/index'),
            name: 'CadShortcutKey',
            meta: { title: 'CAD快捷键', icon: 'dashboard' },
          },
          {
            path: '/cnc/ug-shortcut-key',
            component: () => import('@/views/cnc/ug-shortcut-key/index'),
            name: 'UGShortcutKey',
            meta: { title: 'UG 快捷键', icon: 'dashboard', requireQz: true },
          },
          {
            path: '/cnc/cnc-code',
            component: () => import('@/views/cnc/cnc-code/index'),
            name: 'CncCode',
            meta: { title: 'CNC 代码库', icon: 'dashboard' },
          },
          {
            path: '/cnc/cnc-log',
            component: () => import('@/views/cnc/cnc-log/index'),
            name: 'CncLog',
            meta: { title: '代码记录', icon: 'dashboard' },
          },
          {
            path: '/cnc/calculator',
            component: () => import('@/views/cnc/calculator/index'),
            name: 'Calculator',
            meta: { title: '计算器', icon: 'dashboard', requireQz: true },
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
    return { top: 0 }
  },
})

export default router
