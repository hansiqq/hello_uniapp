import ala from '@/service/ala'
/*  分享图文
 *  scene:场景传入 shareScene中的值:weixin、wexinFriend、qq、weibo、copy、save、等
 *  title: 标题
 *  summary: 简介
 *  url:图片地址、音频地址、视频地址
 *  href: 分享链接
 */
export function share(data, title, summary, url, href) {
  uni.share({
    provider: data.provider,
    scene: data.scene,
    type: 0,
    href: href,
    title: title,
    summary: summary,
    imageUrl: url
  })
}

/*  分享文字
 *  scene:场景传入 shareScene中的值:weixin、wexinFriend、qq、weibo等
 *  text: 文本文字
 */
export function shareText(data, text) {
  uni.share({
    provider: data.provider,
    scene: data.scene,
    type: 1,
    summary: text,
    success: function(res) {},
    fail: function(err) {
      ala.toast(err)
    }
  })
}

/*  分享图片
 *  scene:场景传入 shareScene中的值:weixin、wexinFriend、qq、weibo等
 *  imageUrl: 图片地址，可以是远程地址
 */
export function shareImage(data, imageUrl) {
  uni.share({
    provider: data.provider,
    scene: data.scene,
    type: 2,
    imageUrl: imageUrl,
    success: function(res) {},
    fail: function(err) {
      ala.toast(err)
    }
  })
}

/*
 * 获取分享产场景
 */
function getScene(scene) {
  var shareScene = shareScene2[scene]
  // var shareScene = 'weixin'
  if (!shareScene) {
    ala.toast('请输入正确分享场景,场景值：weixin、wexinFriend、qq、weibo等')
  }
  return shareScene
}

/*
 * 分享复制
 *
 */
export function shareCopy(text) {
  uni.setClipboardData({
    data: text,
    complete() {
      uni.showToast({
        title: '已复制到剪贴板'
      })
    }
  })
}


/**
 * 下载图片到本地
 * 
 * */ 
export function shareDown(url) {
	uni.downloadFile({
	    url: url,
	    success: (res) => {
	        if (res.statusCode === 200) {
				uni.saveImageToPhotosAlbum({
					filePath: res.tempFilePath,
					success: res => {
						uni.showToast({
							title: '保存图片成功'
						})
					}
				})
	        }
	    }
	})
}

/*
 * 分享更多
 *
 */
function shareMore() {}
// 分享场景
export let shareScene2 = {
  weixin: {
    name: '微信好友',
    provider: 'weixin',
    scene: 'WXSceneSession',
    icon: 'icon-weixin'
  },
  weixinFriend: {
    name: '微信朋友圈',
    provider: 'weixin',
    scene: 'WXSenceTimeline',
    icon: 'icon-weixin-friend'
  },
  qq: {
    name: 'QQ好友',
    provider: 'qq',
    scene: 'qq',
    icon: 'icon-qq'
  },
  weibo: {
    name: '微博',
    provider: 'sinaweibo',
    scene: 'sinaweibo',
    icon: 'icon-weibo'
  },
  save: {
    name: '保存下载',
    provider: 'save',
    scene: 'save',
    icon: 'icon-save'
  },
  copy: {
    name: '复制',
    provider: 'copy',
    scene: 'copy',
    icon: 'icon-copy'
  },
  more: {
    name: '更多',
    provider: 'more',
    scene: 'more',
    icon: 'icon-more'
  }
}
