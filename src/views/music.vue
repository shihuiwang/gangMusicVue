<template>
	<div id="home">
		<div class="swipe-box">
			<mt-swipe :auto="4000">
			  <mt-swipe-item v-for="src in imgs" :key="src.id">
			  	<div class="swipe-img-box">
			  		<img :src="src.src" alt="">
			  	</div>
			  </mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="circle-nav-list">
			<div class="circle-item">
				<i class="iconfont icon-shouyinji01"></i>
				<span>私人FM</span>
			</div>
			<div class="circle-item">
				<i class="iconfont icon-rili"></i>
				<span>每日推荐</span>
			</div>
			<div class="circle-item">
				<i class="iconfont icon-swticonyinle2"></i>
				<span>歌单</span>
			</div>
			<div class="circle-item">
				<i class="iconfont icon-paixingbang"></i>
				<span>排行榜</span>
			</div>
		</div>

		<song-sheet v-bind:sheetList="songSheet"></song-sheet>
		<mv-sheet v-bind:sheetList="mvSheet"></mv-sheet>

		<div class="advertisement">
			<div class="advertisement-img" v-bind:style="{backgroundImage: 'url('+advertisementImg+')'}">
				<span class="corner-num"></span>
			</div>
			<p class="advertisement-text text-ellipsis2">
				恋爱系Melody，不知觉已陷入暗恋之心','【纯音】余梦幻想舞·枫花雪蝉歌','唯美和风
			</p>
		</div>
		<text-image v-bind:textImage="textImage"></text-image>
		<router-link class="a-nav" to="">看视频，发现更多有趣内容 > </router-link>
	</div>

</template>
<script>
	import SongSheet from '../components/songSheet.vue'
	import MvSheet from '../components/mvSheet.vue'
	import TextImage from '../components/textImage.vue'
	export default {
		name: 'home',
		data () {
		    return {
		      imgs: this.imgInit(),
		      songSheet: this.initSongSheet(),
		      mvSheet: this.initMvSheet(),
		      advertisementImg: this.staticSource+'images/me1.jpg',
		      textImage: this.initImageText()
		    }
		},
		methods: {
			imgInit(){
				for (var i = 2, imgs = []; i <= 10; i++) {
					//this.staticSource定义在main.js
					var name = {id: i, src: this.staticSource+'images/yinyue'+i+'.jpeg'}
					imgs.push(name);
				};
				return imgs;
			},
			initSongSheet(){
				//生成模拟的歌单数据
				var imgSrc = ['girls.jpeg','LUHAN.jpeg','xuanya.jpeg','wuyuetian.jpeg','zhaolei.jpeg','wangxinlin.jpeg'];
				var titles = ['恋爱系Melody，不知觉已陷入暗恋之心','【纯音】余梦幻想舞·枫花雪蝉歌','唯美和风｜但盼风雨来，留你在心中','「日系纯音」☁︎温柔又美好'];
				for (var i = 0, imgs = []; i <= imgSrc.length-1; i++) {
					var num = Math.random()*1000;
					num = parseInt(num, 10);
					var index = parseInt(Math.random()*4);
					var name = {
						id: i, 
						src:this.staticSource+'images/'+imgSrc[i],
						num: num,
						title: titles[index]
					}
					if(i == 0) {
						name.type = '推荐歌单';
					}
					imgs.push(name);
				};
				return imgs;
			},
			initMvSheet(){
				//生成模拟的歌单数据
				var imgSrc = ['music1.jpeg','music2.jpeg'];
				var titles = ['恋爱系Melody，不知觉已陷入暗恋之心','【纯音】余梦幻想舞·枫花雪蝉歌','唯美和风｜但盼风雨来，留你在心中','「日系纯音」☁︎温柔又美好'];
				for (var i = 0, imgs = []; i <= imgSrc.length-1; i++) {
					var num = Math.random()*1000;
					num = parseInt(num, 10);
					var index = parseInt(Math.random()*4);
					var name = {
						id: i, 
						src:this.staticSource+'images/'+imgSrc[i],
						num: num,
						title: titles[index]
					}
					if(i == 0) {
						name.type = '独家放送';
					}
					imgs.push(name);
				};
				return imgs;
			},
			initImageText(){
				//生成模拟的歌单数据
				var imgSrc = ['sunyanzi.jpeg','chengbi.jpeg','zhangyixin.jpeg'];
				var titles = ['不知觉已陷入暗不知觉已陷入暗恋不知觉已陷入暗之心','【纯音】余梦幻想舞','唯美和风｜留你在心中','「日系」☁︎温柔又美好'];

				for (var i = 0, simData = {data:[]}; i <= imgSrc.length-1; i++) {
					var num = Math.random()*400;
					num = parseInt(num, 10);
					var index = parseInt(Math.random()*3);
					var name = {
						id: i, 
						src:this.staticSource+'images/'+imgSrc[i],
						texts: [titles[index], num]
					}
					simData.data.push(name);
				};

				simData.setting = {
					boxHeight: 80, //每一列容器的高度
					type: '精选专栏', //模块类型标题
					lastTextColor: '#9c9c9c', //文字的最后一行的颜色
					updateDate: false //是否显示图片处的文字漂浮
				}
				return simData;
			}
		},
		components: {
			SongSheet,
			MvSheet,
			TextImage
		}
	}
</script>
<style lang="scss">
	#home {
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
	.circle-nav-list {
		display: flex;
		justify-content: space-around;
		padding: 20px 0 40px 0;
		border-bottom: 1px solid #ddd;
		.circle-item {
			position: relative;
			border: 1px solid #26a2ff;
			border-radius: 50%;
			height: 50px;
			width: 50px;
			i {
				line-height: 50px;
				font-size: 24px;
				color: #26a2ff;
			}
			span {
				position: absolute;
				width: 100%;
				bottom: -20px;
				left: 0;
				text-align: center;
				font-size: 12px;
			}
		}
	}
	.advertisement {
		.advertisement-img {
			height: 150px;
			background-size: cover;
    		background-position: center;
		}
		.advertisement-text {
			text-align: left;
			padding: 8px;
			font-size: 13px;
		}
	}
	.a-nav {
		display: block;
		padding: 10px;
	}
</style>