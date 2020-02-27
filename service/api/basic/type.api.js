import api from '@/service/ala.js'

// 获取类型的keyvalues对象 // 优先从Url中获取数据
export async function typeKeyValues(type, apiUrl) {
  if (apiUrl) {
    var result = await api.httpGet(apiUrl)
    return result
  } else {
    var para = {
      type: type
    }
    result = await api.httpGet('api/Type/GetKeyValue', para)
    return result
  }
}
/*
 * 导出枚举、AutoConfig、IAutoTable、IAutoForm,分类、标签等的的数据
 */
export async function typeAllKeyValues () {
  
}
