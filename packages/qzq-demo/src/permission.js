import router from './router/index.js'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { hasAccessToRoute, getCurrentUser, isUserExpired } from '@/config/userConfig'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/']
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const user = getCurrentUser()
      if (!user || isUserExpired(user)) {
        ElMessage.warning(!user ? '登录状态已失效，请重新登录' : '账号已过期，请联系管理员')
        next(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
        NProgress.done()
        return
      }
      if (!hasAccessToRoute(to.path)) {
        next('/401')
        return
      }
      next()
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${encodeURIComponent(to.fullPath)}`) // 否则全部重定向到登录页，并携带原本要访问的路径
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

router.beforeResolve
