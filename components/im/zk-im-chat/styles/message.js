const innerAudioContext = uni.createInnerAudioContext()
export default {
  // 查看当前位置
  geographicPosition(jsThis, data) {
    uni.openLocation({
      latitude: data.msg.latitude,
      longitude: data.msg.longitude,
      address: data.msg.poi,
      name: data.msg.locationName,
      success: function () {
    
      }
    })
  },
  // 语音操作
  audioOperation(jsThis, auData) {
    innerAudioContext.src = auData.msg
    if (jsThis.playSuspend === true) {
      innerAudioContext.play()
      jsThis.playSuspend = false
      this.timingAnimation(jsThis)
    } else {
      innerAudioContext.pause()
      jsThis.playSuspend = true
      jsThis.timeImg = jsThis.imgList[2]
      clearInterval(jsThis.timerTey)
    }
    innerAudioContext.onEnded(() => {
      jsThis.playSuspend = true
      jsThis.timeImg = jsThis.imgList[2]
      clearInterval(jsThis.timerTey)
    })
  },
  // 语音播放图片
  timingAnimation(jsThis) {
    var vIl = 0
    jsThis.timerTey = setInterval(function () {
      vIl++
      jsThis.timeImg = jsThis.imgList[vIl - 1]
      if (vIl === 3) {
        vIl = 0
      }
    }, 500)
  }
}
