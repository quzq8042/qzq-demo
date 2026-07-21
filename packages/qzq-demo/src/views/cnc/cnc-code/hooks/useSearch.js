import { ref, watch, computed, onUnmounted } from 'vue'

export function useSearch(tabs) {
  const searchText = ref('')
  const debouncedKeyword = ref('')

  let debounceTimer = null
  const debounce = (fn, delay = 300) => {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(fn, delay)
  }

  watch(searchText, (val) => {
    debounce(() => {
      debouncedKeyword.value = val.toLowerCase().trim()
    })
  })

  onUnmounted(() => {
    if (debounceTimer) clearTimeout(debounceTimer)
  })

  const highlightKeyword = (text) => {
    if (!debouncedKeyword.value) return text
    const regex = new RegExp(`(${debouncedKeyword.value})`, 'gi')
    return String(text).replace(regex, '<span class="highlight">$1</span>')
  }

  const tableSearchResults = computed(() => {
    const keyword = debouncedKeyword.value
    if (!keyword) return []

    const results = []
    tabs.forEach((tab) => {
      if (['code1', 'code2'].includes(tab.name)) {
        tab.data.forEach((item) => {
          if (Object.values(item).some((val) => String(val).toLowerCase().includes(keyword))) {
            results.push({
              category: tab.label,
              code: item.code,
              description: item.description,
            })
          }
        })
      } else if (tab.name === 'code33') {
        tab.data.forEach((item) => {
          if (Object.values(item).some((val) => String(val).toLowerCase().includes(keyword))) {
            results.push({
              category: tab.label,
              code: item.spec,
              description: `刀刃直径:${item.diameter}, 刀刃长:${item.length}`,
            })
          }
        })
      }
    })
    return results
  })

  const imageSearchResults = computed(() => {
    const keyword = debouncedKeyword.value
    if (!keyword) return {}

    const results = {}
    tabs.forEach((tab) => {
      if (tab.name === 'code3') {
        for (const [fileName, img] of Object.entries(tab.data)) {
          if (fileName.toLowerCase().includes(keyword.toLowerCase())) {
            results[fileName] = img
          }
        }
      }
    })
    return results
  })

  const screwTableSearchResults = computed(() => {
    const keyword = debouncedKeyword.value
    if (!keyword) return []

    const results = []
    tabs.forEach((tab) => {
      if (tab.name === 'code4') {
        const data = tab.data.value || tab.data
        data.forEach((item) => {
          if (Object.values(item).some((val) => String(val).toLowerCase().includes(keyword))) {
            results.push(item)
          }
        })
      }
    })
    return results
  })

  const resetSearch = () => {
    searchText.value = ''
    debouncedKeyword.value = ''
  }

  return {
    searchText,
    debouncedKeyword,
    highlightKeyword,
    tableSearchResults,
    imageSearchResults,
    screwTableSearchResults,
    resetSearch,
  }
}
