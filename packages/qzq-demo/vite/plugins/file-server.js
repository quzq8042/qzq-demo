const fs = require('fs')
const path = require('path')

function createFileServer() {
  return {
    name: 'file-server',
    configureServer(server) {
      server.middlewares.use('/api/files', (req, res) => {
        const filesDir = path.join(__dirname, '../../public/files')

        function scanDirectory(dir, basePath = '') {
          const result = []
          let files

          try {
            files = fs.readdirSync(dir)
          } catch (err) {
            return []
          }

          files.forEach((file) => {
            const filePath = path.join(dir, file)
            const stats = fs.statSync(filePath)
            const relativePath = basePath ? `${basePath}/${file}` : file

            if (stats.isDirectory()) {
              const children = scanDirectory(filePath, relativePath)
              result.push({
                name: file,
                type: 'folder',
                path: `/files/${relativePath}`,
                children,
              })
            } else {
              result.push({
                name: file,
                type: 'file',
                path: `/files/${relativePath}`,
                url: `/files/${relativePath}`,
              })
            }
          })

          return result
        }

        const fileTree = scanDirectory(filesDir)

        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        })
        res.end(JSON.stringify(fileTree))
      })
    },
  }
}

module.exports = createFileServer
