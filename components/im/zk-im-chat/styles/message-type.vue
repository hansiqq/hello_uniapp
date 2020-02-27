<template>
  <view>
    <view class="msg-text" v-if="widget.type == 'text'">{{widget.msg}}</view>
    <img class="msg-image" v-else-if="widget.type == 'image'&&width" :style="'width:'+width+'px'" :src="widget.msg" alt="">
    <view class="audio-box" v-else-if="widget.type=='audio'" @click="audioTab(widget)">
      <img class="audio-box_img" :src="timeImg" />
    </view>
    <video class="message-video" id="myVideo" :src="widget.msg" v-else-if="widget.type=='video'" objectFit="cover" play-btn-position="100px" @play="onPay"></video>
    <view class="message-map" v-else-if="widget.type=='map'" @click="checkPosition(widget)">
      <view class="message-map_text">{{widget.msg.locationName}}</view>
      <view class="message-map_text">{{widget.msg.poi}}</view>
      <map style="width: 300upx; height: 200upx;" scale="14" :latitude="widget.msg.latitude" :longitude="widget.msg.longitude" :markers="covers"></map>
    </view>
  </view>
</template>


<script>
  import message from './message.js'
  export default {
    props: {
      widget: {},
      width: {}
    },
    data () {
      return {
        covers: [],
        timeImg: '',
        imgList: ['http://retail_v13.api.5ug.com/wwwroot/uploads/api/375-431-798/2020-01-16/5e1fc07befce6149d4edaa55.png', 'http://retail_v13.api.5ug.com/wwwroot/uploads/api/375-431-798/2020-01-16/5e1fc07befce6149d4edaa54.png', 'http://retail_v13.api.5ug.com/wwwroot/uploads/api/375-431-798/2020-01-16/5e1fc07befce6149d4edaa53.png'],
        timerTey: '',
        playSuspend: true
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        this.timeImg = this.imgList[2]
        this.covers = [
          { latitude: this.widget.msg.latitude, longitude: this.widget.msg.longitude }
        ]
      },
      onPay () {
        // 获取 video 上下文 videoContext 对象
        this.videoContext = uni.createVideoContext('myVideo')
        // 进入全屏状态
        this.videoContext.requestFullScreen()
      },
      checkPosition (val) {
        message.geographicPosition(this, val)
      },
      audioTab (val) {
        message.audioOperation(this, val)
      }
    }
  }
</script>

<style lang="scss" scoped>
	// #ifndef APP-PLUS  
  // app-plus-css
  .msg-image {
    width: 50%;
  }
  .show-image {
    width: 50%;
    height: 100px;
    background: red;
  }
  .msg-text {
    line-height: 18px;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }
  .message-video {
    width: 200upx;
    height: 300upx;
    .uni-video-control-button {
      width: 40upx;
      height: 40upx;
    }
  }
  .message-map {
    .message-map_text {
      width: 300upx;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
  }
  .audio-box {
    width: 200upx;
    display: flex;
    align-items: center;
    .audio-box_img {
      display: inline-block;
      width: 50upx;
      height: 50upx;
      transform: rotate(90deg);
    }
  }
  // app-plus-css
  // #endif
</style>
