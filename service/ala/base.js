import ala from '@/service/ala'
import config from '@/service/config'
export let host = config.host

// 判断是生成环境还是开发环境
export function isBuild() {
  if (process.env.NODE_ENV === 'development') {
    return false
  } else {
    return true
  }
}

// 返回基本配置列表
export function baseConfig() {
  return config
}

// 获取元素节点
export function getQuery(jsThis, type) {
  let selectorQuery = ''
  // #ifdef H5
  selectorQuery = uni.createSelectorQuery().in(jsThis)
  // #endif
  // #ifndef H5
  selectorQuery = uni.createSelectorQuery()
  // #endif
  selectorQuery.selectAll(type).boundingClientRect()
  return selectorQuery.selectViewport().scrollOffset()
}


// 弹窗
export function showModal(title, content) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: title,
      content: content,
      success: res => {
        if (res.confirm) {
          resolve(true)
        } else {
          resolve(false)
        }
      }
    })
  })
}
