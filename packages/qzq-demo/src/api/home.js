import request from '@/utils/request'
import { mockRequest } from '@/mock/mock.js'

export const getProducts = async (data) => {
  let params = {}
  try {
    Object.keys(data).map((key) => {
      if (key !== 'signal' && data[key] !== '' && data[key] !== undefined && data[key] !== null) {
        params[key] = data[key]
      }
    })
    return mockRequest({})
  } catch (error) {
    return mockRequest({})
  }
}
