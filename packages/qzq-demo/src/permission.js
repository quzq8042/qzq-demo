import router from './router/index.js'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { isHttp } from '@/utils/validate'
import { isRelogin } from '@/utils/request'
import useUserStore from '@/store/modules/user'
import useSettingsStore from '@/store/modules/settings'
import usePermissionStore from '@/store/modules/permission'
import { useLimitModule } from './hooks/useLimitModule.js'
import Cookies from 'js-cookie'
import { decrypt } from '@/utils/jsencrypt'

const { limitModule, islimitModuleIndustrial } = useLimitModule()

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  NProgress.start()
  // next()
  if (getToken()) {
    to.meta.title && useSettingsStore().setTitle(to.meta.title)
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // 权限控制：admin 用户不能访问 /index 和 / 路由，
      // 直接从 cookie 读取用户名（解密后），确保页面刷新后仍能正确拦截
      const encryptedUsername = Cookies.get('username')
      const username = encryptedUsername ? decrypt(encryptedUsername) : null
      if (username === 'admin' && (to.path === '/index' || to.path === '/')) {
        ElMessage.warning('当前账号无权限访问此页面')
        next({ path: '/portfolio', replace: true }) // 重定向到作品集页面，replace防止回退
        NProgress.done()
        return
      }

      if (limitModule(to.path)) {
        next({ path: '/' })
      } else {
        next()
      }
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
