<template>
  <view class="packet-item">
    <view class="packet-popup" :class="{ 'popup-show': packetFool }">
      <view
        :style="'height:' + statusHeight + 'px;background: rgba(0,0,0,0.3);'"
      ></view>
      <view class="packet-item_head">
        <view class="item_head-icon" @click="packetBack">
          <x-icon name="icon-white" size="16" color="#f4e5b2"></x-icon>
        </view>
        <view class="head-text">发红包</view>
      </view>
      <view class="envelope-categories">
        <view class="categories_ul">
          <view
            class="categories_li"
            :class="{ categories_active: categoriesIndex == 1 }"
            @click="categoriesTab(1)"
            >拼手气红包</view
          >
          <view
            class="categories_li"
            :class="{ categories_active: categoriesIndex == 2 }"
            @click="categoriesTab(2)"
            >普通红包</view
          >
        </view>
        <view class="categories_contion">
          <view class="prompt-text" style="text-align: center;"
            >拼手气红包，每个人抢到的金额随机</view
          >
          <view class="contion-li">
            <view class="contion-li_left">红包个数</view>
            <view class="contion-li_cot"
              ><input placeholder="填写个数" class="cot-input"
            /></view>
            <view class="contion-li_right">个</view>
          </view>
          <view class="prompt-text">本群共10人</view>
          <view class="contion-li" v-if="categoriesIndex == 1">
            <view class="contion-li_left">总金额</view>
            <view class="contion-li_cot"
              ><input placeholder="填写金额" class="cot-input"
            /></view>
            <view class="contion-li_right">元</view>
          </view>
          <view class="contion-li" v-if="categoriesIndex == 2">
            <view class="contion-li_left">单个金额</view>
            <view class="contion-li_cot"
              ><input placeholder="填写金额" class="cot-input"
            /></view>
            <view class="contion-li_right">元</view>
          </view>
          <view class="prompt-text"></view>
          <view class="prompt-textarea">
            <textarea
              class="textarea-box"
              placeholder-style="color:#999999;font-size:32upx;"
              adjust-position="false"
              maxlength="-1"
              placeholder="恭喜发财，大吉大利！"
            />
          </view>
          <view class="prompt-money">￥0.00</view>
          <view class="prompt-buttom">
            <view class="buttom-but"
              >发红包
              <!-- <view class="buttom-popup"></view> -->
            </view>
            <view class="tip-text"
              >安全提示：红包无法作为交易凭证，购物请拍订单付款</view
            >
            <view class="tip-text">未领取的红包，将于24小时后发起退款</view>
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
      packetFool: false,
      categoriesIndex: 1,
      statusHeight: 0
    }
  },
  mounted() {
    if (ala.client() === 'AppPlus') {
      this.statusHeight = ala.getSystemInfoSync().statusBarHeight
    }
  },
  methods: {
    show() {
      this.packetFool = true
    },
    packetBack() {
      this.packetFool = false
    },
    categoriesTab(vNumber) {
      this.categoriesIndex = vNumber
    }
  }
}
</script>

<style lang="scss" scoped>
// #ifndef APP-PLUS
// app-plus-css
.packet-item {
  .packet-popup {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    z-index: 9999;
    transform: translateX(100%);
    transition: all 0.5s ease;
    display: flex;
    flex-direction: column;
    .packet-item_head {
      height: 90upx;
      display: flex;
      align-items: center;
      background: #e06053;
      position: relative;
      .item_head-icon {
        padding: 0upx 20upx;
      }
      .head-text {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 70px;
        right: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #f4e5b2;
        font-size: 30upx;
      }
    }
    .envelope-categories {
      flex: 1;
      min-height: 0;
      overflow: auto;
      display: flex;
      flex-direction: column;
      .categories_ul {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f0f0f0;
        .categories_li {
          height: 80upx;
          line-height: 80upx;
          flex: 1;
          text-align: center;
          color: #999999;
        }
        .categories_active {
          color: #df5c65;
          position: relative;
          &::after {
            content: '';
            height: 0;
            border-bottom: 1px solid #df5c65;
            position: absolute;
            bottom: 0;
            left: 25px;
            right: 25px;
          }
        }
      }
      .categories_contion {
        flex: 1;
        min-height: 0;
        background: #fef4f2;
        .prompt-text {
          background: #fef5f0;
          height: 70upx;
          line-height: 70upx;
          padding: 0 30upx;
          color: #999999;
          font-size: 24upx;
        }
        .contion-li {
          height: 80upx;
          display: flex;
          align-items: center;
          padding: 0 30upx;
          background: #ffffff;
          .contion-li_left {
            flex: 1;
            min-width: 0;
            font-size: 28upx;
          }
          .contion-li_cot {
            .cot-input {
              width: 150upx;
              text-align: right;
              line-height: 44upx;
              padding: 0upx 10upx;
              .uni-input-placeholder {
                text-align: right;
                line-height: 40upx;
              }
            }
          }
          .contion-li_right {
            font-size: 28upx;
          }
        }
        .prompt-textarea {
          padding: 10upx 20upx;
          background: #ffffff;
          .textarea-box {
            width: 100%;
            max-height: 160upx;
          }
        }
        .prompt-money {
          font-size: 60upx;
          color: #000000;
          text-align: center;
          padding: 60upx 0upx 30upx 0upx;
        }
        .prompt-buttom {
          padding: 0upx 80upx;
          .buttom-but {
            height: 90upx;
            text-align: center;
            line-height: 90upx;
            border-radius: 10upx;
            background: #e05f53;
            color: #ffffff;
            position: relative;
            .buttom-popup {
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              background: rgba(255, 255, 255, 0.8);
              z-index: 10;
            }
          }
          .tip-text {
            font-size: 24upx;
            font-weight: 300;
            color: #999999;
            text-align: center;
            line-height: 50upx;
          }
        }
      }
    }
  }
  .popup-show {
    transform: translateX(0);
  }
}
// app-plus-css
// #endif
</style>
