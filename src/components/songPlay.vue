<!-- 播放器组件
	接受参数：player: {}，播放器组件和页脚组件共用的数据对象，包含播放器显示隐藏属性，播放状态属性等
	向上级组件传递的事件：
						@songPaly="songPalyShow" //显示隐藏组件
						@play="play" //播放音乐
						@pause="pause"  //暂停音乐
						@nextsong="nextSong" //下一首音乐
        				@prevsong="prevSong"  //上一首音乐
        				@playway="playWay" //播放方式
        				@playSheet="showPlaySheet" //显示隐藏播放列表组件
-->

<template>
	<transition name="transitionName">
		<div class="song-play-bg" @click="" :style="{top: player.top, opacity: player.opa, backgroundImage: 'url('+ player.currentSong.cover +')'}">
			<div class="song-play-filter" :style="{backgroundImage: 'url('+ player.currentSong.cover +')'}"></div>
			<div class="song-play">
				<div class="status-bar"></div>
				<div class="song-play-head">
					<div class="right">
						<i class="iconfont icon-xitongfanhui" @click="songPalyHide"></i>
						<div>
							<p class="song-name">{{player.currentSong.name}}</p>
							<p class="songer">{{player.currentSong.songer}}</p>
						</div>
					</div>
					<i class="iconfont icon-iconfontzhizuobiaozhun20" @click="shareFn"></i>
				</div>
				<div class="song-content">
					<div class="stick" :style="{backgroundImage: 'url('+ stickBg +')', transform:'rotate('+ player.stickDeg +'deg)'}"></div>
					<div class="disc-cylindrical">
						<div class="disc-black-box" :class="{'anima-paused': player.playState}">
							<div class="disc" :style="{backgroundImage: 'url('+ player.currentSong.cover +')'}" @click="getLyrics"></div>
						</div>
					</div>
					<div class="song-other-operate">
						<i class="iconfont icon-aixin"></i>
						<i class="iconfont icon-xiazai1"></i>
						<i class="iconfont icon-pinglun"></i>
						<i class="iconfont icon-gengduoxiao"></i>
					</div>
					<i class="muted-handler iconfont" :class="mutedHandler" @click="mutedToggle"></i>
				</div>
				<div class="song-play-foot">
					<i class="iconfont" :class="playWayIcon" @click="playWay"></i>
					<i class="iconfont icon-48shangyishou main-play-btn" @click="prevSong"></i>
					<span class="play-btn">
						<i class="iconfont icon-bofang" @click="playSong" v-if="player.playState"></i>
						<i class="iconfont icon-zanting" @click="pauseSong" v-if="!player.playState"></i>
					</span>
					<i class="iconfont icon-49xiayishou main-play-btn" @click="nextSong"></i>
					<i class="iconfont icon-zhankaicaidan" @click="showPlaySheet"></i>
					<div class="progress-group">
						<span>{{player.currentTime}}</span>
						<mt-progress :value="player.playProgress" :bar-height="1"></mt-progress>
						<span>{{player.totalTime}}</span>
						<div class="progress-circle"></div>
					</div>
					<!-- <audio id="songPlayAudio" :src="audioSrc"></audio> -->
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	import Vue from 'vue'
	import { Toast } from 'mint-ui';

	var playWayNum = 1;//播放方式 1列表播放，2单曲循环，3随机

	export default {
		props: ['player'],
		data () {
			return {
				stickBg: this.staticSource+'images/stickbg.png',
				allSong: this.player.songSheet,
				mutedHandler: 'icon-laba-xianxing',
				playWayIcon: 'icon-fanhui-yuanshijituantubiao',
			}
		},
		methods: {
			songPalyShow(){
				//向父组件广播点击事件
				this.$emit('songPaly');
			},
			//隐藏播放器
			songPalyHide() {
				this.player.top = '100%';
				this.player.opa = 0;
			},
			playSong() {
				//向父组件广播播放事件
				this.$emit('play','song');
			},
			pauseSong() {
				//向父组件广播暂停事件
				this.$emit('pause');
			},
			//静音切换
			mutedToggle() {
				if(Vue.prototype.globalAudio.muted){
					Vue.prototype.globalAudio.muted = false;
					this.mutedHandler = 'icon-laba-xianxing';
				}
				else{
					Vue.prototype.globalAudio.muted = true;
					this.mutedHandler = 'icon-mutejingyin blue';
				}
			},
			//下一首
			nextSong() {
				//向父组件广播下一首歌曲事件
				this.$emit('nextsong');
			},
			//上一首
			prevSong() {
				//播放上一首歌曲
				this.$emit('prevsong');
			},
			getLyrics() {
				Toast('不要点了，米有歌词');
			},
			//播放列表的方式，单曲循环、列表循环，随机
			playWay() {
				playWayNum++;
				this.$emit('playway',playWayNum);
				if(playWayNum == 1){
					this.playWayIcon = 'icon-fanhui-yuanshijituantubiao';
					Toast('列表顺序播放');
				}
				if(playWayNum == 2){
					this.playWayIcon = 'icon-danquxunhuan';
					Toast('单曲循环');
				}
				if(playWayNum == 3){
					this.playWayIcon = 'icon-icon--';
					playWayNum = 0;
					Toast('随机播放');
				}
			},
			shareFn() {
				Toast({
				  message: '分享功能开发中,敬请期待',
				  position: 'top',
				  duration: 1000
				});
			},
			showPlaySheet() {
				this.$emit('playSheet');
			}
		}
	}
