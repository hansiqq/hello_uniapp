// eslint-disable-next-line
/* eslint-disable */
import ala from '@/service/ala'
// 处理重复代码
export default {
  // 定义消息格式
  getPara(jsThis, data) {
    var Target = []
    Target.push(String(jsThis.targetId))
    var para = {
      content: JSON.stringify({
        Content: data.content
      }),
      target: Target,
      user: {
        Id: jsThis.userId,
        Avator: '',
        NickName: ''
      },
      type: 1, // 单聊
      contentType: data.contType, // 内容类型
      connection: null
    }
    return para
  },
  // 链接设置,区分h5端和小程序端
  isConnect(jsThis) {
    var signalR
    if (ala.client() === 'WapH5') {
      signalR = require('@aspnet/signalr')
      var connection = new signalR.HubConnectionBuilder().withUrl(ala.host() + `chat?userid=${jsThis.userId}&tagerid=${jsThis.targetId}`).build()
      connection.start().then(() => {})
      return connection
    } else {
      signalR = require('./wx.singlar')
      // eslint-disable-next-line new-cap
      var _singlar = new signalR.signalR()
      _singlar.connection(`wss://192.168.0.125:5000/chat?userid=${jsThis.userId}&tagerid=${jsThis.targetId}`)
      return _singlar
    }
  },
  // 获取历史信息
  getInformation(jsThis) {
    if (ala.client() === 'WapH5') {
      jsThis.connection.on('receiveMessage', res => {
        if (res) {
          var data = []
          res.forEach(element => {
            data.push(this.isMessageType(jsThis, element))
          })
          if (jsThis.viewModel && jsThis.viewModel.length > 0) {
            jsThis.viewModel = [...jsThis.viewModel, ...data]
          } else {
            jsThis.viewModel = data
          }
        }
      })
    } else {
      jsThis.connection.on('send', res => {
        if (res.errMsg === 'sendSocketMessage:ok') {
          jsThis.viewModel.push(this.isMessageType(jsThis, jsThis.pageData))
        }
      })
      jsThis.connection.on('receive', res => {})
    }
  },
  // 消息类型区分
  isMessageType(jsThis, data) {
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
  }
}
