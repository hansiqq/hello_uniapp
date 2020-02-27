<template>
	<view class="share-swiper" v-if="async">
		<view class=""></view>
		<swiper :style="{width: screenWidth + 'px'}" active-class="share-swiper-active" @change="changeSwiper" :circular="true"
		 previous-margin="80px" next-margin="80px" class="share-swiper-cont">
			<swiper-item v-for="(item, index) in swiperList" class="share-swiper-cont-list" :key="index">
				<view :style="{width: screenWidth * 0.48 + 'px'}" class="share-swiper-cont-image" :class="{'share-swiper-active-image': index != tabIndex}">
					<image @click="linkTo(item)" :src="'http://b-api.baoduoduo.club' + item.image" class="share-swiper-cont-image" :class="{'share-swiper-active-image': index != tabIndex}"
					 :style="{width: screenWidth * 0.48 + 'px'}" />
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import ala from '@/service/ala'
	import api from '@/service/api.js'
	export default {
		data() {
			return {
				swiperList: [],
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
			async init() {
				this.screenWidth = ala.screenWidth()
				var para = {
					MaterialType: 2
				}
				var response = await api.entityList('Materials', para)
				this.swiperList = response
				this.getQrcode()
				this.async = true
			},
			changeSwiper(ev) {
				this.tabIndex = ev.detail.current
				this.getQrcode()
			},
			// 获取二维码信息
			async getQrcode() {
				var response = await ala.qrcode(this.swiperList[this.tabIndex].qrCodeBackImage)
				if (response) {
					var para = {
						backgroundUrl: 'http://b-api.baoduoduo.club' + this.swiperList[this.tabIndex].image,
						qrcodeList: JSON.parse(response.setting),
						swiperModel: this.swiperList[this.tabIndex]
					}
					this.$emit('getQrcode', para)
				}
			},
			linkTo(item) {
				ala.to(`/pages/nav/share/share_detail?data=${JSON.stringify(item)}`)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.share-swiper {
		margin-top: 20px;
		/* #ifdef APP-PLUS */
		margin-top: 40px;

		/* #endif */
		&-active {
			&-image {
				// transform: scale(1.04,1.16);
				transform: scale(0.96, 0.84);
				border-radius: 5px;
			}
		}

		&-cont {
			margin-top: 10px;
			height: 300px;

			&-list {
				padding-top: 20px;
				display: flex;
				justify-content: center;
			}

			&-image {
				height: 230px;
				/* #ifdef APP-PLUS */
				height: 280px;
				/* #endif */
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
