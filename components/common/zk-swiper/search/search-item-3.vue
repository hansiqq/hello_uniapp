<template>
  <view class="search-item-3">
    <view class="iconList lefticon-list" @click="to('/order/cart')">
      <x-icon name="icon-cart" size="20" color="#ffffff"></x-icon>
    </view>
    <view class="left ">
      <view class="iconList">
        <x-icon name="zk-search" size="20" color="#606266"></x-icon>
      </view>
      <input type="text" placeholder="请输入您所需要搜索的内容" class="input" />
    </view>
    <view class="right">
      <view class="iconList" @click="to('/user/qrcode')">
        <x-icon name="icon-qrcode" size="20" color="#ffffff"></x-icon>
      </view>
    </view>
  </view>
</template>

<script>
import ala from '@/service/ala'
export default {
  methods: {
    to(url) {
      ala.to(url)
    }
  }
}
</script>

<style lang="scss" scoped>
// #ifndef APP-PLUS
// app-plus-css
.search-item-3 {
  position: absolute;
  top: 0;
  left: 0;
  height: 45px;
  width: 100%;
  padding: 0 10px;
  display: flex;
  align-items: center;
  z-index: 2;
  .lefticon-list {
    margin-right: 10px;
  }
  .left {
    width: 85%;
    height: 30px;
    background: rgba(250, 250, 250, 0.7);
    border-radius: 30px;
    display: flex;
    .iconList {
      width: 20px;
      height: 20px;
      margin: 0 5px;
    }
    .input {
      width: 100%;
      height: 100%;
      margin-right: 10px;
      line-height: 30px;
    }
  }
  .right {
    margin-left: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
// app-plus-css
// #endif
</style>
