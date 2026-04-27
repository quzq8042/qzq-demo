---
# category: Utilities
---

## watchUpdate

监听 web 程序是否更新

## Usage

```js
import { watchUpdate } from './index.js'

const up = new watchUpdate({ timer: 2000 })

up.on('update', () => {
  console.log('项目更新了，请刷新')
})
```
