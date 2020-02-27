<template>
	<view class="store-share" :style="{width: screenWidth + 'px', height: screenHeight + 'px'}">
		<view class="store-share-title">
			<shareTitle></shareTitle>
			<shareDetail></shareDetail>
		</view>
		<shareSwiper></shareSwiper>
		<shareButton></shareButton>
		<shareShow></shareShow>
	</view>
</template>

<script>
	import shareTitle from '../widgets/store/share/title'
	import shareDetail from '../widgets/store/share/detail'
	import shareSwiper from '../widgets/store/share/swiper'
	import shareButton from '../widgets/store/share/button'
	import shareShow from '../widgets/store/share/show'
	import ala from '@/service/ala'
	export default {
		components: {
			shareTitle,
			shareDetail,
			shareSwiper,
			shareButton,
			shareShow
		},
		data() {
			return {
				screenWidth: 0,
				screenHeight: 0
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.screenHeight = ala.screenHeight()
				this.screenWidth = ala.screenWidth()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.store-share{
		position: fixed;
		background-color: #FAFAFC;
		&-title {
			padding: 10px 20px;
		}
	}
</style>
