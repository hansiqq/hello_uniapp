<template>
  <view class="view-item-2" :style="{ width: screenWidth - 20 + 'px' }">
    <view class="view-item-2-title">
      <image src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2276557307,3692288178&fm=26&gp=0.jpg" class="view-item-2-title-img" />
      <text class="view-item-2-title-test">我的会员</text>
    </view>
    <view class="view-item-2-ul" :style="{ width: screenWidth - 40 + 'px' }">
      <view class="view-item-2-list" v-for="(item, index) in 3" :key="index">
        <text class="view-item-2-list-title">新增会员</text>
        <view class="view-item-2-list-bottom">
          <text class="view-item-2-list-num">80</text>
          <text class="view-item-2-list-test">个</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import ala from '@/service/ala.js'
import testJson from './test.json'
export default {
  data() {
    return {
      screenWidth: '',
      list: testJson
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
.view-item-2 {
  height: 105px;
  background-color: #ffffff;
  margin: 7px 10px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.1);
  justify-content: space-between;
}
.view-item-2-title {
  flex-direction: row;
  align-items: center;
}
.view-item-2-title-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #1aad19;
}
.view-item-2-title-test {
  margin-left: 10px;
  font-size: 16px;
  font-weight: 600;
}
.view-item-2-ul {
  height: 65px;
  flex-direction: row;
  justify-content: space-between;
}
.view-item-2-list {
  width: 80px;
  margin-top: 10px;
  height: 45px;
  justify-content: space-between;
  /* align-items: center; */
}
.view-item-2-list-title {
  font-size: 14px;
  color: #999999;
}
.view-item-2-list-bottom {
  width: 80px;
  flex-direction: row;
}
.view-item-2-list-num {
  font-size: 18px;
}
.view-item-2-list-test {
  padding-top: 4px;
  font-size: 12px;
  color: #999999;
}
</style>
