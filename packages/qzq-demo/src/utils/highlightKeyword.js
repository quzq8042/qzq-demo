export const highlightKeyword = (text, keyword) => {
  if (!text) return '-'
  if (!keyword) return text
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(escapedKeyword, 'gi')
  return text.replace(regex, '<span style="color: #ff5500;">$&</span>')
}
