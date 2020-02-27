import ala from '@/service/ala'
// 获取URL中的参数

export default function urlQuery(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  } else {
    return ''
  }
}

// 获取URL中的ID
export function urlId(route) {
  if (route !== undefined && route.id !== undefined) {
    return route.id
  } else {
    return 0
  }
}

// 获取URL中的类
export function urlType(route) {
  if (route) {
    if (route.Type !== undefined) {
      return route.Type
    }
    if (route.type !== undefined) {
      return route.type
    }
  }
}

// 图片地址处理
export function urlImage(src) {
  if (src) {
    if (src.indexOf('://') === -1) {
      src = ala.host + src
      src = src.replace('//wwwroot', '/wwwroot')
    } else {
      src = src.replace('//wwwroot', '/wwwroot')
    }
  }
  return src
}

// 将URL转换成对象 结果格式：test=22&wewe=qqw
export function urlToParams(data) {
  if (!data || !data.query) {
    return
  }
  var tempArr = []
  for (var i in data.query) {
    var key = i
    var value = data.query[i]
    // encodeURIComponent(data.query[i])
    tempArr.push(key + '=' + value)
  }
  var urlParamsStr = tempArr.join('&')
  if (urlParamsStr) {
    urlParamsStr = '?' + urlParamsStr
  }
  return urlParamsStr
}

// 将url参数解析为一个对象
export function urlToObject(route) {
  if (ala.client() === 'WapH5' || ala.client() === 'WeChat') {
    var str = route.fullPath
    var index = str.indexOf('?', 0)
    str = str.substring(index + 1, str.length)
    var result = {}
    var temp = str.split('&')
    for (var i = 0; i < temp.length; i++) {
      var temp2 = temp[i].split('=')
      result[temp2[0]] = temp2[1]
    }
  } else {
    var result = {}
    for (var i in route) {
      result[i] = route[i]
    }
  }
  return result
}
