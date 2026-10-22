import { getToken } from '@/utils/auth'
import { decrypt } from '@/utils/jsencrypt'

// ============================================================
// 账号配置中心 —— 以后新增/修改账号只需要改这里即可
// ============================================================
//
// 字段说明：
//   username     账号
//   password     密码
//   denyModules  禁止访问的模块路径前缀数组，匹配路由 path 开头即可
//                例如 ['/index', '/front-end'] 表示禁止访问简历和前端模块
//                空数组 [] 表示可以访问所有模块
// ============================================================

export const userList = [
  {
    username: 'qz',
    password: 'qz123',
    denyModules: [],
    remark: '超级管理员，所有模块均可访问',
  },
  {
    username: 'cnc10086',
    password: 'admin123',
    denyModules: ['/index', '/index2', '/front-end'],
    remark: 'CNC 专用账号，禁止简历和前端模块',
  },
]

// ============================================================
// 工具函数
// ============================================================

export function findUser(username) {
  return userList.find((u) => u.username === username)
}

export function validateUser(username, password) {
  const user = findUser(username)
  if (!user) return { ok: false, reason: '账号不存在' }
  if (user.password !== password) return { ok: false, reason: '密码错误' }
  return { ok: true, user }
}

export function getCurrentUser() {
  const token = getToken()
  if (!token) return null
  const username = decrypt(token)
  if (!username) return null
  return findUser(username) || null
}

export function hasAccessToRoute(routePath) {
  const user = getCurrentUser()
  if (!user) return false
  if (!user.denyModules || user.denyModules.length === 0) return true
  return !user.denyModules.some((prefix) => routePath.startsWith(prefix))
}

export function hasAccessToModule(modulePath) {
  const user = getCurrentUser()
  if (!user) return false
  if (!user.denyModules || user.denyModules.length === 0) return true
  return !user.denyModules.some((prefix) => modulePath === prefix || modulePath.startsWith(prefix + '/'))
}
