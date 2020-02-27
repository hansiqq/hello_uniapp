//
import styles from './styles'
import ala from '@/service/ala'
export default {
  // 链接聊天室
  startChat (jsThis) {
    // 创建聊天室链接实例
    jsThis.connection = styles.isConnect(jsThis)
    // // 获取历史消息、获取最新消息
    styles.getInformation(jsThis)
  },
  // 发送消息
  sendMessage (jsThis, msg) {
    // jsThis.connection.invoke('SendMessage', Message)
  },
  // 消息类型区分
  isMessageType (jsThis, data) {
    var para = {
      msg: JSON.parse(data.content).Content,
      from: data.user,
      to: data.target[0]
    }
    if (data.contentType === 1) {
      // 文本类型
      para.type = 'text'
    } else if (data.contentType === 4) {
      // 图片信息
      para.type = 'image'
    } else if (data.contentType === 2) {
      // 语音输入
      para.type = 'audio'
    } else if (data.contentType === 9) {
      // 短视频
      para.type = 'video'
    } else if (data.contentType === 7) {
      // 位置
      para.type = 'map'
    }
    return para
  },
  voiceRecord (jsThis, recorderManager) {
    jsThis.timer = setInterval(() => {
      jsThis.intervalTime += 0.5
      if (jsThis.intervalTime >= 0.5 && !jsThis.isRecord) {
        // 如果用户录制的时间太短,就不会去开启录音, 因为有个bug: recorderManager.stop()在短时间内开启在关闭的话,实际上他还在不停地录音,不知道您们有没有遇到过
        jsThis.voiceText = '开始录音'
        jsThis.isRecord = true
        jsThis.intervalTime = 0
        recorderManager.start({
          format: 'mp3'
        })
      }
    }, 500)
  },
  voiceConclude (jsThis, recorderManager) {
    if (jsThis.intervalTime <= 0.5) {
      ala.toastWarn('录音太短了!!!')
      return
    }
    clearInterval(jsThis.timer)
    if (jsThis.isRecord) {
      setTimeout(() => {
        recorderManager.stop()
        jsThis.isRecord = false
        jsThis.voiceText = '按住 说话'
        uni.uploadFile({
          url: ala.host() + 'api/StorageFile/upload',
          filePath: jsThis.voicePath,
          fileType: 'audio',
          name: 'data',
          success: audioJson => {
            var response = JSON.parse(audioJson.data)
            var audioUrl = ''
            if (response.path.indexOf('http') === -1) {
              var repString = response.path.replace('/wwwroot', 'wwwroot')
              audioUrl = ala.host() + repString
            }
            jsThis.$emit('change', audioUrl, 2)
          }
        })
      }, 500) // 延迟小段时间停止录音, 更好的体验
    }
  }
}
