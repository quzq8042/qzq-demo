if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.warn('\u001b[33m需要使用pnpm作为包管理器\u001b[39m\n')
  process.exit(1)
}
