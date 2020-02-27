export function loadOpen(time = 0) {
  return setTimeout(() => {
    uni.showLoading({
      title: '加载中..'
    })

    setTimeout(() => {
      uni.hideLoading()
    }, time)
  }, time)
}

export function loadClose(timer) {
  uni.hideToast()
  uni.hideLoading()
  clearTimeout(timer)
}
