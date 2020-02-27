<template>
  <view class="zk-wx-login">
    <wxLogin></wxLogin>
  </view>
</template>


<script>
  import wxLogin from './style/wx-login'
  export default {
    components: {
      wxLogin
    }
  }
</script>

<style lang="scss" scoped>
	// #ifndef APP-PLUS  
  // app-plus-css
  .zk-wx-login {
    width: 100%;
    height: 100px;
    background: red;
  }
  // app-plus-css
  // #endif
</style>
