import ala from '@/service/ala.js'

/* 评论 某个实体
 * type:类型 比如produt, order等
 *  content: 评论内容
 *  id: 当前实体的Id，比如商品Id，素材Id等
 */
export async function comment(type, id, content) {
  var para = {
    entityId: id,
    type: type,
    content: content,
    user: ala.user()
  }
  if (!para.user) {
    ala.userToLoginPage()
  }
  var result = await ala.httpPost('Api/Comments/Comment', para)
  return result
}

/*
 *评论回复
 *commentid:评论id
 *content:回复内容
 */
export async function commentReply(type, commentid, content) {
  var para = {
    commentId: commentid,
    content: content,
    user: ala.user()
  }
  if (!para.user) {
    ala.userToLoginPage()
  }
  var response = await ala.httpPost('Api/Comments/CommentReply', para)
  return response
}

/*
 *id:点赞的评论id
 * isup:true 点赞,false 取消点赞
 */
export async function commentUp(type, id, isup) {
  var para = {
    entity: id,
    isUp: isup,
    user: ala.user()
  }
  if (!para.user()) {
    ala.userToLoginPage()
  }
  var response = await ala.httpPost('Api/Comments/CommentUp', para)
  return response
}

/**
 * id:点赞的回复id
 * isup:true 点赞 false 取消点赞
 */
export async function commentReplyUp(type, id, isup) {
  var para = {
    entity: type,
    id,
    isUp: isup,
    user: ala.user()
  }
  if (!para.user) {
    ala.userToLoginPage()
  }
  var response = await ala.httpPost('Api/Comments/CommentReplyUp', para)
  return response
}
