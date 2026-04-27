module.exports = {
  '*.{css,md}': 'prettier --config .prettierrc.js --write',
  'package.json': ['prettier --config .prettierrc.js --write'],
  '*.{js,vue}': ['prettier --config .prettierrc.js --write', 'eslint --config .eslintrc.js --fix'],
}
