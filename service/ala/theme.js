import ala from '@/service/ala'

// 获取当前页面信息
export async function themePage(option, allPages) {
  var path = ala.routePath(option)
  var pageInfo = await getPageInfo(path, allPages)
  var widgets = []
  if (pageInfo !== undefined && pageInfo !== null && pageInfo.widgets) {
    for (var i = 0; i < pageInfo.widgets.length; i++) {
      var widgetItem = pageInfo.widgets[i]

      widgetItem.route = option
      widgetItem.client = ala.client()
      widgets.push(widgetItem)
    }
    pageInfo.widgets = widgets
  }
  pageInfo = filerPageInfo(pageInfo)
  return pageInfo
}

// 模块信息
export async function themeWidget(widget) {
  var parameter = {
    apiUrl: '',
    value: null
  }
  if (widget !== null && widget !== undefined) {
    parameter.apiUrl = widget.apiUrl
    parameter.value = widget.value
  }
  return parameter
}

// 过滤页面信息
function filerPageInfo(pageInfo) {
  if (pageInfo) {
    pageInfo.widgets = filterWidgets(pageInfo.widgets)
    var setting = pageInfo.setting
    // 登录信息判断
    if (setting.isLogin !== false) {
      if (!ala.userIsLogin()) {
        ala.userCheckLogin()
        return false
      } else {
        ala.userCheckLogin()
      }
    }
  }
  return pageInfo
}

// 处理widgets
function filterWidgets(widgets) {
  if (widgets === null) {
    return null
  }
  widgets.forEach(element => {
    element.border = null
    element.borderClass = null
    if (!ala.strIsEmpty(element.style)) {
      if (!ala.strIsEmpty(element.style.border)) {
        var styleBorder = JSON.parse(element.style.border)
        element.border = styleBorder
        // element.borderClass = 'widget_border ' + styleBorder.name + ' '
        element.borderClass = styleBorder.class
        if (!ala.strIsEmpty(styleBorder.colorName)) {
          element.borderClass += styleBorder.colorName + ' '
        }
      }
    }
    if (ala.strIsEmpty(element.layout)) {
      element.layout = null
    } else {
      if (!ala.strIsEmpty(element.value)) {
        var layout = JSON.parse(element.value)
        if (!ala.strIsEmpty(layout.options)) {
          element.options = JSON.parse(layout.options)
        }
        element.options = JSON.parse(layout.options)
        element.columns = layout.columns
        if (!ala.strIsEmpty(element.columns)) {
          element.columns.forEach(col => {
            col.option = JSON.parse(col.option)
            col.widgets = this.filterWidgets(col.widgets)
          })
        } else {
          element.columns = []
        }
        element.value = null
      }
    }
    if (element.value !== null) {
      try {
        element.value = JSON.parse(element.value)
      } catch (err) {}
    }
  })
  return widgets
}

// 当前访问的页面
async function getPageInfo(path, allPageInfo) {
  if (!allPageInfo) {
    allPageInfo = await themeAllPage()
  }
  var findPageInfo = null
  if (allPageInfo !== undefined && allPageInfo != null) {
    for (var i = 0; i < allPageInfo.pageList.length; i++) {
      var element = allPageInfo.pageList[i]
      if (element.path === path) {
        findPageInfo = element
        break
      }
    }
  }
  return findPageInfo
}
// 所有页面
export async function themeAllPage() {
  var para = {
    clientType: 'WapH5',
    path: '/index'
  }
  if (ala.baseConfig().themeId) {
    para = {
      ...para,
      themeId: ala.baseConfig().themeId
    }
  }
  var allPageCacheKey = 'init_allPageInfo_' + ala.baseConfig().version
  var allPageInfo = ala.localGet(allPageCacheKey)
  var isRequest = true // 是否请求
  if (allPageInfo) {
    let timestamp = Math.round(new Date().getTime() / 1000)
    if (allPageInfo.lastUpdate > timestamp) {
      isRequest = false
    }
  }
  if (isRequest) {
    var allPageInfo = await ala.httpGet('Api/Theme/GetAllClientPages', para)
    ala.vuexSet(allPageCacheKey, allPageInfo)
    ala.localSet(allPageCacheKey, allPageInfo)
  }
  return allPageInfo
}
