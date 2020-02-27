import ala from '@/service/ala'
import api from '@/service/api'

/*
 * 初始化系统加载数据
 */

export async function init() {
  await ala.themeAllPage()
  await api.enumAll()
  await api.addressAll()
  await api.addressCityIndex()
  await api.typeAllKeyValues() // 所有枚举autoConfig、分类的Keyvalue
  await api.relationAll() // 所有级联和分类数据
}
