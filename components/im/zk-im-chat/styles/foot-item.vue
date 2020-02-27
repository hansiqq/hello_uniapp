<template>
  <view class="foot-item">
    <view class="foot-inputValue">
      <view class="foot-left" @click="voiceFool = !voiceFool" v-if="client != 'WapH5'">
        <x-icon :name="voiceFool ? 'icon-notifyuser' : 'icon-increment'" size="16"></x-icon>
      </view>
      <view class="foot-contion">
        <view class="foot-center" v-if="voiceFool">
          <input class="input_test" v-model="value" @focus="showFoot('input')" />
          <view class="input_icon">
            <x-icon name="icon-increment" size="16"></x-icon>
          </view>
        </view>
        <view class="foot-voice" v-else @touchstart="longTap" @touchend="disentwine">{{ voiceText }}</view>
      </view>
      <view class="foot-right" v-if="!isValue" @click="showFoot()">
        <x-icon :name="isMoreFoot ? 'icon-shanchu' : 'icon-add'" color="#fff" size="16"></x-icon>
      </view>
      <view class="foot-right-send" v-else @click="$emit('change', value)">发送</view>
    </view>
    <view class="foot-list">
      <view class="list" v-for="(item, index) in footList" :key="index">
        <view class="list_icon" @click="toolClick(item)">
          <x-icon :name="item.icon" color="#767676" size="18"></x-icon>
        </view>
        <view class="test">{{ item.name }}</view>
      </view>
    </view>
    <packet-item ref="packet_item"></packet-item>
    <snatch-envelope ref="snatch_envelope"></snatch-envelope>
  </view>
</template>
<script>
import footListJson from './foot-list.json'
import im from '../im'
import ala from '@/service/ala'
import packetItem from './packet-item.vue'
import snatchEnvelope from './snatch-envelope.vue'

const recorderManager = uni.getRecorderManager()
const innerAudioContext = uni.createInnerAudioContext()
innerAudioContext.autoplay = true
export default {
  components: {
    packetItem,
    snatchEnvelope
  },
  data() {
    return {
      client: '',
      value: '', // 输入框的值
      scrollHeight: 0,
      footHeight: 45,
      isMoreFoot: false, // 是否显示底部更多信息默认为false
      isValue: false, // 输入框是否有值
      footList: footListJson,
      voiceFool: true,
      voicePath: '',
      voiceText: '按住 说话',
      intervalTime: 0,
      isRecord: false // 记录状态,录音中或者是未开始
    }
  },
  onLoad() {
    let self = this
    recorderManager.onStop(function(res) {
      self.voicePath = res.tempFilePath
    })
    this.client = ala.client()
  },
  computed: {
    intIntervalTime() {
      // 用于显示整数的秒数
      return Math.round(this.intervalTime)
    }
  },
  methods: {
    showFoot(type) {
      this.$emit('showFoot', { type, isMoreFoot: this.isMoreFoot })
      if (this.isMoreFoot) {
        this.isMoreFoot = false
      } else if (type !== 'input') {
        this.isMoreFoot = true
      }
    },
    toolClick(data) {
      if (data.type === 'packet') {
        this.$refs.packet_item.show()
      } else {
        this.$emit('toolClick', data)
      }
    },
    longTap() {
      im.voiceRecord(this, recorderManager)
    },
    disentwine() {
      im.voiceConclude(this, recorderManager)
    }
  },
  watch: {
    value: {
      deep: true,
      handler(val) {
        if (val.length > 0) {
          this.isValue = true
        } else {
          this.isValue = false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// #ifndef APP-PLUS
// app-plus-css
.foot-item {
  .foot-inputValue {
    height: 50px;
    background: #f2f2f2;
    display: flex;
    align-items: center;
    padding: 0 10px;
    justify-content: space-between;
    border-bottom: 1px solid #e1e1e1;
    .foot-left,
    .foot-right {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      .x-icon {
        height: 100%;
        width: 100%;
      }
    }
    .foot-right {
      background: linear-gradient(to right, #f99604, #fe570a);
    }
    .foot-right-send {
      width: 40px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #fff;
      border-radius: 3px;
      background: linear-gradient(to right, #f99604, #fe570a);
    }
    .foot-contion {
      flex: 1;
      min-width: 0;
      padding: 0px 10px;
      .foot-center {
        width: 100%;
        height: 35px;
        display: flex;
        align-items: center;
        background: #fff;
        border-radius: 20px;
        .input_test {
          flex: 1;
          min-width: 0;
          height: 100%;
          margin: 0 10px;
        }
        .input_icon {
          width: 25px;
          height: 25px;
          margin-right: 5px;
        }
      }
      .foot-voice {
        width: 100%;
        display: inline-block;
        text-align: center;
        height: 35px;
        line-height: 35px;
        background: #fff;
        border-radius: 20px;
      }
    }
  }
  .foot-list {
    //  box-sizing: border-box;
    padding: 15px;
    display: flex;
    flex-wrap: wrap;
    .list {
      margin: 5px 0;
      width: 25%;
      height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .list_icon {
        width: 50px;
        height: 50px;
        border-radius: 3px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .test {
        height: 25px;
        line-height: 25px;
        color: #767676;
        font-size: 12px;
      }
    }
  }
}
// app-plus-css
// #endif
</style>
