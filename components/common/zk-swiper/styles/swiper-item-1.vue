<template>
  <view class="swiper-item-1">
    <swiper :autoplay="false" :circular="true" :indicator-dots="true" indicator-active-color="#c91230" indicator-color="#ebedf0" :style="{ height: swiperHeight + 'px' }">
      <swiper-item v-for="(item, index) in swiperModel.swiperList" :key="index">
        <view :title="item.name" @click="goLinks(item.url.value)">
          <img :src="item.image" :alt="item.intro" :style="{ height: swiperHeight + 'px' }" class="bgImg" />
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
 import ala from '@/service/ala'
  export default {
    data () {
      return {
        async: false,
        widgetModel: '',
        swiperHeight: 150,
        windowWidth: '',
        swiperList: null
      }
    },
    props: {
      swiperModel: {},
      height: {
        type: Number,
        default: 150
      }
    },
    onLoad () {
      this.init()
    },
    methods: {

      goLinks (url) {
        ala.to(url)
      }
    },
    watch: {
      widget: 'watchWidget'
    }
  }
</script>
<style lang="scss" scoped >
	// #ifndef APP-PLUS  
  // app-plus-css
 

  .uni-swiper-item {
    padding-top: 0px !important;
  }
  .uni-swiper {
    height: 180px;
  }
  .uni-swiper .uni-swiper-dot {
    width: 6px;
    height: 6px;
  }
  .bgImg {
    width: 100%;
  }
  // app-plus-css
  // #endif
</style>
