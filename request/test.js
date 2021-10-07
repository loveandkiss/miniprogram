
export const requestTest = (params) => {
  wx.showLoading({
    title: "加载中",
    mask: true
  });
  // 定义公共的url
  const baseUrl = "http://127.0.0.1:3000/api/wxuser";
  // const baseUrl = "http://127.0.0.1:3000/weixinUser";
  return new Promise((resolve,reject) => {
    wx.request({
     ...params,
     url: baseUrl + params.url,
     success: (result) => {
       resolve(result);
     },
     fail: (err) => {
       reject(err);
     },
     complete: () => {
       // 关闭正在等待的图标
       wx.hideLoading();
     }
    });
  })
}