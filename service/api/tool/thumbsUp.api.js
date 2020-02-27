import ala from '@/service/ala.js'

/*
 * 点赞状态，已经点赞返回true，没有点赞返回false
 * 用来判断点赞按钮的点赞转态
 * @para type：实体类型：比如商品Product,订单:Order,用户:User
 * @para id 实体Id：比如商品Id，订单Id等
 */
export function thumbsUpStatus(type, id) {
  var para = {
    type: type,
    entityId: id
  }
  var result = ala.httpGet('Api/thumbsUp/Status', para)
  return result
}

/*
 * 添加点赞
 * @para type：实体类型：比如商品Product,订单:Order,用户:User
 * @para id 实体Id：比如商品Id，订单Id等
 */
export function thumbsUpAdd(type, id) {
  var para = {
    type: type,
    entityId: id
  }
  var result = ala.httpPost('Api/thumbsUp/Add', para)
  return result
}

/*
 * 添加点赞
 * @para type：实体类型：比如商品Product,订单:Order,用户:User
 * @para id 实体Id：比如商品Id，订单Id等
 */
export function thumbsUpCancel(type, id) {
  var para = {
    type: type,
    entityId: id
  }
  var result = ala.httpPost('Api/thumbsUp/Cancel', para)
  return result
}
