import useUserStore from '@/store/modules/user'

export const useScoreDetails = () => {
  // 判断是否有评分详情权限
  // const all_permission = '*:*:*'
  // const permissions = useUserStore().permissions
  // const permissionFlag = ['score:details:popup2']
  // const hasPermissions = permissions.some((permission) => {
  //   return all_permission === permission || permissionFlag.includes(permission)
  // })

  // if (!hasPermissions) {
  //   return false
  // } else {
  //   return true
  // }
  // 获取 VITE_APP_SCORE_DETAILS_POPUP 的类型

  return import.meta.env?.VITE_APP_SCORE_DETAILS_POPUP === 'true'
}
