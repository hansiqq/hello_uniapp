import ala from '@/service/ala'

/*
 * 根据实体类型和查询参数获取分页信息
 * type:实体类。比如User，Product，Order和后台数据库对应
 * para查询参数{
 *  userId:1,
 *  name:'%c名称'
 * }
 * pageIndex:当前页码，单独传入进来
 */
export async function entityPageList(type, pageIndex, para) {
  var apiUrl = `Api/${type}/QueryPageList`
  var data = {
    pageIndex: pageIndex
  }
  if (para) {
    data = {
      ...data,
      ...para
    }
  }
  var result = ala.httpGet(apiUrl, data)
  return result
}

/* 实体list查询
 * @param {*} type：实体类型
 * @param {*} para ：查询参数
 */
export async function entityList(type, para) {
  var apiUrl = `Api/${type}/QueryList`
  var result = ala.httpGet(apiUrl, para)
  return result
}

/*
 * 根据实体类型和Id获取实体对象，对象不存在是为空
 * type:实体类。比如User，Product，Order和后台数据库对应
 */
export async function entityById(type, id) {
  var apiUrl = `Api/${type}/QueryById`
  var data = {
    id: id
  }
  var result = ala.httpGet(apiUrl, data)
  return result
}

/*
 * 根据实体类型和Id获取实体对象，获取视图永远不会为空
 * type:实体类。比如User，Product，Order和后台数据库对应
 */
export async function entityViewById(type, id) {
  var apiUrl = `Api/${type}/QueryById`
  var data = {
    id: id
  }
  var result = ala.httpGet(apiUrl, data)
  return result
}