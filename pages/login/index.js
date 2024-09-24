// pages/login/index.js
import { requestTest } from "../../request/test.js";
import { login, getUserProfile } from "../../utils/asyncWx.js";
Page({
  handleGetUserInfo(e){
    console.log(e);
    const { userInfo } = e.detail;
    wx.setStorageSync("userinfo", userInfo);
    wx.navigateBack({
      delta: 1
    });
  },

  // 登陆
  async handleLogin() {

    // 1. 获取用户昵称和头像
    const UserProfile = await getUserProfile()
    console.log('UserProfile:::', UserProfile)
    const { userInfo, rawData, signature, encryptedData, iv, cloudID } = UserProfile;
    const { avatarUrl, nickName } = userInfo;

    // 2. wx.login() 获取 code
    const loginRes = await login()
    console.log('loginRes', loginRes)
    const { code } = loginRes

    // 3. 调用开发者服务器
    const result = await requestTest({
      url: '/wxlogin',
      data: {
        code,
        nickName,
        avatarUrl
      },
      method: 'POST'
    })
    console.log('result', result)

    // 4. 将用户信息存储在本地
    wx.setStorageSync("userinfo", userInfo);

    // 5. 返回到我的页面
    // 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层。
    wx.navigateBack({
      delta: 1
    });
  }
})