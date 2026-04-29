import { createWebHistory, createRouter, createWebHashHistory } from 'vue-router'

import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
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
    redirect: '/index',
    component: Layout,
    children: [
      {
        path: '/index',
        component: () => import('@/views/home/index'),
        name: 'Home',
        meta: { title: '个人简历', icon: 'dashboard', affix: true },
      },
      {
        path: '/portfolio',
        component: () => import('@/views/portfolio/index'),
        name: 'Portfolio',
        redirect: '/portfolio/structure-chart',
        meta: { title: '作品集', icon: 'dashboard', affix: true },
        children: [
          {
            path: '/portfolio/structure-chart',
            component: () => import('@/views/portfolio/components/structure-chart/index'),
            name: 'StructureChart',
            meta: { title: '股权穿透图', icon: 'dashboard' },
          },
          {
            path: '/portfolio/steps',
            component: () => import('@/views/portfolio/components/steps/index'),
            name: 'Steps',
            meta: { title: '步骤条', icon: 'dashboard' },
          },
          {
            path: '/portfolio/drag',
            component: () => import('@/views/portfolio/components/drag/index'),
            name: 'Drag',
            meta: { title: '简单拖拽', icon: 'dashboard' },
          },
          {
            path: '/portfolio/drag-kcb',
            component: () => import('@/views/portfolio/components/drag-kcb/index'),
            name: 'DragKcb',
            meta: { title: '拖拽-课程表', icon: 'dashboard' },
          },
          {
            path: '/portfolio/file-files',
            component: () => import('@/views/portfolio/components/files/index'),
            name: 'Files',
            meta: { title: 'Excel文件-JSON', icon: 'dashboard' },
          },
          {
            path: '/portfolio/websocket1',
            component: () => import('@/views/portfolio/components/websocket1/index'),
            name: 'WebSocket1',
            meta: { title: 'WebSocket1', icon: 'dashboard' },
          },
          {
            path: '/portfolio/websocket2',
            component: () => import('@/views/portfolio/components/websocket2/index'),
            name: 'WebSocket2',
            meta: { title: 'WebSocket2', icon: 'dashboard' },
          },
          {
            path: '/portfolio/websocket3',
            component: () => import('@/views/portfolio/components/websocket3/index'),
            name: 'WebSocket3',
            meta: { title: 'WebSocket3', icon: 'dashboard' },
          },
          {
            path: '/portfolio/file-viewer',
            component: () => import('@/views/portfolio/components/file-viewer/index'),
            name: 'FileViewer',
            meta: { title: '文件查看器', icon: 'dashboard' },
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
  history: createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

export default router
