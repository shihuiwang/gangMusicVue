<template>
	<div class="friends-trends" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
		<div class="left-anchor not-before">
			<span>热门话题</span>
			<i class="iconfont icon-xiangyou"></i>
		</div>
		<div class="hot-topic">
			<div class="box" v-bind:style="{width: topicWidth + 'px'}">
				<div class="topic-item" v-for="(ite, index) in topicImgs" v-bind:style="{backgroundImage: 'url('+ite.src+')'}">
					<p>#你好，XXX了解以下#</p>
				</div>
				<div class="topic-item">
					<p>全部话题 ></p>
				</div>
			</div>
		</div>
		<div class="trends">
			<div class="trend-item" v-for="(item, index) in trendsData">
				<div class="trend-head">
					<div class="head-right">
						<img :src="item.uploaderPic" alt="" class="head-img">
						<div>
							<p><span class="user-name">{{item.uploader}}</span><span>发布视频:</span></p>
							<p class="publish-time">最近</p>
						</div>
					</div>
					<span class="care-btn"><span>+</span> 关注</span>
				</div>
				<div class="trend-content">
					<p class="title">{{item.des}}</p>
					<div class="trend-cover" v-bind:style="{backgroundImage: 'url('+item.src+')', width: !item.faceView&&'80%',height: !item.faceView&&'130px'}">
						<span class="video-num" v-if="item.faceView"><i class="iconfont icon-bofangsanjiaoxing"></i>{{item.num}}</span>
			    		<span class="video-time" v-if="item.faceView"><i class="iconfont icon-paixingbang"></i>{{item.time}}</span>
			    		<div class="play-face" v-if="item.faceView">
			    			<div class="play-btn"><i class="iconfont icon-bofang"></i></div>
			    		</div>
					</div>
				</div>
				<div class="trend-foot">
		    		<div class="praise">
		    			<i class="iconfont icon-like"></i>
		    			<span>{{item.praiseNum}}</span>
		    		</div>
		    		<div class="comment">
		    			<i class="iconfont icon-pinglun"></i>
		    			<span>{{item.comment}}</span>
		    		</div>
		    		<div class="comment">
		    			<i class="iconfont icon-iconfontzhizuobiaozhun20"></i>
		    			<span>{{item.shareNum}}</span>
		    		</div>
		    		<i class="iconfont icon-gengduoxiao"></i>
				</div>
			</div>
		</div>
		<div class="Infinite-scroll-item" v-if="loading">
	    	<mt-spinner type="fading-circle" color="#26a2ff"></mt-spinner>
	    	<span>努力加载中...</span>
	    </div>
	    <div class="Infinite-scroll-item load-over" v-if="loadOver">
	    	<span>已全部加载</span>
	    </div>
	</div>
