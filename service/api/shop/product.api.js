import ala from '@/service/ala.js'

/*
 *根据id获取商品详情
 */
export async function productShow(id) {
  var para = {
    id: id
  }
  var response = await ala.httpGet('Api/Product/Show', para)
  return response
}
