import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
export const useJump = () => {
  const route = useRoute()
  const router = useRouter()

  /**
   * 跳转
   * @param {String} path 路由
   * @param {Object} query 路由query参数
   * @param {Object} params 路由params参数
   * @param {Boolean} blank 是否在新页签打开
   * @param {String} type 打开的类型  页面page 连接link
   *
   */
  const goto = ({ path, isurl = false, query = {}, params = {}, blank = false, type = 'page', replace = false }) => {
    if (!path && type == 'page') {
      ElMessage({
        message: '系统还在建设中...',
        type: 'warning',
        grouping: true,
      })
    } else {
      if (blank) {
        const url = isurl ? { href: path } : router.resolve({ path, query, params })
        window.open(url.href, '_blank')
      } else {
        if (isurl) {
          window.open(path, '_self')
          return
        }
        if (replace) {
          router.replace({
            path: path,
            query: query || {},
            params: params || {},
          })
        } else {
          if (route.fullPath == path) {
            router.go(0)
          } else {
            router.push({
              path: path,
              query: query || {},
              params: params || {},
            })
          }
        }
      }
    }
  }

  return {
    goto,
    route,
    router,
  }
}
