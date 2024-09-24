//app.js

import mitt from "mitt";

// 注册小程序。接受一个 Object 参数，其指定小程序的生命周期回调等。
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  onLaunch: function (options) {
    // 不要在定义于 App() 内的函数中，或调用 App 前调用 getApp() ，使用 this 就可以拿到 app 实例。
    console.log('this-1', this)

    // 定义全局事件管理
    this.globalData.Bus = mitt()
  },
  onShow: function (options) {
    console.log('this-2', this)
  },
  onHide: function () {

  },
  onError: function (msg) {

  },
  //options(path,query,isEntryPage)
  onPageNotFound: function (options) {

  },

  // 全局数据
  globalData: {

  }

});
