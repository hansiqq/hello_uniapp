import ala from '@/service/ala'
export default {
  // 登录聊天室
  open(jsThis) {
    var para = {
      user: 'zhongjian',
      pwd: '111111',
      appKey: jsThis.$im.config.appkey,
      apiUrl: jsThis.$im.config.apiURL
    }
    ala.vuexLocalSet('chat_room_token', para)
    jsThis.$im.conn.open(para)
  },
  // 获取历史聊天记录
  fetchHistoryMessages(jsThis) {
    jsThis.$im.conn.fetchHistoryMessages({
      queue: 'zhongjian1',
      isGroup: false,
      success: data => {
        data.forEach(element => {
          var para = {
            to: element.to,
            from: element.from,
            msg: element.data,
            id: element.id,
            type: element.type,
            time: element.time
          }
          jsThis.viewModel.push(para)
        })
      }
    })
  },
  // 获取页面节点信息
  getQuery(jsThis, type) {
    let selectorQuery
    if (ala.client() !== 'WapH5') {
      selectorQuery = uni.createSelectorQuery()
    } else {
      selectorQuery = uni.createSelectorQuery().in(jsThis)
    }
    selectorQuery.selectAll(type).boundingClientRect()
    return selectorQuery.selectViewport().scrollOffset()
  }
}
