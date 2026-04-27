import request from '@/utils/request'
import { mockRequest } from '@/mock/mock.js'
import { listData } from './mockData/home.js'
// 获取商品列表
export const getProducts = async (data) => {
  let params = {}
  try {
    Object.keys(data).map((key) => {
      if (key !== 'signal' && data[key] !== '' && data[key] !== undefined && data[key] !== null) {
        params[key] = data[key]
      }
    })
    console.log(params)

    // const res = await request({
    //   url: '/product/list',
    //   method: 'get',
    //   params,
    // })
    return mockRequest(listData())
  } catch (error) {
    return mockRequest(listData())
  }
}

// 获取商品分类
export const getProductCategories = async (data) => {
  let params = {}
  try {
    Object.keys(data).map((key) => {
      if (data[key] !== '' && data[key] !== undefined && data[key] !== null) {
        params[key] = data[key]
      }
    })
    const res = await request({
      url: '/product/categories',
      method: 'get',
      params,
    })
    return mockRequest({
      total: res?.data?.total || 0,
      list: res?.data?.list || [],
    })
  } catch (error) {
    return mockRequest({
      total: 0,
      list: [],
    })
  }
}

// 获取商品品牌
export const getProductBrands = async (data) => {
  let params = {}
  try {
    Object.keys(data).map((key) => {
      if (data[key] !== '' && data[key] !== undefined && data[key] !== null) {
        params[key] = data[key]
      }
    })
    const res = await request({
      url: '/product/brands',
      method: 'get',
      params,
    })
    return mockRequest({
      total: res?.data?.total || 0,
      list: res?.data?.list || [],
    })
  } catch (error) {
    return mockRequest({
      total: 0,
      list: [],
    })
  }
}
