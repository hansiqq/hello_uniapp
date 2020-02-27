<template>
  <view class="content">
    <view class="hideCanvasView">
      <canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{ width: (poster.width || 0) + 'px', height: (poster.height || 0) + 'px' }"></canvas>
    </view>
  </view>
</template>

<script>
import ala from '@/service/ala.js'
import qr from '@/service/api/tool/qrcode/QS-SharePoster.js'
export default {
  data() {
    return {
      poster: {},
      canvasId: 'default_PosterCanvasId'
    }
  },
  onLoad() {
    uni.clearStorage()
  },
  methods: {
    async init(data) {
		console.info('data', data)
		var respones = await ala.createQrCode(this, data)
      this.$emit('showImage', respones.poster)
    }
  }
}
</script>

<style>
.hideCanvasView {
  position: relative;
}

.hideCanvas {
  position: fixed;
  top: -99999upx;
  left: -99999upx;
  z-index: -99999;
}

.flex_row_c_c {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.modalView {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  outline: 0;
  transform: scale(1.2);
  perspective: 2500upx;
  background: rgba(0, 0, 0, 0.6);
  transition: all 0.3s ease-in-out;
  pointer-events: none;
  backface-visibility: hidden;
  z-index: 999;
}

.modalView.show {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}

.flex_column {
  /* display: flex; */
  flex-direction: column;
}

.backgroundColor-white {
  background-color: white;
}

.border_radius_10px {
  border-radius: 10px;
}

.padding1vh {
  padding: 1vh;
}

.posterImage {
  width: 40vw;
}

.flex_row {
  display: flex;
  flex-direction: row;
}

.marginTop2vh {
  margin-top: 2vh;
}
</style>
