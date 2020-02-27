<template>
  <view class="red-envelopes">
    <view class="envelopes_popup" :class="{ envelopes_active: envelopesFool }">
      <view
        :style="'height:' + statusHeight + 'px;background: rgba(0,0,0,0.3);'"
      ></view>
      <view class="envelopes_head">
        <view class="item_head-icon" @click="envelopesFool = false">
          <x-icon name="icon-white" size="16"></x-icon>
        </view>
        <view class="head-text">红包帮助</view>
      </view>
      <view class="envelopes-box">
        <view class="envelopes-ul">
          <view class="envelopes-li" v-for="(item, index) in 10" :key="index">
            <view class="envelopes-li_title">
              <span class="li_title-span">●</span>
              红包支付限额？
            </view>
            <view class="envelopes-li_intro">
              每天累计发放金额不超过10,000元，每天发放次数无限制，单笔200元上限
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import ala from '@/service/ala'
export default {
  data() {
    return {
      envelopesFool: false,
      statusHeight: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      if (ala.client() === 'AppPlus') {
        this.statusHeight = ala.getSystemInfoSync().statusBarHeight
      }
    },
    show() {
      this.envelopesFool = true
    }
  }
}
</script>

<style lang="scss" scoped>
// #ifndef APP-PLUS
// app-plus-css
.red-envelopes {
  .envelopes_popup {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f4f4f4;
    z-index: 998;
    transform: translateY(100%);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    .envelopes_head {
      height: 90upx;
      display: flex;
      align-items: center;
      background: #ffffff;
      .item_head-icon {
        padding: 0upx 20upx;
      }
      .head-text {
        padding-left: 10rpx;
      }
    }
    .envelopes-box {
      flex: 1;
      min-height: 0;
      overflow: auto;
      .envelopes-ul {
        background: #f1f1f1;
        .envelopes-li {
          margin-top: 20rpx;
          background: #ffffff;
          padding: 20rpx 40rpx;
          .envelopes-li_title {
            font-size: 32rpx;
            .li_title-span {
              color: #1894ee;
              margin-right: 10rpx;
            }
          }
          .envelopes-li_intro {
            color: #979797;
            font-size: 26rpx;
            line-height: 40rpx;
            margin-top: 10rpx;
          }
        }
      }
    }
  }
  .envelopes_active {
    transform: translateY(0);
  }
}
// app-plus-css
// #endif
</style>
