<template>
  <view class="swiper-item-6" :style="{ width: screenWidth + 'px;' }">
    <view class="swiper-item-6-cont">
      <swiper class="swiper-item-6-cont-ul" :autoplay="true" :circular="true" :indicator-dots="true" indicator-active-color="#c91230" indicator-color="#ebedf0" :style="{ height: 160 + 'px' }">
        <swiper-item v-for="(item, index) in swiperList" :key="index">
          <view :title="item.name" @click="goLinks(item.url.value)">
            <image :src="item.image" :alt="item.intro" class="swiper-item-6-image" :style="{ width: screenWidth - 20 + 'px' }" />
          </view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
import base from '@/service/ala.js'
export default {
  data() {
    return {
      screenWidth: '',
      swiperList: [
        {
          image: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1391960522,3944688945&fm=15&gp=0.jpg'
        },
        {
          image: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=359648438,4114288232&fm=26&gp=0.jpg'
        },
        {
          image: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1391960522,3944688945&fm=15&gp=0.jpg'
        },
        {
          image: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1391960522,3944688945&fm=15&gp=0.jpg'
        },
        {
          image: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1391960522,3944688945&fm=15&gp=0.jpg'
        }
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.screenWidth = base.screenWidth()
    }
  }
}
</script>

<style lang="scss" scoped>

// @media screen and (max-width: 350px) {
//     .swiper-item-6 {
//         position: relative;
// 		top: -10px;
//     }
// }

.swiper-item-6 {
  height: 288rpx;
  margin-top: -10px;
  padding: 0 28rpx;
  // background-image: linear-gradient(to right, #F62E1B, #D42965);
}

.swiper-item-6-cont-ul {
  height: 288rpx;
  //padding: 0upx 28upx 0upx;
}

.swiper-item-6-image {
  //height: 144px;
  border-radius: 5px;
}
</style>
