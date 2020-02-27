import ala from '@/service/ala.js'

/*
 *获取首页列表
 */
export async function shopVideoInteractList() {
  var response = await ala.httpGet('Api/VideoInteract/GetVideoInteractList')
  return response
}

/*
 * 获取详情
 */
export async function shopVideoInteractShow(id) {
  var para = {
    Id: id
  }
  var response = await ala.httpGet('Api/VideoInteract/VideoInteractShow', para)
  return response
}

/*
 * 列表页
 */
export async function shopVideoInteractPage (pageIndex, query) {
  if (!pageIndex) {
    pageIndex = 1
  }
  var para = {
    pageIndex: pageIndex
  }
  if (query) {
    para = {
      ...para,
      ...query
    }
  }
  var response = await ala.httpGet('Api/VideoInteract/GetVideoInteractPage', para)
  return response
}