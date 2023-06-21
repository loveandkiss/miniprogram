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

- 小程序开发工具-本地设置勾选`使用npm模块`[新的微信小程序开发工具默认使用npm模块]

- 小程序开发工具-工具-构建 npm

可在`app.json-usingComponents` 全局引入，也可以组件内引入



## 如何引入 miniprogram-ci 插件 ？？？
- https://www.npmjs.com/package/miniprogram-ci

## 引入 Fly.js 请求插件

- https://www.npmjs.com/package/flyio

- https://wendux.github.io/dist/#/doc/flyio/readme

- 微信小程序的 javascript 运行环境和浏览器不同，页面的脚本逻辑是在JsCore中运行，JsCore是一个没有窗口对象的环境，所以不能在脚本中使用window，也无法在脚本中操作组件，JsCore中也没有 XmlhttpRequest对象，所以jquery 、zepto、axios这些在小程序中都不能用，而此时，正是 fly 大显身手的时候。

- https://unpkg.com/flyio@0.6.14/dist/fly.min.js


## 引入 number-precision 插件

```js

  import NP from 'number-precision'
  NP.strip(0.09999999999999998); // 0.1
  NP.add(2.3, 2.6); // 4.9
  NP.sub(1.0, 0.9); // 0.1
  NP.multi(3, 0.3); // 0.9
  NP.divide(0.9, 0.3); // 3

```

## 引入 mitt 插件


## 如何刷新整个微信小程序


## 指南 
### 小程序框架
- 小程序开发框架的目标是通过尽可能简单、高效的方式让开发者可以在微信中开发具有原生 APP 体验的服务。
- 整个小程序框架系统分为两部分：逻辑层（App Service）和 视图层（View）。
- 小程序提供了自己的视图层描述语言 WXML 和 WXSS，以及基于 JavaScript 的逻辑层框架，并在视图层与逻辑层间提供了数据传输和事件系统，让开发者能够专注于数据与逻辑。
### 逻辑层 App Service
- 使用 JavaScript 引擎为小程序提供开发 JavaScript 代码的运行环境以及微信小程序的特有功能。
- 逻辑层将数据进行处理后发送给视图层，同时接受视图层的事件反馈。
- 在 JavaScript 的基础上，我们增加了一些功能，以方便小程序的开发：
  . 增加 App 和 Page 方法，进行程序注册和页面注册。
  . 增加 getApp 和 getCurrentPages 方法，分别用来获取 App 实例和当前页面栈。
  . 提供丰富的 API，如微信用户数据，扫一扫，支付等微信特有能力。
  . 提供模块化能力，每个页面有独立的作用域。
注意：小程序框架的逻辑层并非运行在浏览器中，因此 JavaScript 在 web 中一些能力都无法使用，如 window，document 等。

### 注册小程序
- 每个小程序都需要在 app.js 中调用 App 方法注册小程序实例，绑定生命周期回调函数、错误监听和页面不存在监听函数等。

```js

  // app.js
  App({
    onLaunch (options) {
      // Do something initial when launch.
    },
    onShow (options) {
      // Do something when show.
    },
    onHide () {
      // Do something when hide.
    },
    onError (msg) {
      console.log(msg)
    },
    globalData: 'I am global data'
  })

```

- 整个小程序只有一个 App 实例，是全部页面共享的。
- 开发者可以通过 getApp 方法获取到全局唯一的 App 实例，获取App上的数据或调用开发者注册在 App 上的函数。

### 注册页面
- 对于小程序中的每个页面，都需要在页面对应的 js 文件中进行注册，指定页面的初始数据、生命周期回调、事件处理函数等。

#### 1. 使用 Page 构造器注册页面
```js
  //index.js
  Page({
    data: {
      text: "This is page data."
    },
    onLoad: function(options) {
      // 页面创建时执行
    },
    onShow: function() {
      // 页面出现在前台时执行
    },
    onReady: function() {
      // 页面首次渲染完毕时执行
    },
    onHide: function() {
      // 页面从前台变为后台时执行
    },
    onUnload: function() {
      // 页面销毁时执行
    },
    onPullDownRefresh: function() {
      // 触发下拉刷新时执行
    },
    onReachBottom: function() {
      // 页面触底时执行
    },
    onShareAppMessage: function () {
      // 页面被用户分享时执行
    },
    onPageScroll: function() {
      // 页面滚动时执行
    },
    onResize: function() {
      // 页面尺寸变化时执行
    },
    onTabItemTap(item) {
      // tab 点击时执行
      console.log(item.index)
      console.log(item.pagePath)
      console.log(item.text)
    },
    // 事件响应函数
    viewTap: function() {
      this.setData({
        text: 'Set some data for updating view.'
      }, function() {
        // this is setData callback
      })
    },
    // 自由数据
    customData: {
      hi: 'MINA'
    }
  })

```

#### 2. 在页面中使用 behaviors
- 页面可以引用 behaviors 。 behaviors 可以用来让多个页面有相同的数据字段和方法。
```js
  // my-behavior.js
  module.exports = Behavior({
    data: {
      sharedText: 'This is a piece of data shared between pages.'
    },
    methods: {
      sharedMethod: function() {
        this.data.sharedText === 'This is a piece of data shared between pages.'
      }
    }
  })

```

```js
  // page-a.js
  var myBehavior = require('./my-behavior.js')
  Page({
    behaviors: [myBehavior],
    onLoad: function() {
      this.data.sharedText === 'This is a piece of data shared between pages.'
    }
  })


```


#### 3. 使用 Component 构造器构造页面
- Page 构造器适用于简单的页面。但对于复杂的页面， Page 构造器可能并不好用。
- 此时，可以使用 Component 构造器来构造页面。 Component 构造器的主要区别是：方法需要放在 methods: { } 里面。
```js

  Component({
    data: {
      text: "This is page data."
    },
    methods: {
      onLoad: function(options) {
        // 页面创建时执行
      },
      onPullDownRefresh: function() {
        // 下拉刷新时执行
      },
      // 事件响应函数
      viewTap: function() {
        // ...
      }
    }
  })

  // 这种创建方式非常类似于 自定义组件 ，可以像自定义组件一样使用 behaviors 等高级特性。
```
























