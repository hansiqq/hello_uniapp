<template>
  <view class="red-record">
    <view class="record_popup" :class="{ 'record_popup-active': recordFool }">
      <view
        :style="'height:' + statusHeight + 'px;background: rgba(0,0,0,0.3);'"
      ></view>
      <view class="record_head">
        <view class="item_head-icon" @click="recordFool = false">
          <x-icon name="icon-white" size="16" color="#ffe3bc"></x-icon>
        </view>
        <view class="head-text">红包记录</view>
      </view>
      <view class="record_contion">
        <view class="record_contion-top">
          <view class="contion-top_one">
            <img
              class="one-img"
              src="http://bdd.5ug.com/wwwroot/uploads/api/242-873-583/2020-01-15/5e1e7bb70046d1badc4b3a9f.jpg"
            />
          </view>
          <view class="contion-top_two">本共收到</view>
          <view class="contion-top_three">
            <span class="three-number">7.71</span>
            元
          </view>
          <view class="contion-top_four">
            <view class="four-li">
              <view class="four-li_number">8</view>
              <view class="four-li_text">收到红包</view>
            </view>
            <view class="four-li">
              <view class="four-li_number">2</view>
              <view class="four-li_text">手气最佳</view>
            </view>
          </view>
        </view>
        <view class="record_contion-ul">
          <view
            class="record_contion-li"
            v-for="(item, index) in 15"
            :key="index"
          >
            <view class="list-left">
              <view class="list-left_text"
                >根深蒂固<span class="list-left_span">拼</span></view
              >
              <view class="list-left_date">01-20</view>
            </view>
            <view class="list-right">0.31元</view>
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
      recordFool: false,
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
      this.recordFool = true
    }
  }
}
</script>

<style lang="scss" scoped>
// #ifndef APP-PLUS
// app-plus-css
.red-record {
  .record_popup {
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
    .record_head {
      height: 90upx;
      display: flex;
      align-items: center;
      background: #f76655;
      .item_head-icon {
        padding: 0upx 20upx;
      }
      .head-text {
        padding-left: 10rpx;
        color: #ffe3bc;
      }
    }
    .record_contion {
      flex: 1;
      min-height: 0;
      overflow: auto;
      .record_contion-top {
        display: flex;
        align-items: center;
        flex-direction: column;
        .contion-top_one {
          width: 140rpx;
          height: 140rpx;
          margin-top: 40rpx;
          .one-img {
            width: 100%;
            height: 100%;
          }
        }
        .contion-top_two {
          color: #2b2b2b;
          margin-top: 30rpx;
          font-size: 32rpx;
        }
        .contion-top_three {
          color: #2b2b2b;
          font-size: 32rpx;
          .three-number {
            font-size: 110rpx;
            color: #1b1b1b;
            line-height: 130rpx;
          }
        }
        .contion-top_four {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 50rpx;
          .four-li {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .four-li_number {
              font-size: 60rpx;
              color: #999999;
              line-height: 60rpx;
            }
            .four-li_text {
              font-size: 24rpx;
              color: #999999;
            }
          }
        }
      }
      .record_contion-ul {
        background: #ffffff;
        padding: 0rpx 20rpx;
        .record_contion-li {
          display: flex;
          padding: 20rpx 0rpx;
          .list-left {
            flex: 1;
            min-width: 0;
            .list-left_text {
              font-size: 30rpx;
              display: flex;
              align-items: center;
              .list-left_span {
                display: inline-block;
                width: 30rpx;
                height: 30rpx;
                line-height: 30rpx;
                text-align: center;
                font-size: 20rpx;
                background: #fabe2a;
                color: #ffffff;
                margin-left: 10rpx;
              }
            }
            .list-left_date {
              font-size: 26rpx;
              line-height: 26rpx;
              color: #999999;
            }
          }
        }
        .record_contion-li + .record_contion-li {
          border-top: 1px solid #f0f0f0;
        }
      }
    }
  }
  .record_popup-active {
    transform: translateY(0);
  }
}
// app-plus-css
// #endif
</style>
