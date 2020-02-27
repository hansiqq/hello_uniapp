import ala from '@/service/ala'
export default {
  // 获取元素节点
  getQuery(jsThis, type) {
    let selectorQuery
    if (ala.client() !== 'WapH5') {
      selectorQuery = uni.createSelectorQuery()
    } else {
      selectorQuery = uni.createSelectorQuery().in(jsThis)
    }
    selectorQuery.selectAll(type).boundingClientRect()
    return selectorQuery.selectViewport().scrollOffset()
  }
}
