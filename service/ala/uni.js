/*
 * 根据Id获取subNvue,在底层进行封装，减少条件编译代码
 * 只支持app
 * 功能和 uni.getSubNVueById一样
 */

export function uniSubNVue(id) {
  // #ifdef APP-NVUE
  return uni.getSubNVueById(id)
  // #endif
}

export function test() {
  var test = {
    name: 'test',
    id: 'sss'
  }
  return test
}
