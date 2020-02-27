<template>
  <view class="chat-title">
    <view class="chat-title-head" @click="showproduct">
      <view class="left">
        <x-icon name="icon-black" size="15" color="#fff"></x-icon>
        <view class="test">好友1号</view>
      </view>
      <view class="right">
        <x-icon name="icon-erweima" size="15" color="#fff"></x-icon>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    methods: {
      showproduct () {
        this.$emit('showproduct', 150)
      }
    }
  }
</script>


<style lang="scss" scoped>
	// #ifndef APP-PLUS  
  // app-plus-css
  .chat-title {
    .chat-title-head {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: red;
      padding: 0 10px;
      .left {
        height: 25px;
        display: flex;
        .x-icon {
          height: 25px;
          width: 20px;
          height: 20px;
        }
        .test {
          color: #fff;
          font-size: 14px;
        }
      }
      .right {
        width: 25px;
        height: 25px;
      }
    }
  }
  // app-plus-css
  // #endif
</style>
