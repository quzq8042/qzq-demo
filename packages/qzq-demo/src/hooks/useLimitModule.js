import useUserStore from '@/store/modules/user'
import { computed } from 'vue'
// '/keyword',  '/keyword/list'

// 用户标识
// industry_moni 只可以访问 /industrial
// key_chain 可以访问 developingList 中的路由
// 其他用户 不可以访问 developingList中的路由

const developingList = ['/industrial']
const useLimitModule = () => {
  let limitModule = (path) => {
    return useUserStore().roles.length && !useUserStore().roles.includes('key_chain') && developingList.includes(path)
  }

  let limitModuleComputed = computed(() => (path) => {
    return useUserStore().roles.length && !useUserStore().roles.includes('key_chain') && developingList.includes(path)
  })
  // 只展示产业监测
  let islimitModuleIndustrial = () => {
    return useUserStore().roles.length && useUserStore().roles.includes('industry_moni')
  }
  let islimitModuleIndustrialComputed = computed(() => {
    return useUserStore().roles.length && useUserStore().roles.includes('industry_moni')
  })

  return {
    limitModule,
    limitModuleComputed,
    islimitModuleIndustrial,
    islimitModuleIndustrialComputed,
  }
}

export { useLimitModule }
