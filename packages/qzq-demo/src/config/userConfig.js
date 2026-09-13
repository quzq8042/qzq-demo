import { getToken } from '@/utils/auth'
import { decrypt } from '@/utils/jsencrypt'

// ============================================================
// 账号配置中心 —— 以后新增/修改账号只需要改这里即可
// ============================================================
//
// 字段说明：
//   username     账号
//   password     密码
//   expireTime   过期时间（时间戳 ms），null 表示永不过期
//   denyModules  禁止访问的模块路径前缀数组，匹配路由 path 开头即可
//                例如 ['/index', '/front-end'] 表示禁止访问简历和前端模块
//                空数组 [] 表示可以访问所有模块
// ============================================================

const now = Date.now()
const THREE_MONTHS = 3 * 30 * 24 * 60 * 60 * 1000

export const userList = [
  {
    username: 'qz',
    password: 'admin123',
    expireTime: null,
    denyModules: [],
    remark: '超级管理员，所有模块均可访问',
  },
  {
    username: 'admin',
    password: 'admin123',
    expireTime: null,
    denyModules: ['/index', '/front-end', '/cnc/cutting-params', '/cnc/ug-machining-strategy', '/cnc/calculator', '/cnc/process-card', '/cnc/special-tool-creation', '/cnc/ug-shortcut-key', '/cnc/tolerance-chart', '/cnc/faq', '/cnc/post-processor-guide', '/cnc/cnc-safety', '/cnc/material-properties'],
    remark: '普通用户，仅可访问CNC代码/代码示例/CAD快捷键等公开页面',
  },
  {
    username: 'cnc10086',
    password: 'admin123',
    expireTime: now + THREE_MONTHS,
    denyModules: ['/index', '/front-end'],
    remark: 'CNC 专用账号，禁止简历和前端模块，有效期3个月',
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
  if (user.expireTime && Date.now() > user.expireTime) {
    return { ok: false, reason: '账号已过期，请联系管理员' }
  }
  return { ok: true, user }
}

export function getCurrentUser() {
  const token = getToken()
  if (!token) return null
  const username = decrypt(token)
  if (!username) return null
  return findUser(username) || null
}

export function isUserExpired(user) {
  if (!user?.expireTime) return false
  return Date.now() > user.expireTime
}

export function hasAccessToRoute(routePath) {
  const user = getCurrentUser()
  if (!user) return false
  if (isUserExpired(user)) return false
  if (!user.denyModules || user.denyModules.length === 0) return true
  return !user.denyModules.some((prefix) => routePath.startsWith(prefix))
}

export function hasAccessToModule(modulePath) {
  const user = getCurrentUser()
  if (!user) return false
  if (isUserExpired(user)) return false
  if (!user.denyModules || user.denyModules.length === 0) return true
  return !user.denyModules.some((prefix) => modulePath === prefix || modulePath.startsWith(prefix + '/'))
}

export function getExpireRemainDays(user) {
  if (!user?.expireTime) return -1
  const remain = user.expireTime - Date.now()
  if (remain <= 0) return 0
  return Math.ceil(remain / (24 * 60 * 60 * 1000))
}
