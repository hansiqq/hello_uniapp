<template>
  <view class="store-share" :style="{ width: screenWidth + 'px', height: screenHeight + 'px' }">
    <view class="store-share-title">
      <shareTitle @shareCopy="shareCopy"></shareTitle>
      <shareDetail></shareDetail>
    </view>
    <shareSwiper @getQrcode="getQrcode"></shareSwiper>
    <shareButton @clickShare="clickShare"></shareButton>
    <shareShow ref="shareShow"></shareShow>
    <x-qrcode @showImage="showImage" ref="xQrcode"></x-qrcode>
  </view>
</template>

<script>
import shareTitle from './widgets/title'
import shareDetail from './widgets/detail'
import shareSwiper from './widgets/swiper'
import shareButton from './widgets/button'
import shareShow from './widgets/show'
import ala from '@/service/ala'
export default {
  components: {
    shareTitle,
    shareDetail,
    shareSwiper,
    shareButton,
    shareShow
  },
  data() {
    return {
      screenWidth: 0,
      screenHeight: 0,
      qrcodeList: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.screenHeight = ala.screenHeight()
      this.screenWidth = ala.screenWidth()
    },
    async clickShare(type) {
      if (type === 2) {
        this.$refs.xQrcode.init(this.qrcodeList)
      } else {
        this.$refs.shareShow.open(type, this.qrcodeList.swiperModel)
      }
    },
    // 分享图片
    showImage(data) {
      var para = {
        imageUrl: data.tempFilePath
      }
      this.$refs.shareShow.open(2, para)
    },
    // 获取二维码信息
    getQrcode(data) {
      this.qrcodeList = data
    },
    shareCopy() {
      uni.getClipboardData({
        complete: res => {
          var para = {
            text: res.data
          }
          this.$refs.shareShow.open(1, para)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.store-share {
  position: fixed;
  background-color: #fafafc;
  &-title {
    padding: 10px 20px;
  }
}
</style>
