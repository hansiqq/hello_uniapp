import ala from '@/service/ala'

// 接口一：我的学习
// 课程详情
export async function learnMy() {
  var response = ala.httpGet('Api/LearnRecord/LearnMy')
  return response
}
