import store from '@/service/store'

// 屏幕高度
export function screenHeight() {
  return this.screenInfo().windowHeight
}
// 屏幕宽度
export function screenWidth () {
  var windowWidth = this.screenInfo().windowWidth
  // #ifdef APP-PLUS-NVUE
	windowWidth = windowWidth + 1
  // #endif
  return windowWidth
}
// 手机遮屏高度
export function statusHeight() {
	return this.screenInfo().statusBarHeight
}

// 当前获取系统信息
export function screenInfo() {
  if (store.state.getSystemInfoSync === null) {
    store.state.getSystemInfoSync = uni.getSystemInfoSync()
    return store.state.getSystemInfoSync
  } else {
    return store.state.getSystemInfoSync
  }
}
