const ProjectList = [
  {
    title: '个人demo项目',
    name: '@qzq/qzq-demo',
    projectname: 'qzq-demo',
    package: '/packages/qzq-demo/',
    environment: [
      {
        title: '测试环境',
        command: [
          {
            title: '运行项目',
            command: 'dev',
          },
          {
            title: '打包项目',
            command: 'build:master',
          },
          {
            title: '打包后预览项目',
            command: 'preview',
          },
        ],
        branch: '',
        git: '',
      },
    ],
  },
]

export { ProjectList }