</script>
<style lang="scss">
	.song-play-filter {
	    -webkit-filter: blur(10px);
        -moz-filter: blur(10px);
        -ms-filter: blur(10px);    
        filter: blur(10px);	
        background-color: rgba(141, 141, 141, 0.35);
		background-blend-mode: darken;
		background-repeat: no-repeat;
	}
	.song-play-bg, .song-play, .song-play-filter {
		position: fixed;
		height: 100%;
		width: 100%;
		z-index: 4;
		background-size: cover;
		background-position: center;
		overflow: hidden;
		background-color: rgba(171,165,165,0.9);
		.song-play {
			background-color: rgba(0,0,0,0);

			.song-play-head {
				background-color: rgba(171,165,165,0.5);
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 5px 15px;
				color: #fff;
				text-align: left;
				.right {
					display: flex;
					align-items: center;
					div {
						padding-left: 15px;
						.songer {
							font-size: 12px;
							color: #c7c7c7;
						}
					}
				}
				i {
					font-size: 25px;
				}
			}

			.song-content {
				position: absolute;
				top: 44px;
				bottom: 90px;
				width: 100%;
				background-color: rgba(171,165,165,0.3);
				overflow: hidden;
				.disc-cylindrical, .disc-black-box, .disc {
					margin: 0 auto;
					border-radius: 50%;
					box-sizing: border-box;
				}
				.stick {
					position: absolute;
					top: -145px;
					width: 180px;
					height: 288px;
					left: 50%;
					margin-left: -90px;
					background-size: 90px 144px;
					background-position: 75px 128px;
					background-repeat: no-repeat;
					transition: all .4s ease; 
					z-index: 10;
				}
				.disc-cylindrical {
					position: relative;
					width: 240px;
					height: 240px;
					background-color: rgba(171,165,165,0.5);
					margin-top: 80px;
					.disc-black-box {
						position: absolute;
						top: 2%;
						left: 2%;
						width: 96%;
						height: 96%;
						background-color: rgba(0,0,0,1);
						animation:songRotate 5s linear infinite;
						.disc {
							position: absolute;
							top: 20%;
							left: 20%;
							width: 60%;
							height: 60%;
							background-color: red;
							background-size: cover;
							background-position: center;
						}
					}
				}
				.song-other-operate {
					position: absolute;
					bottom: 10px;
					width: 100%;
					display: flex;
					justify-content: space-around;
					padding: 0 50px;
					box-sizing: border-box;
					i {
						color: #fff;
						font-size: 26px;
						padding: 5px 10px;
					}
				}
				.muted-handler {
					position: absolute;
					top: 10px;
					right: 5px;
					color: #fff;
					font-size: 22px;
					padding: 0 10px;
				}
				.muted-handler.blue {
					color: #e02433;
				}
			}

			.song-play-foot {
				position: absolute;
				bottom: 0;
				height: 90px;
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 15px;
				box-sizing: border-box;
				background-color: rgba(171,165,165,0.3);
				.play-btn {
					box-sizing: border-box;
					border: 1px solid #fff;
					border-radius: 50%;
					width: 45px;
					height: 45px;
					padding-top: 8px;
					padding-left: 3px;
				}
				i {
					font-size: 24px;
					color: #fff;
				}
				i.main-play-btn {
					font-size: 30px;
				}
				.progress-group {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 0 7px;
					box-sizing: border-box;
					.mt-progress {
						height: 1px;
						width: 100%;
					}
					.progress-circle {
						
					}
					span {
						padding: 0 8px;
						transform: scale(0.7);
					}
					.mt-progress-progress {
						&:before, &:after {
							content: '';
							position: absolute;
							right: -7px;
							top: -8px;
							width: 15px;
							height: 15px;
							background-color: #fff;
							border-radius: 50%;
						}
						&:after {
							right: -1px;
							top: -1px;
							width: 2px;
							height: 2px;
							background-color: #26a2ff;
							margin: 0 auto;
						}
					}
				}
				
			}
			.status-bar {
				display: none;
			}
		}
	}
	@keyframes songRotate {
		0%   {transform:rotate(0deg);}
		100% {transform:rotate(360deg);}
	}
	.anima-paused {
		animation-play-state:paused !important;
		-webkit-animation-play-state:paused !important;
	}
</style>