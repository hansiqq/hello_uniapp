import ala from '@/service/ala.js'
/*
 * 商学院店主学习，首页分类与推荐专栏
 */

export async function courseColumnClassRecommended() {
  var response = ala.httpGet('Api/CourseColumn/CourseColumnClassRecommended')
  return response
}

/*
 * 专栏列表
 */

export async function courseColumnPage(teachingMethods, courseColumnGrade, pageIndex) {
  var para = {
    TeachingMethods: teachingMethods,
    CourseColumnGrade: courseColumnGrade
  }
  var apiUrl = 'Api/CourseColumn/QueryPageList'
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
}