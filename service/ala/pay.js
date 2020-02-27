import ala from '@/service/ala'
// 支付类型
// export function payType() {
//     if (ala.client() === 'WapH5') {
//       // 手机Wap
//       return 2
//     } else if (ala.client() === 'WeChat') {
//       // 微信
//       return 5
//     } else if (ala.client() === 'WeChatLite') {
//       // 小程序
//       return 6
//     } else if (
//       ala.client() === 'AppPlus' &&
//       ala.getSystemInfoSync().platform === 'ios'
//     ) {
//       return 3
//     } else if (
//       ala.client() === 'AppPlus' &&
//       ala.getSystemInfoSync().platform === 'android'
//     ) {
//       return 4
//     }
//   }

export function payType() {
    var terminal
	// #ifdef H5
	// 手机Wap
	terminal = 2
	// #endif
	
	// #ifdef MP-WEIXIN
	// 微信
	terminal = 5
	// #endif
	// #ifdef APP-PLUS 
	if (ala.getSystemInfoSync().platform === 'ios') {
		terminal = 3
	} else {
		return 4
	}
	// #endif
	return terminal
  }