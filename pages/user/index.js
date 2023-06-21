// pages/user/index.js
Page({
  data: {
    userinfo: {},
    // 被收藏的商品的数量
    collectNums: 0
  },
  onShow() {
    const userinfo = wx.getStorageSync("userinfo");
    console.log('userinfo', userinfo)
    const collect = wx.getStorageSync("collect") || [];
      
    this.setData({
      userinfo,
      collectNums: collect.length
    });
      
  },
  async handleClearStorage() {
    // 清除指定缓存
    try {
      wx.removeStorageSync('userinfo')
      // 刷新当前页面
      // wx.startPullDownRefresh()
    } catch (e) {
      // Do something when catch error
    }

    // 或者 清除所有缓存
    // try {
    //   wx.clearStorageSync()
    // } catch(e) {
    //   // Do something when catch error
    // }
  }
})