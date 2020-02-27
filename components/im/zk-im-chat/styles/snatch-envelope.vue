<template>
  <view class="snatch-envelope">
    <view :style="'height:'+statusHeight+'px;background: rgba(0,0,0,0.3);'"></view>
    <!-- 点开弹出层 -->
    <view class="simulant-pou" v-if="simulantFool">
      <view class="simulant-pou_box">
        <view class="pou_box-n">
          <view class="box-n_contion">
            <view class="n_contion-p1">
              <view class="p1-demo">
                <img class="p1-img" src="http://bdd.5ug.com/wwwroot/uploads/api/242-873-583/2020-01-15/5e1e7bb70046d1badc4b3a9f.jpg" />
              </view>
              <view class="p1-text">本人的红包</view>
            </view>
            <view class="n_contion-p2">恭喜发财，大吉大利</view>
          </view>
          <view class="open-cpot">
            <view class="open-cpot_center" @click="packetFool=true">开</view>
          </view>
          <view class="query-condition">
            <view class="query-condition_text">查看大家的手气</view>
            <x-icon name="icon-jiantou" color="#fcd5ac" size="10"></x-icon>
          </view>
        </view>
        <view class="pou_box-buttom">
          <view class="pou_but" @click="simulantFool=false">
            <img class="pou_but-img" src="http://bdd.5ug.com/wwwroot/uploads/api/242-873-583/2020-01-17/5e2175812ae9c57b347bdac4.png" />
          </view>
        </view>
      </view>
    </view>
    <!-- 抢红包列表 -->
    <view class="envelope-popup" :class="{'envelope-show':packetFool}">
      <view class="envelope-popup_head">
        <view @click="packetFool=false">
          <x-icon name="icon-white" color="#ffffff" size="16"></x-icon>
        </view>
        <view class="popup_head-text"></view>
        <view @click="operationClick">
          <x-icon name="icon-classify" color="#ffffff" size="16"></x-icon>
        </view>
      </view>
      <view class="envelope-popup_contion">
        <view class="envelope-g">
          <img class="envelope-g_img" src="http://bdd.5ug.com/wwwroot/uploads/api/242-873-583/2020-01-17/5e2189242ae9c57b347becb2.png" />
        </view>
        <view class="envelope-T">
          <view class="envelope-one">
            <view class="envelope-one_left">
              <img class="envelope-one_img" src="http://bdd.5ug.com/wwwroot/uploads/api/242-873-583/2020-01-15/5e1e7bb70046d1badc4b3a9f.jpg" />
            </view>
            <view class="envelope-one_center">本的红包</view>
            <view class="corner-mark">拼</view>
          </view>
          <view class="envelope-two">恭喜发财，大吉大利</view>
          <view class="envelope-three">
            <span class="envelope-three_span">0.10</span>
            元
          </view>
          <view class="envelope-four">
            <view class="envelope-four_tetx">已存入零钱，可直接转账</view>
            <x-icon name="icon-jiantou" color="#b8af9d" size="12"></x-icon>
          </view>
        </view>
        <view style="height:10px;background:#f4f4f4;"></view>
        <view class="envelope-l">
          <view class="envelope-l_head">1个红包共1元，3秒被抢光</view>
          <view class="envelope_ul">
            <view class="envelope_li" v-for="(item,index) in 8" :key="index">
              <view class="li-left">
                <img class="li-left_img" src="http://bdd.5ug.com/wwwroot/uploads/api/242-873-583/2020-01-15/5e1e7bb70046d1badc4b3a9f.jpg" />
              </view>
              <view class="li-right">
                <view class="li-right_p1">
                  <view class="p1-text">大概是</view>
                  <view class="p1-number">0.12元</view>
                </view>
                <view class="li-right_p1">
                  <view class="p1-text p2-text">22:09</view>
                  <view class="p1-number p2-text p2-active">手气最佳</view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 抢红包列表操作 -->
    <view class="list-operation">
      <view class="ground-floor" v-if="operationFool" @click="operationFool=false"></view>
      <view class="operation-ul" :class="{'operation-active':operationFool}">
        <view class="operation-li" @click="tabOpear(1)">红包记录</view>
        <view class="operation-li" @click="tabOpear(2)">红包帮助</view>
        <view class="operation-li operation-three" @click="operationFool=false">取消</view>
      </view>
    </view>
    <red-envelopes ref="red_envelopes"></red-envelopes>
    <red-record ref="red_record"></red-record>
  </view>
</template>

