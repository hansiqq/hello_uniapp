import ala from '@/service/ala'
export default {
  async appWxPay(jsThis, paras, orderId) {
    var response = await ala.httpPost('api/pay/WechatAppPay', paras)
    if (response) {
      var orderInfo = response
      uni.requestPayment({
        provider: 'wxpay',
        orderInfo: orderInfo, // 微信、支付宝订单数据
        success: function(res) {
          ala.to('/pages/index?path=order_show&id=' + orderId)
        },
        fail: function() {
          ala.toastWarn('用户取消或者订单过期')
        }
      })
    }
  },
  async appAliPay(jsThis, data, orderId) {
    var orderInfo = data.message
    uni.requestPayment({
      provider: 'alipay',
      orderInfo: orderInfo, // 微信、支付宝订单数据
      success: function(res) {
        ala.to('/pages/index?path=order_show&id=' + orderId)
      },
      fail: function() {
        ala.toastWarn('用户取消或者订单过期')
      }
    })
  }
}
