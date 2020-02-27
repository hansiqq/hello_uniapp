import ala from '@/service/ala'

// 完整路径
export function routeFullPath() {
  var pages = getCurrentPages()
  var fullPath
  if (ala.client() === 'WeChatLite') {
    fullPath = pages[pages.length - 1].route
    var path = parseParams(pages[pages.length - 1].options)
    if (path) {
      fullPath = `${pages[pages.length - 1].route}?${path}`
    }
  } else {
    fullPath = pages[0].$route.fullPath
  }
  return fullPath
}

// 实际页面路径
export function routePath(option) {
  var path = '/index'
  if (!option) {
    return path
  }
  if (Array.isArray(option) === true) {
    path = option[0].path
  } else {
    path = option.path
  }
  if (!path) {
    path = '/index'
  }

  path = path.replace('_', '/').replace('_', '/')
  if (path.substr(0, 1) !== '/') {
    path = '/' + path
  }
  if (path === '/') {
    path = '/index'
  }

  path = path
    .replace('pages/', '')
    .replace('/pages', '')
    .replace('/views', '')
    .replace('views/', '')
  var index = path.indexOf('?')
  if (index > 0) {
    path = path.substr(0, index)
  }
  return path
}

// 获取元素节点
function getQuery(jsThis, type) {
  let selectorQuery
  if (ala.client() !== 'WapH5') {
    selectorQuery = uni.createSelectorQuery()
  } else {
    selectorQuery = uni.createSelectorQuery().in(jsThis)
  }
  selectorQuery.selectAll(type).boundingClientRect()
  return selectorQuery.selectViewport().scrollOffset()
}

// 处理路由拼接
function parseParams(data) {
  try {
    var tempArr = []
    for (var i in data) {
      var key = encodeURIComponent(i)
      var value = encodeURIComponent(data[i])
      tempArr.push(key + '=' + value)
    }
    var urlParamsStr = tempArr.join('&')
    return urlParamsStr
  } catch (err) {
    return null
  }
}
