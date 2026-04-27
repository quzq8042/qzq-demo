export const listData = () => {
  const arr = []
  for (let i = 0; i < 31; i++) {
    arr.push({
      id: i + 1,
      name: '商品' + (i + 1),
      price: Math.floor(Math.random() * 1000),
      stock: Math.floor(Math.random() * 1000),
      description: '这是一个商品' + (i + 1),
    })
  }
  return {
    total: arr.length,
    list: arr,
  }
}
