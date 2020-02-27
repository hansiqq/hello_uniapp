<template>
  <view class="chat-message">
    <scroll-view class="chat-scroll" :style="'height:'+height+'px;'" :scroll-top="scrollTop" scroll-with-animation scroll-y>
      <view v-for="(item, index) in viewModel" :key="index" class="scroll-list-message">
        <view class="list-message" v-if="item.from !== userData.user">
          <img class="user_image" src="http://img5.imgtn.bdimg.com/it/u=4094400000,3327666375&fm=26&gp=0.jpg" />
          <view class="user_message">{{item.msg}}</view>
        </view>
        <view class="list-message right" v-else>
          <view class="user_message">{{item.msg}}</view>
          <img class="user_image" src="http://img3.imgtn.bdimg.com/it/u=3922447756,2440710177&fm=26&gp=0.jpg" />
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  import actions from '../actions'
  import ala from '@/service/ala'
  export default {
    data () {
      return {
        height: 0,
        viewModel: [],
        userData: null,
        async: false,
        scrollTop: 0
      }
    },
    mounted () {
      this.init()
      this.$bus.$off('text-message-single-chart').$on('text-message-single-chart', (message) => {
        var para = {
          id: message.id,
          time: message.time,
          type: message.type,
          to: message.to,
          from: message.from,
          msg: message.data
        }
        this.viewModel.push(para)
      })
    },
    methods: {
      init () {
        this.height = ala.screenHeight() - 80
        this.userData = ala.vuexLocalGet('chat_room_token')
        setTimeout(() => {
          actions.fetchHistoryMessages(this)
        }, 1000)
        this.async = true
      },
      showproduct (data) {
      },
      changeSend (data) {
        this.viewModel.push(data)
      }
    },
    watch: {
      viewModel: {
        deep: true,
        handler (val) {
          var scrollMessage = actions.getQuery(this, '.scroll-list-message')
          scrollMessage.exec(data => {
            if (data[0] && data[0].length > 0) {
              // this.scrollTop = data[0][data[0].length - 1].top
              var num = 0
              data[0].forEach(element => {
              })
              // ; (element => {
              //   num += element.height
              // })
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
	// #ifndef APP-PLUS  
  // app-plus-css
  .chat-message {
    .chat-scroll {
      width: 100%;
      .list-message {
        width: 80%;
        display: flex;
        min-height: 15px;
        margin: 5px 0;
        justify-content: flex-start;

        .user_image {
          height: 30px;
          width: 30px;
          margin: 0 10px;
          border-radius: 50%;
        }
        .user_message {
          max-width: 80%;
          display: inline-block;
          background: #f2f2f2;
          font-family: "KaiTi_GB2312";
          line-height: 15px;
          padding: 3px 10px;
          padding-right: 5px;
          padding-top: 7px;
          border-radius: 0 15px 15px 15px;
        }
      }
      .right {
        float: right;
        justify-content: flex-end;
        .user_message {
          border-radius: 15px 0 15px 15px;
        }
      }
    }
  }
  // app-plus-css
  // #endif
</style>
