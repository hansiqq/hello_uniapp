<template>
  <view class="top">
    <view class="earning-top">
      <view class="earning-top-head" :style="{ width: screenWidth - 20 + 'px' }">
        <view class="earning-top-head-left">
          <view class="earning-top-head-left-top">
            <text class="earning-top-head-left-top-test">可提现额度</text>
            <view class="earning-top-head-left-top-img"></view>
          </view>
          <view class="earning-top-head-left-bottom">
            <text class="earning-top-head-left-bottom-price">80</text>
            <text class="earning-top-head-left-bottom-test">(元)</text>
          </view>
        </view>
        <text class="earning-top-head-right">立即提现</text>
      </view>
      <view class="earning-top-center" :style="{ width: screenWidth - 20 + 'px' }">
        <view class="earning-top-center-list" :style="{ width: (screenWidth - 20) / 3 + 'px' }" v-for="(item, index) in list" :key="index">
          <text class="earning-top-center-list-title">{{ item.name }}</text>
          <text class="earning-top-center-list-price">{{ item.price }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import ala from '@/service/ala.js'
import topTest from './top-test.json'
export default {
  data() {
    return {
      screenWidth: '',
      list: topTest
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.screenWidth = ala.screenWidth()
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  position: relative;
}
.earning-top {
  height: 180px;
  padding: 10px;
  justify-content: space-between;
  background-image: linear-gradient(to right, #ff401b, #d72824);
}
.earning-top-head {
  height: 80px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.earning-top-head-left {
  height: 40px;
  justify-content: space-between;
}
.earning-top-head-left-top {
  flex-direction: row;
}
.earning-top-head-left-top-test {
  font-size: 14px;
  color: #fff3f2;
  text-decoration: underline;
}
.earning-top-head-left-top-img {
  margin-left: 5px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #1aad19;
}
.earning-top-head-left-bottom {
  flex-direction: row;
  align-items: center;
}
.earning-top-head-left-bottom-price {
  font-size: 18px;
  color: #ffffff;
}
.earning-top-head-left-bottom-test {
  margin-left: 5px;
  font-size: 14px;
  color: #ffffff;
}
.earning-top-head-right {
  height: 25px;
  width: 80px;
  background-color: #ffffff;
  border-radius: 30px;
  text-align: center;
  line-height: 25px;
  font-size: 13px;
  font-weight: 700;
  color: #fe5959;
}

.earning-top-center {
  margin-top: 20px;
  height: 60px;
  flex-direction: row;
}
.earning-top-center-list {
  height: 40px;
  justify-content: space-between;
  align-items: center;
}
.earning-top-center-list-title {
  font-size: 12px;
  color: #ffffff;
}
.earning-top-center-list-price {
  font-size: 16px;
  color: #ffffff;
}
</style>
