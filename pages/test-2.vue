<template>
	<view class="zk-swiper">
		<!-- 
			动态设置class 和 style 必须使用 "{}" 
			 style 中的margin-top 可以使用margionTop 驼峰式命名 或 'margin-top'
		 -->
		<view class="zk-swiper-title" :style="{width: screenWidth +'px', height: screenHeight +'px'}">
			<view class="zk-swiper-title-left"></view>
		</view>
		<image class="zk-swiper-image" src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1035415831,1465727770&fm=26&gp=0.jpg" />
	</view>
</template>

<script>
	export default {
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
				// 全屏设置
				this.screenWidth = uni.getSystemInfoSync().windowWidth
				this.screenHeight = uni.getSystemInfoSync().windowHeight
			}
		}
	}
</script>

<style lang="scss" scoped>
	/**
	 * css 编写规范 
	 * css里面display 不能使用,nvue自带flex布局
	 * 单位使用 px, upx不支持动态设置 
	 * 标注css使用scss编译模式
	 * 子级标签的class 前缀设置为父级标签的class 可以用 &符号匹配
	 * 子级标签必须加 "-" class名 等进行命名才能生效
	 * 图片需设置宽高 
	 * 
	 * 标签设置宽高100%是不生效的必须设置一个具体数值
	 * 文字展示必须使用text标签，不然app端无法改变文字大小和颜色
	 * 
	 */
	.zk-swiper{
		&-title{
			width: 100px;
			height: 100px;
			background-color: #007AFF;
			
			flex-direction: row;
			&-left{
				
			}
		}
		&-image{
			width: 100px;
			height: 100px;
		}
	}
</style>
