# react-ant-design-boilerplate

React + ant-design starter kit / boilerplate with React.js、react-router、Redux、ant-design、WebPack、Less、Mocha

## Features

- Babel with ES6
- Hot reloading
- Testing
- Linting
- Local mock server
- Working example app

## Initial Machine Setup

- Install[Node.js](https://nodejs.org/en/)
- （Optional）Install taobao NPM image

   ```bash
   $ npm install -g cnpm --registry=https://registry.npm.taobao.org
   ```

## Get Started

  Install npm(or cnpm) package
  ```
  $ npm install
  ```
  
  Start development in your default browser
  ```
  $ npm start
  ```
  
  Run the local mock service
  ```
  $ npm run start:mock
  ```

  Build scripts and css etc.
  ```
  $ npm run build
  ```
  
  Start production in your default browser
  ```
  $ npm run open:dist
  ```
  
完整命令请查阅package.json

## Links

- [ant-design](http://ant.design/)
- [react](https://github.com/facebook/react)
- [react-router](https://github.com/reactjs/react-router)
- [react-router-redux](https://github.com/reactjs/react-router-redux)
- [redux](https://github.com/reactjs/redux)
- [redux-devtools](https://github.com/gaearon/redux-devtools)
- [redux-devtools-dock-monitor](https://github.com/gaearon/redux-devtools-dock-monitor)
- [WebPack](http://webpack.github.io/docs/)
- [Less](https://github.com/less/less.js)
- [Mocha](https://github.com/mochajs/mocha)


## The directory structure

```
.
├── /coverage/                # 运行npm run test:cover输出的测试覆盖率文件
├── /docs/                    # 项目文档
├── /dist/                    # 构建输出的文件会在这里
├── /mocks/                   # 用于mock数据便于开发调试
├── /nei.xxxx/                # 运行nei build构建输出的文件, https://nei.netease.com/
├── /node_modules/            # 第三方类库和工具
├── /src/                     # 应用源码
│ ├── /actions/               # React actions
│ ├── /assets/                # 可编译静态资源文件
│ ├── /components/            # React components
│ ├── /config/                # 环境变量配置文件
│ ├── /constants/             # 常量配置文件
│ ├── /containers/            # React containers
│ ├── /middleware/            # 业务层中间件,处理日志、打点等公共业务逻辑
│ ├── /reducers/              # 通用的React reducers jsx文件
│ ├── /store/                 # React Store
│ ├── /utils/                 # 工具函数
│ ├── /vendor/                # 不需要编译的静态资源文件
│ ├── /demo.html              # UI component demo
│ ├── /demo.js                # UI component demo
│ ├── /favicon.ico            # favicon
│ ├── /index.html             # 页面入口
│ ├── /index.js               # js入口
│ └── /routes.js              # 路由配置文件
├── /tools/                   # 脚本
├── .babelrc                  # babel配置文件, https://babeljs.io/docs/usage/babelrc/
├── .editorconfig             # 代码风格配置文件, http://editorconfig.org
├── .eslintrc                 # eslint配置文件, http://eslint.cn/docs/user-guide/configuring
├── .gitignore                # git配置文件, https://help.github.com/articles/ignoring-files/
├── .istanbul.yml             # istanbul配置文件，https://github.com/gotwarlost/istanbul
├── package.json              # 配置入口文件地址、依赖和 scripts
├── postcss.config.js         # postcss配置文件, https://github.com/postcss/postcss-loader
├── proxy.config.js           # 代理配置文件, 用于 mock 和在线调试
└── webpack.config.dev.js     # webpack开发环境配置
└── webpack.config.prod.js    # webpack生产环境配置
```

## Coding styles
- javascript: use eslint:recommended, see https://eslint.org/docs/rules/ and .eslintrc file for more details
- directory、html、css、js: named using hump form
- react component and react container: named using hump form and uppercase characters at the beginning
- test file: named with Component + .spec + .js format
