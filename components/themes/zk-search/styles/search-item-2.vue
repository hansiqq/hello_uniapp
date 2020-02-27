<template>
  <view class="search-item-2">
    <view class="left-cont">
      <view class=" icon-erweima icon_list"></view>
      <view class="test">拍照购</view>
    </view>
    <view class="center-cont">
      <view class="search icon-search"> </view>
      <view class="test">搜索商品、店铺</view>
    </view>
    <view class="right-cont">
      <view class=" icon-news icon_list"></view>
      <view class="test">消息</view>
    </view>
  </view>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
// #ifndef APP-PLUS
// app-plus-css
.search-item-2 {
  width: 100%;
  height: 50px;
  //  box-sizing: border-box;
  padding-top: 13px;
  background: url(http://bdd.5ug.com//wwwroot/uploads/api/242-873-583/2019-12-30/5e09ab0ac902f61ac0d7f09a.jpg) no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: flex-end;
  .left-cont,
  .right-cont {
    min-width: 30px;
    height: 100%;
    margin: 0 15px;
    .test {
      color: #fff;
      font-size: 12px;
      text-decoration: underline;
      text-align: center;
    }
    .icon_list {
      font-size: 16px;
      color: #fff;
      height: 16px;
      line-height: 16px;
      text-align: center;
    }
  }
  .center-cont {
    flex-grow: 1;
    height: 30px;
    border-radius: 30px;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    .search {
      width: 25px;
      height: 25px;
      margin-left: 10px;
      font-size: 20px;
      color: #fff;
      text-align: center;
      line-height: 25px;
      //  box-sizing: border-box;
    }
    .test {
      margin-left: 5px;
      height: 20px;
      line-height: 20px;
      color: #fff;
    }
  }
}
// app-plus-css
// #endif
</style>
