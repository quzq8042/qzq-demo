import { getProducts, getProductCategories, getProductBrands } from '@/api/home.js'

const useProductStore = defineStore('product', {
  state: () => ({
    searchKeyword: '',
    filterOptions: {
      category: null,
      brand: null,
      priceRange: [0, 10000],
      inStock: false,
    },
    currentPage: 1,
    pageSize: 10,
    productList: [],
    total: 0,
    loading: false,
    categories: [],
    brands: [],
    abortController: null,
  }),

  getters: {
    // 组合筛选条件
    filterParams: (state) => {
      return {
        keyword: state.searchKeyword,
        category: state.filterOptions.category,
        brand: state.filterOptions.brand,
        minPrice: state.filterOptions.priceRange[0],
        maxPrice: state.filterOptions.priceRange[1],
        inStock: state.filterOptions.inStock,
        pageNum: state.currentPage,
        pageSize: state.pageSize,
      }
    },
  },

  actions: {
    // 设置搜索关键词
    setSearchKeyword(keyword) {
      this.searchKeyword = keyword
      this.currentPage = 1
    },

    // 设置筛选条件
    setFilterOptions(options) {
      this.filterOptions = { ...this.filterOptions, ...options }
      this.currentPage = 1
    },

    // 设置当前页码
    setCurrentPage(page) {
      this.currentPage = page
    },

    // 设置每页数量
    setPageSize(size) {
      this.pageSize = size
      this.currentPage = 1
    },

    // 重置筛选条件
    resetFilters() {
      this.searchKeyword = ''
      this.filterOptions = {
        category: null,
        brand: null,
        priceRange: [0, 10000],
        inStock: false,
      }
      this.currentPage = 1
    },

    // 获取商品列表
    async fetchProducts() {
      // 取消之前的请求
      if (this.abortController) {
        this.abortController.abort()
      }

      // 创建新的AbortController
      this.abortController = new AbortController()

      try {
        console.log('获取商品列表...')
        this.loading = true
        const response = await getProducts({
          ...this.filterParams,
          signal: this.abortController.signal,
        })
        console.log(response)
        let allProducts = response.list || []
        let filteredProducts = allProducts
        if (this.searchKeyword) {
          const keyword = this.searchKeyword.toLowerCase()
          filteredProducts = allProducts.filter(
            (product) =>
              (product.name && product.name.toLowerCase().includes(keyword)) ||
              (product.description && product.description.toLowerCase().includes(keyword))
          )
        }
        this.total = filteredProducts.length
        this.productList = filteredProducts.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      } catch (error) {
      } finally {
        this.loading = false
      }
    },

    // 获取分类列表
    async fetchCategories() {
      try {
        const response = await getProductCategories()
        this.categories = response.data || []
      } catch (error) {
        console.error('获取分类列表失败:', error)
        this.categories = []
      }
    },

    // 获取品牌列表
    async fetchBrands() {
      try {
        const response = await getProductBrands()
        this.brands = response.data || []
      } catch (error) {
        console.error('获取品牌列表失败:', error)
        this.brands = []
      }
    },
  },
})

export default useProductStore
