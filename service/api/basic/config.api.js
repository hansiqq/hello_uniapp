import ala from '@/service/ala.js'
import config from '@/service/config'

// 获取logo

export async function configLogo() {
  var webSiteConfig = await this.configGet('webSiteConfig')
  if (webSiteConfig) {
    var url = config.host + webSiteConfig.logo
    url = ala.urlImage(url)
    return url
  }
}

/// 获取配置信息
export async function configGet(name) {
  var para = {
    parameter: name
  }
  var response = await ala.httpGet('api/AutoConfig/GetAutoConfig', para)
  return response
}

/// 获取多条数据
export async function configList(name) {
  var para = {
    type: name
  }
  var response = await ala.httpGet('api/AutoConfig/GetAutoConfigList', para)
  return response
}
/// 获取多条数据
export async function configKeyValue(name) {
  var para = {
    type: name
  }
  var response = await ala.httpGet('api/AutoConfig/GetKeyValuesByAutoConfig', para)
  return response
}
