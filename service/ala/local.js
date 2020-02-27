import ala from '@/service/ala'
const allKeys = 'localStorage_allKeys'

// 设置本地缓存
export function localSet(name, data) {
  if (!data || !name) {
    return
  }
  uni.setStorageSync(name, data)
  setKeys(name)
}

/*
 * 先从缓存中请求数据，如果没有则从api中请求\
 *  @param name 缓存名称，必须唯一
 *  @param apiUrl api请求接口
 */
export async function localHttp(name, apiUrl) {
  if (!name || !apiUrl) {
    return
  }
  var data = ala.vuexLocalGet(name)
  if (data) {
    return data
  }
  if (!data) {
    var result = await ala.httpGet(apiUrl)
    ala.vuexLocalSet(name, result)
    return result
  }
}

// 获取本地缓存数据
export function localGet(name) {
  if (!name) return
  var data = uni.getStorageSync(name)
  var data
  if (data) {
    if (data !== undefined && data !== 'undefined') {
      return data
    }
  }
  return undefined
}

// 删除本地缓存
export function localRemove(name) {
  if (!name) return
  uni.removeStorageSync(name)
}

// 本地缓存所有键
export function localClear() {
  uni.showModal({
    title: '清空缓存',
    content: '您是否确定要清空缓存?',
    success: function(res) {
      if (res.confirm) {
        var keys = localGet(allKeys)
        if (keys) {
          keys.forEach(element => {
            localRemove(element)
          })
        }
        localRemove(allKeys)
        ala.toastSuccess('缓存清理成功')
      }
    }
  })
}

// 保存所有的Keys
function setKeys(name) {
  if (name === 'tenant' || name.toLowerCase().indexOf('user_') === 0) {
    // 租户标识不能删除,和登陆用户不删除
    return
  }
  var keys = localGet(allKeys)
  if (keys === undefined || keys === null) {
    keys = []
  }
  if (keys.indexOf(name) < 0) {
    keys.push(name)
    uni.setStorageSync(allKeys, keys)
  }
}
