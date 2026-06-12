import router from './router/index.js'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { decrypt } from '@/utils/jsencrypt'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  NProgress.start()
  // next()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 权限控制：admin 用户不能访问 /index 和 / 路由，
      // 直接从 cookie 读取用户名（解密后），确保页面刷新后仍能正确拦截
      const encryptedUsername = getToken()
      const username = encryptedUsername ? decrypt(encryptedUsername) : null
      if (username === 'admin' && to.path === '/index') {
        ElMessage.warning('当前账号无权限访问此页面')
        next({ path: '/portfolio', replace: true }) // 重定向到作品集页面，replace防止回退
        NProgress.done()
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
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

router.beforeResolve
