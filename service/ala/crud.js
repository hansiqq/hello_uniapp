import ala from '@/service/ala'

// 根据Url中的参数Id，获取视图
// 使用动态 动态网址 Api/{{表名}}/ViewById
export async function getView(intance, apiUrl) {
  var para = {
    id: intance.$route.query.id !== undefined ? intance.$route.query.id : 0
  }
  var response = await ala.httpGet(apiUrl, para)
  return response
}

// 从widget中获取数据
export async function widget(intance, type, object) {
  var para = {
    type: type,
    json: JSON.stringify(object)
  }
  var response = await ala.httpGet('api/Widget/Get', para)
  return response
}

// 保存
// 动态保存接口： Api/{{表名}}/QuerySave
export async function save(intance, apiUrl, viewModel) {
  var para = {
    ...viewModel
  }
  var response = await ala.httpPost(apiUrl, para)
  return response
}

// 提示，成功提示正确信息，获取显示错误信息
export function message(response) {
  if (response.status === 1) {
    ala.to('/pages/message')
  } else {
    ala.to('/pages/message')
  }
}
