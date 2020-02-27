<template>
  <view class="view-item-1" :style="{ width: screenWidth - 20 + 'px' }">
    <text class="view-item-1-title">圈落牛人榜</text>
    <text class="view-item-1-intro">根据大区进行展示6位</text>
    <view class="view-item-1-ul" :style="{ width: screenWidth - 40 + 'px' }">
      <view class="view-item-1-list" v-for="(item, index) in list" :key="index" :style="{ width: (screenWidth - 40) / 6 + 'px' }">
        <image :src="item.img" class="view-item-1-list-img" />
        <text class="view-item-1-list-test">{{ item.name }}</text>
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
.view-item-1 {
  height: 130px;
  background-color: #ffffff;
  margin: 7px 10px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.1);
  justify-content: space-between;
}
.view-item-1-title {
  font-size: 16px;
  font-weight: 600;
}
.view-item-1-intro {
  font-size: 12px;
  color: #999999;
}
.view-item-1-ul {
  height: 65px;
  flex-direction: row;
}
.view-item-1-list {
  margin-top: 10px;
  height: 55px;
  justify-content: space-between;
  align-items: center;
}
.view-item-1-list-img {
  width: 40px;
  height: 40px;
  background-color: #1bbc9b;
  border-radius: 50%;
}
.view-item-1-list-test {
  font-size: 12px;
  color: #999999;
  overflow: hidden;
  text-overflow: ellipsis;
  /* #ifdef APP-PLUS-NVUE */
  lines: 1;
  /* #endif */

  /* #ifdef MP || H5 */
  // white-space: nowrap;
  /* #endif */
}
</style>