<script>
import ala from '@/service/ala'
  import redEnvelopes from './red-envelopes.vue'
  import redRecord from './red-record.vue'
  export default {
    components: {
      redEnvelopes,
      redRecord
    },
    data () {
      return {
        statusHeight: 0,
        packetFool: false,
        simulantFool: true,
        operationFool: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      async init () {
        if (ala.client() === 'AppPlus') {
          this.statusHeight = ala.getSystemInfoSync().statusBarHeight
        }
      },
      operationClick () {
        this.operationFool = true
      },
      tabOpear (numberPara) {
        if (numberPara === 1) {
          this.$refs.red_record.show()
        } else {
          this.$refs.red_envelopes.show()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
	// #ifndef APP-PLUS  
  // app-plus-css
  .snatch-envelope {
    .simulant-pou {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.8);
      z-index: 990;
      .simulant-pou_box {
        position: absolute;
        top: 200upx;
        bottom: 200upx;
        left: 100upx;
        right: 100upx;
        .pou_box-n {
          width: 100%;
          height: 800upx;
          border-radius: 10upx;
          background: #f56658;
          display: flex;
          flex-direction: column;
          .box-n_contion {
            padding-top: 160upx;
            padding-bottom: 200upx;
            .n_contion-p1 {
              display: flex;
              align-items: center;
              justify-content: center;
              .p1-demo {
                width: 50upx;
                height: 50upx;
                border-radius: 8upx;
                margin-right: 20upx;
                overflow: hidden;
              }
              .p1-img {
                width: 100%;
                height: 100%;
              }
              .p1-text {
                color: #fcd5ac;
              }
            }
            .n_contion-p2 {
              font-size: 38upx;
              color: #fcd5ac;
              text-align: center;
              margin-top: 10upx;
            }
          }
          .open-cpot {
            flex: 1;
            min-height: 0;
            position: relative;
            .open-cpot_center {
              width: 100upx;
              height: 100upx;
              border-radius: 100upx;
              text-align: center;
              line-height: 100upx;
              background: #debc84;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }
          .query-condition {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100upx;
            .query-condition_text {
              color: #fcd5ac;
            }
          }
        }
        .pou_box-buttom {
          text-align: center;
          padding-top: 60upx;
          .pou_but {
            display: inline-block;
            width: 80upx;
            height: 80upx;
            .pou_but-img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .envelope-popup {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #ffffff;
      z-index: 992;
      transform: translateX(100%);
      transition: all 0.5s ease;
      display: flex;
      flex-direction: column;
      .envelope-popup_head {
        height: 90upx;
        background: #f45c4e;
        display: flex;
        align-items: center;
        padding: 0upx 20upx;
        .popup_head-text {
          flex: 1;
          min-width: 0;
        }
      }
      .envelope-popup_contion {
        flex: 1;
        min-height: 0;
        overflow: auto;
        .envelope-g {
          width: 100%;
          height: 120upx;
          .envelope-g_img {
            width: 100%;
            height: 100%;
          }
        }
        .envelope-T {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 60upx 0upx;
          .envelope-one {
            display: flex;
            align-items: center;
            .envelope-one_left {
              width: 45upx;
              height: 45upx;
              border-radius: 6upx;
              overflow: hidden;
              .envelope-one_img {
                width: 100%;
                height: 100%;
              }
            }
            .envelope-one_center {
              font-size: 32upx;
              color: #1e1e1e;
              margin-left: 16upx;
            }
            .corner-mark {
              width: 35upx;
              height: 35upx;
              text-align: center;
              line-height: 35upx;
              border-radius: 6upx;
              font-size: 16upx;
              color: #ffffff;
              background: #c4a77d;
              margin-left: 10upx;
            }
          }
          .envelope-two {
            color: #c3c3c3;
            font-size: 26upx;
            margin-top: 10upx;
          }
          .envelope-three {
            color: #ceb481;
            font-size: 34upx;
            line-height: 80upx;
            margin-top: 50upx;
            .envelope-three_span {
              font-size: 100upx;
            }
          }
          .envelope-four {
            display: flex;
            align-items: center;
            .envelope-four_tetx {
              font-size: 13px;
              color: #b8af9d;
            }
          }
        }
        .envelope-l {
          .envelope-l_head {
            padding: 20upx;
            color: #999999;
            font-size: 26upx;
            border-bottom: 1px solid #f0f0f0;
          }
          .envelope_ul {
            .envelope_li {
              display: flex;
              align-items: center;
              padding-left: 30upx;
              .li-left {
                width: 80upx;
                height: 80upx;
                border-radius: 8upx;
                overflow: hidden;
                margin-right: 20upx;
                .li-left_img {
                  width: 100%;
                  height: 100%;
                }
              }
              .li-right {
                flex: 1;
                min-width: 0;
                border-bottom: 1px solid #f0f0f0;
                padding: 20upx 20upx 20upx 0upx;
                .li-right_p1 {
                  display: flex;
                  align-items: center;
                  height: 40upx;
                  .p1-text {
                    flex: 1;
                    min-width: 0;
                    color: #1e1e1e;
                    font-size: 30upx;
                  }
                  .p1-number {
                    color: #1e1e1e;
                  }
                  .p2-text {
                    font-size: 20upx;
                    color: #999999;
                  }
                  .p2-active {
                    color: #debc84;
                  }
                }
              }
            }
          }
        }
      }
    }
    .envelope-show {
      transform: translateX(0);
    }
    .list-operation {
      .ground-floor {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.4);
        z-index: 994;
      }
      .operation-ul {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 996;
        background: #f4f4f4;
        transform: translateY(100%);
        transition: all 0.2s ease;
        .operation-li {
          background: #ffffff;
          text-align: center;
          padding: 20rpx 0rpx;
        }
        .operation-li + .operation-li {
          border-top: 1px solid #f0f0f0;
        }
        .operation-three {
          margin-top: 10rpx;
        }
      }
      .operation-active {
        transform: translateY(0);
      }
    }
  }
  // app-plus-css
  // #endif
</style>
