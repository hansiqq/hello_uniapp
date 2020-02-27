import indexBotton from './json/index_bottom.json'
import ala from '@/service/ala.js'

// 首页商品底部专区
export async function shopareaIndexBottom() {
  var para = {
    list: indexBotton
  }
  var result = await ala.httpPost('api/ApiShopArea/IndexBotton', para)
  return result
}
