import ala from '@/service/ala'
// 终端类型
export function client() {
  // #ifdef H5
  var u = navigator.userAgent
  var client = 'WapH5'
  if (u.indexOf('MicroMessenger') > -1 || u.indexOf('micromessenger') > -1) {
    client = 'WeChat' // 微信
  }
  return client
  // #endif

  // #ifdef MP-WEIXIN
  // eslint-disable-next-line
  return 'WeChatLite'
  // #endif

  // #ifndef APP-PLUS
  // eslint-disable-next-line
  return 'AppPlus'
  // #endif
}

// 支付类型
export default function clientPayType() {
  if (this.client() === 'WapH5') {
    // 手机Wap
    return 2
  } else if (this.client() === 'WeChat') {
    // 微信
    return 5
  } else if (this.client() === 'WeChatLite') {
    // 小程序
    return 6
  } else if (this.client() === 'AppPlus') {
    return 3
  } else if (this.client() === 'AppPlus') {
    return 4
  }
}


// 文件上传地址

export function clientUploadApi () {
  var apiUrl = ala.host + 'Api/StorageFile/upload'
  return apiUrl
}
