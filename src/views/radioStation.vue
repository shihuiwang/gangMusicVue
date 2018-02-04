<template>
	<div class="radio-station">
	    <div class="swipe-box">
			<mt-swipe :auto="4000">
			  <mt-swipe-item v-for="src in imgs" :key="src.id">
			  	<div class="swipe-img-box">
			  		<img :src="src.src" alt="">
			  	</div>
			  </mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="second-nav">
			<div class="second-nav-item first">
				<i class="iconfont icon-tubiaolunkuo-"></i>
				<span>电台分类</span>
			</div>
			<div class="second-nav-item">
				<i class="iconfont icon-paixing"></i>
				<span>电台排行</span>
			</div>
		</div>
		<image-text v-bind:imageText="imageText"></image-text>
		<song-sheet v-bind:sheetList="songSheet"></song-sheet>
	</div>
</template>
<script>
	import SongSheet from '../components/songSheet.vue'
	import imageText from '../components/imageText.vue'
	export default {
		name: 'home',
		data () {
		    return {
		      imgs: this.imgInit(),
		      songSheet: this.initSongSheet(),
		      imageText: this.initImageText()
		    }
		},
		methods: {
			imgInit(){
				for (var i = 4, imgs = []; i <= 10; i++) {
					var name = {id: i, src:'../src/assets/images/yinyue'+i+'.jpeg'}
					imgs.push(name);
				};
				return imgs;
			},
			initSongSheet(){
				//生成模拟的歌单数据
				var imgSrc = ['lijian.jpeg','music2.jpeg','musicPic1.jpeg','zhangyixin.jpeg','zhaolei.jpeg','wangxinlin.jpeg'];
				var titles = ['恋爱系Melody，不知觉已陷入暗恋之心','【纯音】余梦幻想舞·枫花雪蝉歌','唯美和风｜但盼风雨来，留你在心中','「日系纯音」☁︎温柔又美好'];
				for (var i = 0, imgs = []; i <= imgSrc.length-1; i++) {
					var num = Math.random()*1000;
					num = parseInt(num, 10);
					var index = parseInt(Math.random()*5);
					var name = {
						id: i, 
						src:'../src/assets/images/'+imgSrc[i],
						num: num,
						title: titles[index]
					}
					if(i == 0) {
						name.type = '个性电台推荐';
					}
					imgs.push(name);
				};
				return imgs;
			},
			initImageText(){
				//生成模拟的歌单数据
				var imgSrc = ['sunyanzi.jpeg','chengbi.jpeg','zhangyixin.jpeg'];
				var titles = ['娇享乐','婷婷施教-第一季','东北招引人'];
				var des2 = ['恋爱系Melody，不知觉已陷入暗恋之心','【纯音】余梦幻想舞·枫花雪蝉歌','唯美和风｜但盼风雨来，留你在心中','「日系纯音」☁︎温柔又美好'];
				var des1 = ['不知觉已陷入暗恋之心','【纯音】余梦幻想舞','唯美和风｜留你在心中','「日系」☁︎温柔又美好'];

				for (var i = 0, simData = {data:[]}; i <= imgSrc.length-1; i++) {
					var num = Math.random()*400;
					num = parseInt(num, 10);
					var index = parseInt(Math.random()*3);
					var name = {
						id: i, 
						src:'../src/assets/images/'+imgSrc[i],
						texts: [titles[index], des1[index], des2[index], num]
					}
					simData.data.push(name);
				};

				simData.setting = {
					boxHeight: 123, //每一列容器的高度
					type: '付费精品', //模块类型标题
					lastTextColor: '#d33a31', //文字的最后一行的颜色
					updateDate: true //是否显示图片处的文字漂浮
				}
					console.log(simData);
				return simData;
			}
		},
		components: {
			SongSheet,
			imageText
		}
	}
</script>
<style lang="sass">
	.radio-station {
		padding-bottom: 50px;
	}
	.swipe-box {
		height: 150px;
		.swipe-img-box {
			height: 100%;
			position: relative;
			overflow: hidden;
			img {
				width: 100%;
			}
		}
	}
	.second-nav {
		display: flex;
		flex-direction: row;
		border-bottom: 1px solid #ccc;
		padding: 10px 0;
		.second-nav-item {
			display: flex;
			align-items: center;
			font-size: 14px;
			width: 50%;
			justify-content: center;
			i {
				font-size: 35px;
				margin-right: 10px;
				color: #26a2ff;
			}
		}
		.first {
			border-right: 1px solid #ccc;
		}
	}
</style>