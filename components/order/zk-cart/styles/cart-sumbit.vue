<template>
  <view class="submit-cart" :style="{ bottom: bottom + 'px', width: screenWidth + 'px' }">
    <view class="submit-cart-left" :class="{ 'left-active': isRadio }" @click="radioClick">
      <x-icon name="icon-testsu" size="20" color="#007AFF" v-if="isRadio"></x-icon>
    </view>
    <view class="submit-cart-center" :style="{ width: screenWidth - 140 + 'px' }">
      <text class="submit-cart-center-text">全选</text>
      <view class="submit-cart-center-right">
        <text class="submit-cart-center-text">合计:</text>
        <text class="submit-cart-center-price">￥{{ money }}</text>
      </view>
    </view>
    <text class="submit-cart-right" @click="save">提交</text>
  </view>
</template>

<script>
import ala from '@/service/ala'
export default {
  props: {
    widget: {}
  },
  data() {
    return {
      isRadio: false,
      money: '0.00',
      bottom: 0,
      screenWidth: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.screenWidth = ala.screenWidth()
      if (ala.client() === 'WapH5') {
        if (this.widget && this.widget.route) {
          if (this.widget.route.path.indexOf('tabbar') > -1) {
            this.bottom = 50
          }
        }
      }
    },
    radioClick() {
      this.isRadio = !this.isRadio
      this.$emit('change', this.isRadio)
    },
    computePrice(data) {
      if (data.length > 0) {
        var num = 0
        data.forEach(element => {
          num += element.price * element.buyCount
        })
        this.money = num.toFixed(2)
      } else {
        this.money = '0.00'
      }
    },
    // 提交订单
    save() {
      this.$emit('save')
    }
  }
}
</script>

<style lang="scss" scoped>
.submit-cart {
  border-top-color: #e5e5e5;
  border-top-width: 1px;
  border-top-style: solid;
  height: 50px;
  position: fixed;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  &-left {
    width: 20px;
    height: 20px;
    margin: 0 10px;
    border-radius: 50%;
    border-width: 1px;
    border-style: solid;
    border-color: #d6d6d6;
  }
  &-center {
    height: 50px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-right: 10px;
    &-text {
      font-size: 15px;
    }
    &-right {
      flex-direction: row;
    }
    &-price {
      font-size: 14px;
      font-weight: 600;
      color: $gl-themeColor;
    }
  }
  &-right {
    width: 85px;
    height: 35px;
    border-radius: 30px;
    line-height: 35px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    background-color: $gl-themeColor;
  }
}
</style>
