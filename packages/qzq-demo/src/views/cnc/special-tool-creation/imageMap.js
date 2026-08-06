const images = import.meta.glob('./images/*.{jpg,jpeg,png,gif,svg}', { eager: true })

const imageMap = {}

const sortedEntries = Object.entries(images)
  .map(([path, module]) => {
    const fileName = path.match(/\/([^/]+)\.\w+$/)[1]
    return { fileName, module: module.default }
  })
  .sort((a, b) => {
    const numA = parseInt(a.fileName.split('.')[0]) || 0
    const numB = parseInt(b.fileName.split('.')[0]) || 0
    return numA - numB
  })

for (const item of sortedEntries) {
  imageMap[item.fileName] = item.module
}

export { imageMap }
