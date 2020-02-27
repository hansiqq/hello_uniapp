import config from '@/service/config'
import ala from '@/service/ala'

// 当前租户
export function tenant() {
  if (config.isTenant === true) {
    var tenant = this.vuexLocalGet('tenant')
    return tenant
  } else {
    return ''
  }
}
