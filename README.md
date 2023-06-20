## 工具

#### 概览
为了帮助开发者简单和高效地开发和调试微信小程序，我们在原有的公众号网页调试工具的基础上，推出了全新的 微信开发者工具，集成了公众号网页调试和小程序调试两种开发模式。
- 使用公众号网页调试，开发者可以调试微信网页授权和微信JS-SDK 详情
- 使用小程序调试，开发者可以完成小程序的 API 和页面的开发调试、代码查看和编辑、小程序预览和发布等功能。

#### 界面

#### 设置

- 通用设置
- 外观设置
- 快捷键设置
- 编辑器设置
- 代理设置
- 安全设置
- 扩展设置

- 项目配置文件
1. 项目根目录中的 project.config.json 和 project.private.config.json 文件可以对项目进行配置。
2. project.private.config.json 中的相同设置优先级高于 project.config.json。
3. 可以在 project.config.json 文件中配置公共的配置，在 project.private.config.json 配置个人的配置，可以将 project.private.config.json 写到 .gitignore 避免版本管理的冲突。
4. project.private.config.json 中有的字段，开发者工具内的设置修改会优先覆盖 project.private.config.json 的内容。
如在 project.private.config.json 有 appid 字段，那么在 详情-基本信息 中修改了 appid，会写到 project.private.config.json 中，不会覆盖掉 project.config.json 的 appid 字段的内容。

5. 可以在项目根目录使用 project.config.json 文件对项目进行配置。


#### 代码编辑


#### 小程序调试

1. 程序调试主要有三大功能区：模拟器、调试工具和小程序操作区


#### 开发辅助

1. npm 支持
从小程序基础库版本 2.2.1 或以上、及开发者工具 1.02.1808300 或以上开始，小程序支持使用 npm 安装第三方包。

  - 安装 npm 包

  在小程序 package.json 所在的目录中执行命令安装 npm 包
  ```js
    npm install
  ```
  此处要求参与构建 npm 的 package.json 需要在 project.config.json 定义的 miniprogramRoot 之内。

  - 构建 npm
  点击开发者工具中的菜单栏：工具 --> 构建 npm

  - 构建完成后即可使用 npm 包。
  js 中引入 npm 包：
  ```js
  const myPackage = require('packageName')
  const packageOther = require('packageName/other')

  ```



## 判断小程序运行环境

  1. 通过 __wxConfig 的属性 envVersion 来判断
      develop 开发版
      trial   体验版
      release 正式版
  2. 通过API中的开放接口 wx.getAccountInfoSync() 获取账号信息

  ```js
  // 小程序环境 develop trial release
  let baseURL = ''
  let clientId = ''
  let uacHost = ''
  let mockHost = ''
  let websocketUrl = ''
  switch (__wxConfig.envVersion) {
    case 'develop':
      // baseURL = 'https://dev-i.szzhijing.com'
      // uacHost = 'https://dev-a.szzhijing.com'
      // clientId = '6E037CFF69594E0780F6E94789CEB5E5'
      // mockHost = 'https://yapi.ibaibu.com/mock/846'
      // websocketUrl = 'wss://dev-i.szzhijing.com'
      baseURL = 'https://qa-i.szzhijing.com'
      uacHost = 'https://qa-a.szzhijing.com'
      clientId = '6E037CFF69594E0780F6E94789CEB5E5'
      mockHost = 'https://yapi.ibaibu.com/mock/846'
      websocketUrl = 'wss://qa-i.szzhijing.com'
      // baseURL = 'https://qa-i.szzhijing.com'
      // uacHost = 'https://qa-a.szzhijing.com'
      // clientId = '6E037CFF69594E0780F6E94789CEB5E5'
      // mockHost = 'https://yapi.ibaibu.com/mock/846'
      // websocketUrl = 'wss://qa-i.szzhijing.com'
      // baseURL = 'https://i.szzhijing.com'
      // uacHost = 'https://a.szzhijing.com'
      // clientId = '6E037CFF69594E0780F6E94789CEB5E5'
      // mockHost = 'https://yapi.ibaibu.com/mock/846'
      // websocketUrl = 'wss://i.szzhijing.com'
      break;
    case 'trial':
      baseURL = 'https://qa-i.szzhijing.com'
      uacHost = 'https://qa-a.szzhijing.com'
      clientId = '6E037CFF69594E0780F6E94789CEB5E5'
      mockHost = 'https://yapi.ibaibu.com/mock/846'
      websocketUrl = 'wss://qa-i.szzhijing.com'
      break
    case 'release':
      baseURL = 'https://i.szzhijing.com'
      uacHost = 'https://a.szzhijing.com'
      clientId = '6E037CFF69594E0780F6E94789CEB5E5'
      websocketUrl = 'wss://i.szzhijing.com'
      break
  }
  export {
    baseURL,
    clientId,
    uacHost,
    mockHost,
    websocketUrl
  }
  ```

## 项目管理

```sh

# push a existing repository from the command line
  ## 通过https
  git remote add origin https://github.com/loveandkiss/miniprogram.git

  ## 或者通过SSH密钥
  git remote add origin git@github.com:loveandkiss/miniprogram.git

# 将当前分支名称更改为 main
git branch -M main


# 将本地的代码推送到远程仓库的主分支（main）并建立跟踪关系
git push -u origin main

需要输入用户名 Username 和密码 Password
用户名 Username 为 github 用户名
密码 Password 为 github token


```



## 通过 npm 引入第三方库 vant-weapp

[vant-weapp](https://youzan.github.io/vant-weapp)

- 安装
  `npm i @vant/weapp -S --production`

- 小程序开发工具-本地设置勾选`使用npm模块`

- 小程序开发工具-工具-构建 npm

可在`app.json-usingComponents` 全局引入，也可以组件内引入



## 如何引入 miniprogram-ci 插件 ？？？
- https://www.npmjs.com/package/miniprogram-ci

## 引入 Fly.js 请求插件

- https://www.npmjs.com/package/flyio

- https://wendux.github.io/dist/#/doc/flyio/readme

- 微信小程序的 javascript 运行环境和浏览器不同，页面的脚本逻辑是在JsCore中运行，JsCore是一个没有窗口对象的环境，所以不能在脚本中使用window，也无法在脚本中操作组件，JsCore中也没有 XmlhttpRequest对象，所以jquery 、zepto、axios这些在小程序中都不能用，而此时，正是 fly 大显身手的时候。

- https://unpkg.com/flyio@0.6.14/dist/fly.min.js


## 














