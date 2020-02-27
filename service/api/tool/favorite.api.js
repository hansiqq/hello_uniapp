import ala from '@/service/ala.js'

/*
 * 收藏状态，已经收藏返回true，没有收藏返回false
 * 用来判断收藏按钮的收藏转态
 * @para type：实体类型：比如商品Product,订单:Order,用户:User
 * @para id 实体Id：比如商品Id，订单Id等
 */
export function favoriteStatus(type, id) {
  var para = {
    key: type,
    entityId: id,
    user: ala.user()
  }
  if (!para.user) {
    ala.userToLoginPage()
  }

  var result = ala.httpGet('Api/Favorite/Status', para)
  return result
}

/*
 * 添加收藏
 * @para type：实体类型：比如商品Product,订单:Order,用户:User
 * @para id 实体Id：比如商品Id，订单Id等
 */
export function favoriteAdd(type, id) {
  var para = {
    key: type,
    entityId: id,
    user: ala.user()
  }
  if (!para.user) {
    ala.userToLoginPage()
  }
  var result = ala.httpPost('Api/Favorite/Add', para)
  return result
}

/*
 * 取消收藏
 * @para type：实体类型：比如商品Product,订单:Order,用户:User
 * @para id 实体Id：比如商品Id，订单Id等
 */
export function favoriteCancel(type, id) {
  var para = {
    key: type,
    entityId: id,
    user: ala.user()
  }
  if (!para.user) {
    ala.userToLoginPage()
  }
  var result = ala.httpPost('Api/Favorite/Cancel', para)
  return result
}