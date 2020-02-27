// 此文件为ios和安卓app相关的功能，不支持h5微信小程序
// App图标加载
import ala from '@/service/ala.js'

// 图标加载
export function appIcon() {
  // #ifdef APP-NVUE
  var domModule = weex.requireModule('dom')
  domModule.addRule('fontFace', {
    fontFamily: 'iconfont',
    src: "url('../../static/iconfont/font/iconfount-5590604fc6.ttf')"
  })
  // #endif
}

// App 版本更新，可参考uni-app官方的文章demo来实现
export function appUpdate() {
  // #ifdef APP-NVUE
  plus.screen.lockOrientation('portrait-primary')
  var version
  plus.runtime.getProperty(plus.runtime.appid, async function(wgtinfo) {
    version = wgtinfo.version
    let par = {
      AppClient: ala.payType(),
      Version: version
    }
    var response = await ala.httpGet('Api/AppVersion/AppCheckVersion', par)
    if (response) {
      uni.showModal({
        title: '发现新版本',
        content: response.note,
        success: function(res) {
          if (res.confirm) {
            // var url = encodeURI(response.url)
            // plus.runtime.openURL(url, function (res) {})
          } else if (res.cancel) {
          }
        }
      })
    }
  })
  // #endif
}
