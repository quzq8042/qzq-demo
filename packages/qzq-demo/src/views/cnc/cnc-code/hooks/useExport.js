import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export function useExport(tabs) {
  const exportMarkdown = () => {
    let mdContent = '# CNC 代码注解表\n\n'

    tabs.forEach((tab) => {
      if (['code1', 'code2'].includes(tab.name)) {
        mdContent += `## ${tab.label}\n\n`
        mdContent += '| 代码 | 注解 |\n'
        mdContent += '| :--- | :--- |\n'

        tab.data.forEach((item) => {
          mdContent += `| ${item.code} | ${item.description} |\n`
        })
        mdContent += '\n'
      } else if (tab.name === 'code4') {
        mdContent += `## ${tab.label}\n\n`
        mdContent += '| 公制粗螺纹规格(单位:mm) | 标准径 | 最大 | 最小 | '
        mdContent += '| 公制细螺纹规格(单位:mm) | 标准径 | 最大 | 最小 |\n'
        mdContent += '| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n'

        tab.data.value.forEach((item) => {
          mdContent += `| ${item.coarse_spec} | ${item.coarse_std} | `
          mdContent += `${item.coarse_max} | ${item.coarse_min} | | `
          mdContent += `${item.fine_spec} | ${item.fine_std} | `
          mdContent += `${item.fine_max} | ${item.fine_min} |\n`
        })
        mdContent += '\n'
      }
    })

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' })
    saveAs(blob, 'CNC 代码注解表.md')
  }

  const exportExcel = () => {
    const wb = XLSX.utils.book_new()

    tabs.forEach((tab) => {
      if (['code1', 'code2'].includes(tab.name)) {
        const data = tab.data.map((item) => ({
          代码: item.code,
          注解: item.description,
        }))
        const ws = XLSX.utils.json_to_sheet(data)
        XLSX.utils.book_append_sheet(wb, ws, tab.label)
      } else if (tab.name === 'code4') {
        const data = tab.data.value.map((item) => ({
          '公制粗螺纹-规格(单位:mm)': item.coarse_spec,
          '公制粗螺纹-标准径': item.coarse_std,
          '公制粗螺纹-最大': item.coarse_max,
          '公制粗螺纹-最小': item.coarse_min,
          '公制细螺纹-规格(单位:mm)': item.fine_spec,
          '公制细螺纹-标准径': item.fine_std,
          '公制细螺纹-最大': item.fine_max,
          '公制细螺纹-最小': item.fine_min,
        }))
        const ws = XLSX.utils.json_to_sheet(data)
        XLSX.utils.book_append_sheet(wb, ws, tab.label)
      }
    })

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([wbout], { type: 'application/octet-stream' })
    saveAs(blob, 'CNC 代码注解表.xlsx')
  }

  return {
    exportMarkdown,
    exportExcel,
  }
}
