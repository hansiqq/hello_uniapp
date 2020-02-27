<template>
  <view class="list-item" v-if="widget">
    <view class="left" v-if="widget.from.id !== userId">
      <view class="avator">
        <img src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2425370561,395428893&fm=26&gp=0.jpg" class="avator-image" alt="" />
      </view>
      <view class="left-message">
        <view class="user_name_test">{{ $user.loginUser().userName }}</view>
        <view class="chat-message">
          <!-- <view class="show-tips"></view> -->
          <view class="show-message">
            <message-type :widget="widget" :width="width"></message-type>
          </view>
        </view>
      </view>
    </view>
    <view class="right" v-else>
      <view class="chat-message">
        <!-- <view class="show-tips"></view> -->
        <view class="show-message">
          <message-type :widget="widget" :width="width"></message-type>
        </view>
      </view>
      <view class="avator">
        <img src="https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2425370561,395428893&fm=26&gp=0.jpg" class="avator-image" alt="" />
      </view>
    </view>
  </view>
</template>

<script>
import messageType from './message-type'
import ala from '@/service/ala'
export default {
  components: {
    messageType
  },
  props: {
    widget: {},
    userId: {}
  },
  data() {
    return {
      width: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.width = ala.screenWidth() / 3
    }
  }
}
</script>

<style lang="scss" scoped>
// #ifndef APP-PLUS
// app-plus-css
.list-item {
  .right,
  .left {
    min-height: 30px;
    margin: 10px 0;
    display: flex;
    padding: 0 10px;
    .avator {
      width: 35px;
      height: 35px;
      .avator-image {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
    .left-message {
      max-width: 70%;
      margin-left: 5px;
      .user_name_test {
        height: 18px;
        line-height: 18px;
        color: #555555;
        font-size: 12px;
      }
    }
    .chat-message {
      min-height: 24px;
      border-radius: 10px;
      border: 1px solid #f0f0f0;
      position: relative;
      background: #fff;
      .show-message {
        line-height: 18px;
        font-size: 14px;
        padding: 7px 10px;
        font-family: Arial, Helvetica, sans-serif;
      }
      // .show-tips {
      //   width: 8px;
      //   height: 8px;
      //   background: #98e165;
      //   position: absolute;
      //   transform: rotate(45deg);
      //   top: 10px;
      //   left: -4px;
      // }
    }
  }
  .right {
    justify-content: flex-end;
    .chat-message {
      max-width: 70%;
      margin-right: 5px;
      background: #fce40d;
      border: 1px solid #e6da78;
    }
  }
}
// app-plus-css
// #endif
</style>
