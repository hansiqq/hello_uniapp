import ala from '@/service/ala'
export default {
  // 获取元素节点
  getQuery(jsThis, type) {
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
}
