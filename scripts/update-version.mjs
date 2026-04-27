import fs from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

import { ProjectList } from './ProjectList.mjs'

// 从命令行参数中获取版本号
const tag_version = process.argv[2]

const tag_projectname = process.argv[3]

const project = ProjectList.find((item) => item.projectname === tag_projectname)

// 读取 package.json 文件
const pkgPath = fileURLToPath(new URL(`..${project.package}package.json`, import.meta.url))
const pkgContent = fs.readFileSync(pkgPath, 'utf-8')
const pkgData = JSON.parse(pkgContent)

// 更新版本号，并保存文件
pkgData.version = tag_version
fs.writeFileSync(pkgPath, JSON.stringify(pkgData, null, 2))
