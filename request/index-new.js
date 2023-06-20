
import { baseURL } from '../config/env'

const Fly = require('../miniprogram_npm/flyio/index') 
// const Fly = require('../lib/fly.js')
const fly = new Fly()

/**
 * API
 * 1. fly.get(url, data, options)
 * 2. fly.post(url, data, options)
 * 3. fly.request(url, data, options)
 * 4. 
 */

// 实例级配置可用于当前Fly实例发起的所有请求
Object.assign(fly.config, {
  // headers:{}, //http请求头，
	baseURL, // 为了在request拦截中可动态修改
  timeout: 50000,
  // 是否自动将Content-Type为“application/json”的响应数据转化为JSON对象，默认为true  
	parseJson: true
})


// 添加请求拦截器
fly.interceptors.request.use(request => {
  console.log('request', request)
  if(request.url.includes("/my/")){
    // 拼接header 带上token
    request.headers["Authorization"] = wx.getStorageSync("token");
  }
  
  // 给所有请求添加自定义header
  // request.headers["X-Tag"] = "flyio";
  // 显示加载中 效果
  wx.showLoading({
    title: "加载中",
    mask: true
  });
  return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    console.log('response', response)
    // 只将请求结果的data字段返回
    // 关闭正在等待的图标
    wx.hideLoading();
    return response.data.message
  },
  (err) => {
    wx.hideLoading();
    // 发生网络错误后会走到这里
    // return Promise.resolve("ssss")
  }
)


export const request = params => {
  let { url, data, options } = params
  const method = options?.method.toLocaleUpperCase()
  // post请求
  if (method === 'POST') return fly.post(url, data ? { ...params.data } : null, options)

  // 默认get请求
  return fly.get(url, data ? { ...params.data } : null, options)
}
