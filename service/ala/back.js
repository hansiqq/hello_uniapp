import ala from '@/service/ala'

// 返回上一页,通过历史记录查找,找不到上一页时,返回到首页
export function back() {
  var url = backUrl()
  var historys = ala.vuexLocalGet('browse_historys')
  ala.to(url)
  historys.splice(0, 1)
  ala.vuexLocalSet('browse_historys', historys)
}

// 上一页URL
export function backUrl() {
  var historys = ala.vuexLocalGet('browse_historys')
  var url = '/pages/tabbar/index'
  var currentUrl = historys[0]
  // 登录页面后退
  if (currentUrl.indexOf('user_login') > -1) {
    url = '/pages/tabbar/index'
  }
  if (historys && historys.length > 1) {
    url = historys[1]
  }
  return url
}

// 添加历史记录
export function backAdd(url) {
  if (!url) {
    return
  }
  var historys = ala.vuexLocalGet('browse_historys')
  if (!historys) {
    historys = []
  } else {
    historys = historys.filter(r => r !== url)
  }
  historys.unshift(url)
  if (historys.length > 10) {
    historys.pop()
  }
  ala.vuexLocalSet('browse_historys', historys)
}
