import ala from '@/service/ala.js'

export async function materailProduct(classId, pageIndex = 0) {
  var para = {
    pageIndex: pageIndex,
    classId: classId,
    userId: ala.userId()
  }
  var result = await ala.httpGet('Api/Material/ProductPage', para)
  return result
}
