import request from '@/utils/request'
import { mockRequest } from '@/mock/mock.js'

// 获取舆情资讯分类
export const getNewsType = async () => {
  let list = []
  try {
    let { data } = await request({
      url: '/screen/info/getArticleType',
      method: 'get',
    })

    if (!data) {
      return mockRequest([])
    }
    list = Object.keys(data).map((item) => {
      return {
        key: item,
        name: item,
        children: [
          { id: 0, name: '全部' },
          ...data[item].map((ele) => {
            return { id: ele, name: ele }
          }),
        ],
      }
    })
    return mockRequest(list)
  } catch (error) {
    return mockRequest(list)
  }
}
// 获取细分领域分类
export const getSubdivisionType = async () => {
  let list = []
  try {
    let { data } = await request({
      url: '/enterprise/category/tree',
      method: 'get',
    })

    if (!data) {
      return mockRequest([])
    }
    return mockRequest(data)
  } catch (error) {
    return mockRequest(data)
  }
}
