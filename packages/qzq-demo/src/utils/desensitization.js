// 数字脱敏

export const numberDesensitization = (phone) => {
  if (!phone) return ''
  if (phone.includes('-')) {
    const parts = phone.split('-')
    if (parts.length === 2 && parts[1].length >= 7) {
      // 保留后2位可见
      const visiblePart = parts[1].slice(-2)
      return `${parts[0]}-******${visiblePart}`
    }
  } else {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  }
  return phone
}
