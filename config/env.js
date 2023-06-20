/*
 * @Author: zyp
 * @Date: 2023-6-15 12:13:00
 * @LastEditors: zyp
 * @LastEditTime: 2023-6-15 12:13:00
 * @Description: 接口地址环境
 */

// 小程序环境 develop trial release
let { envVersion } = __wxConfig
console.log('envVersion', envVersion)
// envVersion = 'release' // 用release提交审核

const configInfo = {
	develop: {
    baseURL: 'https://api-hmugo-web.itheima.net/api/public/v1', // https://api.zbztb.cn/api/public/v1
		// baseURL: 'https://dev-a.szzhijing.com',
		// commonURL: 'https://dev-a.szzhijing.com',
		// websocketUrl: 'wss://dev-a.szzhijing.com',
		// nodeEnv: 'dev',
	},
	trial: {
    baseURL: 'https://api-hmugo-web.itheima.net/api/public/v1',
		// baseURL: 'https://qa-a.szzhijing.com',
		// commonURL: 'https://qa-a.szzhijing.com',
		// websocketUrl: 'wss://qa-a.szzhijing.com',
		// nodeEnv: 'test'
	},
	release: {
    baseURL: 'https://api-hmugo-web.itheima.net/api/public/v1',
		// baseURL: 'https://a.szzhijing.com',
		// commonURL: 'https://a.szzhijing.com',
		// websocketUrl: 'wss://a.szzhijing.com',
		// nodeEnv: 'production'
	}
}


let {
	baseURL,
	commonURL,
	websocketUrl,
	nodeEnv
} = configInfo[envVersion]



export {
	baseURL,
	commonURL,
	websocketUrl,
	nodeEnv
}