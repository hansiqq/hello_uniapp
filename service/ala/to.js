import ala from '@/service/ala'
/*
 * 页面路由跳转
 */
export function to(url) {
  if (url === '/' || url === '/index' || url === 'index') {
    toHome()
  } else {
    url = convertUrl(url)
    if (url.indexOf('pages/tabbar') > -1) {
      uni.switchTab({
        url: url
      })
    } else {
      uni.navigateTo({
        url: url
      })
    }
  }
}

/*
 *  跳转到首页
 */
export function toHome() {
  uni.switchTab({
    url: '/pages/tabbar/index'
  })
}

// url在不同的终端转换
function convertUrl(url) {
  // 查找实际页面
  var regPages = realPages()
  var path = ala.strSubStart(url, '?')
  if (path) {
    for (var i = 0; i < regPages.length; i++) {
      var element = regPages[i]
      if (element.indexOf(path) > -1) {
        if (url.indexOf('pages/') === -1) {
          url = '/pages' + url
        }
        return url
      }
    }
  }
  if (url.indexOf('/pages/') > -1) {
    return url
  }
  if (url.indexOf('pages/') > -1) {
    return '/' + url
  }
  if (url.indexOf('/tabbar') > -1 || url.indexOf('/pages/index') > -1) {
    return url
  } else {
    var showSplit
    var toPagesUrl = url
    if (url.indexOf('?') > -1) {
      toPagesUrl = url.split('?')[0]
      showSplit = url.split('?')[1]
    }
    var linkSplit = toPagesUrl.split('/')
    url = '/pages/index?path='
    if (linkSplit.length === 2) {
      url += linkSplit[1]
    } else if (linkSplit.length === 3) {
      url += linkSplit[1] + '_' + linkSplit[2]
    } else if (linkSplit.length === 4) {
      url += linkSplit[1] + '_' + linkSplit[2] + '_' + linkSplit[3]
    }
    if (showSplit) {
      url += `&${showSplit}`
    }
    return url
  }
}

/*
 * 实际存在的页面,在pages中有注册,需要手动维护
 */

function realPages() {
  var pages = ['/pages/user/login', '/pages/user/reg', '/pages/product/show', '/pages/address/index']
  return pages
}
