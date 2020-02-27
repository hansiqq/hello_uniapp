import ala from '@/service/ala'
// 处理兼容性问题
export default {
  // 屏幕宽度兼容性
  screenWidth() {
    if (ala.client() === 'WapH5') {
      return 50
    } else {
      return -50
    }
  }
}
