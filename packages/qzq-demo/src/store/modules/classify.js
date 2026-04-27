import { getNewsType, getSubdivisionType } from '@/api/common/index.js'

// 所有分类
const useClassifyStore = defineStore('classify', {
  state: () => ({
    searchClassify: [], // 搜索分类
    newsClassify: [], // 舆情资讯分类
    subdivisionClassify: [], // 细分领域分类
  }),
  actions: {
    async getSearchClassify() {
      if (this.searchClassify.length === 0) {
        const data = await getNewsType()
        this.searchClassify = [...data]
      }
      return this.searchClassify
    },
    async getNewsClassify() {
      if (this.newsClassify.length === 0) {
        const data = await getNewsType()
        this.newsClassify = [...data]
      }
      return this.newsClassify
    },
    async getSubdivisionClassify() {
      if (this.subdivisionClassify.length === 0) {
        const data = await getSubdivisionType()
        this.subdivisionClassify = [...data]
      }
      return this.subdivisionClassify
    },
  },
})

export default useClassifyStore
