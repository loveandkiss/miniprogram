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
  async weixinLogin() {

    // 1. 获取用户昵称和头像
    const UserProfile = await getUserProfile()
    const { userInfo } = UserProfile;
    const { avatarUrl, nickName } = userInfo;

     // 2. wx.login() 获取 code
     const loginRes = await login()
    //  console.log('loginRes', loginRes)
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
     
    //  4. 将用户信息存储在本地
     wx.setStorageSync("userinfo", userInfo);

    //  5. 返回到我的页面
     wx.navigateBack({
       delta: 1
     });
  }
})