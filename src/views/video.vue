<template>
	<div class="video" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
	    <div class="vido-group" v-for="item in videoInfo" :key="item.id">
	    	<div class="video-cover" v-bind:style="{backgroundImage: 'url('+item.src+')'}">
	    		<div class="uplaoder-info">
	    			<img :src="item.uploaderPic" alt="">
	    			<span class="uploader-name">{{item.uploader}}</span>
	    		</div>
	    		<span class="video-label">{{item.label}}</span>
	    		<span class="video-num"><i class="iconfont icon-bofangsanjiaoxing"></i> {{item.num}}</span>
	    		<span class="video-time"><i class="iconfont icon-paixingbang"></i> {{item.time}}</span>
	    		<div class="play-face">
	    			<div class="play-btn"><i class="iconfont icon-bofang"></i></div>
	    		</div>
	    	</div>
	    	<div class="video-bottom-group">
	    		<p class="video-des text-ellipsis2">{{item.des}}</p>
	    		<div class="praise">
	    			<i class="iconfont icon-like"></i>
	    			<span>{{item.praiseNum}}</span>
	    		</div>
	    		<div class="comment">
	    			<i class="iconfont icon-pinglun"></i>
	    			<span>{{item.comment}}</span>
	    		</div>
	    		<i class="iconfont icon-gengduoxiao"></i>
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
	export default {
				data () {
			return {
				videoInfo: this.initCoverSheet(),
				loading: false,
				loadOver: false
			}
		},
		methods: {
			initCoverSheet(imgSrcs){
				if(imgSrcs != undefined){
					imgSrc = imgSrc.concat(imgSrcs);
				}
				for (var i = 0, videoInfo = []; i <= imgSrc.length-1; i++) {
					var num = Math.random()*90000;
					var index = parseInt(Math.random()*4);
					num = parseInt(num, 10);
					var uploaders = ['爱玩屎的阿拉蕾','马云的爸爸','麻花腾家的企鹅','音乐总菊'];
					var uploaderPics = ['music1.jpeg','xuezhiqian.jpeg','musiclogo.png','chengbi.jpeg'];
					var labels = ['流行乐','生活','舞蹈','二次元'];
					var desArr = ['曾经等你下课的人，现在带你回家了吗？','《放假在家不被爸妈嫌弃攻略》','《声临其境》中，唐国强完美诠释了一个演员的自我修养','当一个活着回来的少年'];
					var name = {
						id: i, 
						src:'../src/assets/images/'+imgSrc[i],
						num: num,
						praiseNum: parseInt(num/99),
						comment: parseInt(num/988),
						uploader: uploaders[index],
						label: labels[index],
						uploaderPic: '../src/assets/images/' + uploaderPics[index],
						time: '03:58',
						des: desArr[index]
					}
					videoInfo.push(name);
				};
				if(imgSrcs != undefined){
					this.videoInfo = videoInfo;
				}
				else{
					return videoInfo;
				}
			},
			loadMore() {
				if(imgSrc.length < 25){
					this.loading = true;
					setTimeout(() => {
					    var imgSrc1 = ['wangfei.jpeg','wangxinlin.jpeg','xuanya.jpeg','xuezhiqian.jpeg','music1.jpeg'];
					    this.initCoverSheet(imgSrc1);
					    this.loading = false;
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
	.video {
		padding-bottom: 50px;
	}
	.vido-group {
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
		.video-cover {
			position: relative;
			height: 180px;
			width: 100%;
		    background-size: cover;
		    background-position: center;
		    font-size: 13px;
		    color: #fff;
		    .uplaoder-info, .video-label,
			.video-num, .video-time, .play-face {
				position: absolute;
			}
		    .uplaoder-info {
		    	display: flex;
		    	flex-direction: row;
		    	align-items: center;
		    	top: 10px;
		    	left: 10px;
		    	letter-spacing: 1px;
		    	img {
		    		width: 30px;
		    		height: 30px;
		    		margin-right: 10px;
		    		background: #fff;
		    		border-radius: 50%;
		    	}

		    }
		    .video-label {
		    	top: 12px;
		    	right: 10px;
		    	border: 1px solid #fff;
		    	border-color: rgba(255,255,255,.5);
		    	padding: 3px 8px;
		    	border-radius: 25px;
		    	font-size: 11px;
		    	background-color: rgba(0,0,0,.3);
		    	index: 2;
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
				index: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				.play-btn {
					background: rgba(0,0,0,.3);
					border: 1px solid #fff;
					border-radius: 50%;
					width: 40px;
					height: 40px;
					line-height: 40px;
					i {
						font-size: 22px;
						margin-left: 5px;
					}
				}
		    }
		}
		.video-bottom-group {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			padding: 10px;
			text-align: left;
			.video-des {
				width: 55%;
			}
			.praise, .comment {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 0 10px;
				span {
					font-size: 11px;
					color: #9c9c9c;
				}
			}
			i {
				font-size: 20px;
			}
		}
	}
</style>