</template>
<script>
	var imgSrc = ['wangfei.jpeg','wangxinlin.jpeg','xuanya.jpeg','xuezhiqian.jpeg','music1.jpeg'];
	function initTrendsData(imgSrcs,_this){
		if(imgSrcs != undefined){
			imgSrc = imgSrc.concat(imgSrcs);
		}
		for (var i = 0, videoInfo = []; i <= imgSrc.length-1; i++) {
			var num = Math.random()*90000;
			var index = parseInt(Math.random()*4);
			var trendType = 'videoText';//视频文字
			var faceView = true;
			num = parseInt(num, 10);
			if(num%2 ==0) {
				//偶数
				trendType = 'imageText';//图文
				faceView = false;
			}
			var uploaders = ['爱玩屎的阿拉蕾','马云的爸爸','麻花腾家的企鹅','音乐总菊'];
			var uploaderPics = ['music1.jpeg','xuezhiqian.jpeg','musiclogo.png','chengbi.jpeg'];
			var desArr = ['曾经等你下课的人，现在带你回家了吗？','《放假在家不被爸妈嫌弃攻略》','《声临其境》中，唐国强完美诠释了一个演员的自我修养','当一个活着回来的少年','当房东的猫遇上动漫，看完你想去狗带吗？'];
			var name = {
				id: i, 
				src:'../src/assets/images/'+imgSrc[i],
				num: num,
				praiseNum: parseInt(num/99),
				comment: parseInt(num/988),
				shareNum: parseInt(num/50),
				uploader: uploaders[index],
				uploaderPic: '../src/assets/images/' + uploaderPics[index],
				time: '03:58',
				des: desArr[index],
				type: trendType, //暂时保留的无用字段
				faceView: faceView
			}
			videoInfo.push(name);
		};
		if(_this && imgSrcs != undefined){
			_this.trendsData = videoInfo;
		}
		else{
			return videoInfo;
		}
	}

	function topicInit(){
		for (var i = 4, imgs = []; i <= 10; i++) {
			var name = {id: i, src:'../src/assets/images/yinyue'+i+'.jpeg'}
			imgs.push(name);
		};
		return imgs;
	}
	export default {
		data () {
			return {
				img: '../src/assets/images/xuanya.jpeg',
				trendsData: initTrendsData(),
				topicImgs: topicInit(),
				topicWidth: topicInit().length*153+153,
				loading: false,
				loadOver: false
			}
		},
		methods: {
			loadMore() {
				if(imgSrc.length < 100){
					this.loading = true;
					var _this = this;
					setTimeout(() => {
					    var imgSrc1 = ['wangfei.jpeg','wangxinlin.jpeg','xuanya.jpeg','xuezhiqian.jpeg','music1.jpeg'];
					    initTrendsData(imgSrc1,_this);
					    this.loading = false;
					    console.log(123);
					}, 2500);
				}
				else{
					this.loading = false;
					this.loadOver = true;
				}
			}
		}
	}
</script>
<style lang="sass">
	.friends-trends {
		padding-bottom: 50px;
	}
	.left-anchor {
		padding-left: 10px;
		border: none;
	}
	.hot-topic {
		height: 80px;
		overflow-x: scroll;
		padding-left: 10px;
		padding-bottom: 20px;
		border-bottom: 1px solid #ddd;
		&::-webkit-scrollbar {display:none}
		div.box {
			height: 100%;
			width: 1000px;
		}
		.topic-item {
			height: 100%;
			width: 150px;
			float: left;
			margin-right: 3px;
			box-sizing: border-box;
			padding: 0 20px;
			display: flex;
			align-items: center;
			background-color: #ddd;
			background-size: cover;
    		background-position: center;
    		p {
    			color: #fff;
    		}
		}
	}
	.trend-item {
		border-bottom: 1px solid #ddd;
		.trend-head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 10px;
			img.head-img {
				width: 40px;
				height: 40px;
				border-radius: 50%;
			}
			.head-right {
				display: flex;
				align-items: flex-end;
				text-align: left;
				div {
					padding-left: 10px;
				}
				.user-name {
					color: #007305;
					margin-right: 10px;
				}
				.publish-time {
					font-size: 11px;
					color: #9c9c9c;
				}
			}
			.care-btn {
				color: #26a2ff;
			}
		}
		.trend-content {
			padding-left: 60px;
			padding-right: 10px;
			text-align: left;
			.title {
				padding-bottom: 10px;
			}
			.trend-cover {
				width: 100%;
				height: 150px;
				position: relative;
				background-size: cover;
    			background-position: center;
    			font-size: 13px;
				color: #fff;
				.video-num, .video-time, .play-face {
					position: absolute;
					z-index: 2;
				}
			    .video-num {
			    	bottom: 5px;
			    	left: 10px;
			    }
			    .video-time {
			    	bottom: 5px;
			    	right: 10px;
			    }
			    .play-face {
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					z-index: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: rgba(0,0,0,.4);
					.play-btn {
						background: rgba(0,0,0,.3);
						border: 1px solid #fff;
						border-radius: 50%;
						width: 40px;
						height: 40px;
						line-height: 40px;
						i {
							font-size: 22px;
							margin-left: 12px;
						}
					}
			    }
			
			}
		}
		.trend-foot {
			display: flex;
			padding: 20px 10px 15px 60px;
			justify-content: space-between; 
			.comment {
				display: flex;
				align-items: center;
			}
			span {
				font-size: 11px;
				color: #9c9c9c;
				margin-left: 5px;
			}
			i {
				font-size: 20px;
			}
		}
	}
	.Infinite-scroll-item {
		margin-top: 15px;
	}
</style>