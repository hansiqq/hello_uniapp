<template>
	<view class="share-swiper">
		<view class=""></view>
			<swiper :style="{width: screenWidth + 'px'}" active-class="share-swiper-active" @change="changeSwiper" :circular="true" previous-margin="80px" next-margin="80px" class="share-swiper-cont">
				<swiper-item v-for="(item, index) in swiperList" class="share-swiper-cont-list" :key="index">
					<image @click="linkTo(item)" :src="item.image" :style="{width: screenWidth *0.45 + 'px'}" class="share-swiper-cont-image" :class="{'share-swiper-active-image': index == tabIndex}" />
				</swiper-item>
			</swiper>
	</view>
</template>

<script>
	import ala from '@/service/ala'
	export default {
		data() {
			return {
				swiperList: [
					{
						name: '欧乳房',
						image: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1141259048,554497535&fm=26&gp=0.jpg'
					},
					{
						name: '欧乳房',
						image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2140358855,3069820327&fm=26&gp=0.jpg'
					},
					{
						name: '欧乳房',
						image: 'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1713396441,1487163637&fm=26&gp=0.jpg'
					}
				],
				async: false,
				widgetModel: '',
				windowWidth: '',
				swiperBgColor: '#421f7d',
				curIndex: 0,
				listLen: 3,
				screenWidth: 0,
				tabIndex: 0
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.screenWidth = ala.screenWidth()
			},
			changeSwiper(ev) {
				this.tabIndex = ev.detail.current
			},
			linkTo(item) {
				ala.to(`/pages/nav/store/share_detail?image=${item.image}`)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.share-swiper{
		margin-top: 20px;
		/* #ifdef APP-PLUS */
		margin-top: 40px;
		 /* #endif */ 
		&-active{
			&-image {
				transform: scale(1.04,1.16);
				width: 150px;
				border-radius: 5px;
			}
		}
		&-cont {
			margin-top: 10px;
			height: 300px;
			&-list{
				padding-top: 20px;
				display: flex;
				justify-content: center;
			}
			&-image{
				height: 200px;
				/* #ifdef APP-PLUS */
				height: 250px;
				 /* #endif */ 
				width: 150px;
				background-color: #FFFFFF;
				transition: 0.5s;
				border-radius: 5px;
			}
		}
	}
	
	.hideAndShowDesc {
	  animation: descAnimation 0.3s ease 1;
	  -webkit-animation: descAnimation 0.3s ease 1;
	}
	
	
	@keyframes descAnimation {
	  0% {
	    opacity: 1;
	  }
	  25% {
	    opacity: 0.5;
	  }
	  50% {
	    opacity: 0;
	  }
	  75% {
	    opacity: 0.5;
	  }
	  100% {
	    opacity: 1;
	  }
	}
	@-webkit-keyframes descAnimation {
	  0% {
	    opacity: 1;
	  }
	  25% {
	    opacity: 0.5;
	  }
	  50% {
	    opacity: 0;
	  }
	  75% {
	    opacity: 0.5;
	  }
	  100% {
	    opacity: 1;
	  }
	}
</style>
