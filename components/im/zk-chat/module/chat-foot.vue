<template>
  <view class="chat-foot">
    <view class="expression">
      <x-icon name="icon-news" size="20" style="height: 20px;" color="#FD483D"></x-icon>
    </view>
    <view class="cont">
      <input v-model="value" class="input-value" />
      <view class="input_icon icon-service"></view>
    </view>
    <view v-if="!isSend" class="upload icon-virtual"></view>
    <view v-else class="send" @click="send">发送</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      isSend: false
    }
  },
  methods: {
    send() {
      // 获取信息id
      var msgId = this.$im.conn.getUniqueId()
      // 发送消息
      var deliverMessage = this.$im.message('txt', msgId)
      deliverMessage.set({
        msg: this.value,
        id: msgId,
        chatType: 'singleChat',
        to: 'zhongjian1'
      })
      this.$im.conn.send(deliverMessage.body)
      this.value = ''
      var date = new Date()
      var para = {
        to: deliverMessage.body.to,
        from: 'zhongjian',
        msg: deliverMessage.body.msg,
        id: deliverMessage.body.id,
        type: deliverMessage.body.type,
        time: date
      }
      this.$emit('changeSend', para)
    }
  },
  watch: {
    value: {
      deep: true,
      handler(val) {
        this.isSend = this.value.length > 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// #ifndef APP-PLUS
// app-plus-css
.chat-foot {
  height: 40px;
  width: 100%;
  border-top: 1px solid #e6e6e6;
  //  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background: #ffffff;
  .cont {
    flex-grow: 1;
    height: 30px;
    border-radius: 20px;
    background: #f2f2f2;
    display: flex;
    padding: 0 10px;
    align-items: center;
    .input-value {
      flex-grow: 1;
      height: 100%;
    }
    .input_icon {
      color: #000;
      font-size: 20px;
      //  box-sizing: border-box;
    }
  }
  .send {
    display: inline-block;
    padding: 0 8px;
    font-size: 14px;
    border-radius: 2px;
    color: #ffffff;
    background: linear-gradient(to right, #ff8502, #f63414);
    margin-left: 10px;
  }
  .expression,
  .upload {
    font-size: 20px;
    color: #fd483d;
  }
  .expression {
    margin-right: 10px;
  }
  .upload {
    margin-left: 10px;
  }
}
// app-plus-css
// #endif
</style>
