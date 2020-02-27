import ala from '@/service/ala.js'

/*
 *  根据类型获取所有的父级分类或标签
 *  实例：type=ProductClassRelation
 */
export async function relationFather(type) {}

/*
 *  根据类型获取所有的分类或标签
 *  实例：type=ProductClassRelation
 */
export async function relationGet(type) {
  if (!type) {
    return
  }
  var allTypes = await relationAll()
  var types = allTypes.filter(r => r.type.indexOf(type) !== -1)
  types.sort(function(a, b) {
    return a.sortOrder - b.sortOrder
  })
  return types
}

/*
 * 所有级联和标签数据,请求前提前缓存
 */

export async function relationAll() {
  var result = await ala.localHttp('init_relation_all', 'Api/Relation/QueryList')
  return result
}
