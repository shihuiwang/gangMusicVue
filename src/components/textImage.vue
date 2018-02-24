<!-- 图文组件（按文件名区分左图右文） -->
<!-- 接受一个对象类型的参数：textImage = {data:[],setting:{}}-->
<!-- 
setting:{
	boxHeight: 123, //每一列容器的高度,默认100px，数字类型
	type: '付费精品', //模块类型标题 必填不填则空
	lastTextColor: '#d33a31', //文字的最后一行的颜色
	updateDate: true //是否显示图片处的文字漂浮
} 
-->
<template>
	<div>
		<div class="left-anchor">
			<span>{{textImage.setting.type}}</span>
			<i class="iconfont icon-qianjin"></i>
		</div>
		<div class="image-text" :style="textImage.setting.boxHeight?{height: textImage.setting.boxHeight + 'px'}:{height:'100px'}" 
		v-for="item in textImage.data" :key="item.id">
			<div class="text-list">
				<p class="text-ellipsis2" v-for="(it,index) in item.texts"
				:style="(index+1) == item.texts.length? {color: textImage.setting.lastTextColor,fontSize: '11px'}:index == 0? {color: '#000',fontSize: '14px'}:'' ">
					<span v-if="(index+1) == item.texts.length">阅读</span>
					{{it}}
				</p>
			</div>
			<div class="image" v-bind:style="{backgroundImage: 'url('+item.src+')'}">
				<span class="date" v-if="textImage.setting.updateDate">02月03日更新</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['textImage']
	}
</script>
<style lang="scss">
	.left-anchor {
		border-bottom: 1px solid #ccc;
	}
	.image-text {
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		margin-bottom: 3px;
		border-bottom: 1px solid #ccc;
		.image {
			position: relative;
			width: 33%;
			height: 100%;
		    background-color: #ddd;
		    background-size: cover;
		    background-position: center;
		    .date {
		    	position: absolute;
		    	bottom: 6px;
		    	color: #fff;
		    	left: 8px;
		    	font-size: 11px;
		    }
		}
		.text-list {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 65%;
			padding: 5px 10px;
			p {
				text-align: left;
				font-size: 11px;
			}
			.title {
				font-size: 14px;
				color: #000;
			}
			.price {
				font-size: 14px;
				color: #26a2ff;
				.vip-price {
					font-size: 11px;
				}
			}
		}
	}
</style>