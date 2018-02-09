<template>
	<transition name="transitionName">
		<div class="song-play-bg" @click="" :style="{top: player.top, opacity: player.opa, backgroundImage: 'url('+ currentSong.cover +')'}">
			<div class="song-play">
				<div class="song-play-head">
					<div class="right">
						<i class="iconfont icon-xitongfanhui" @click="songPalyHide"></i>
						<div>
							<p class="song-name">{{currentSong.name}}</p>
							<p class="songer">{{currentSong.songer}}</p>
						</div>
					</div>
					<i class="iconfont icon-iconfontzhizuobiaozhun20"></i>
				</div>
				<div class="song-content">
					<div class="stick" :style="{backgroundImage: 'url('+ stickBg +')', transform:'rotate('+ stickDeg +'deg)'}"></div>
					<div class="disc-cylindrical">
						<div class="disc-black-box">
							<div class="disc" :style="{backgroundImage: 'url('+ currentSong.cover +')'}"></div>
						</div>
					</div>
					<div class="song-other-operate">
						<i class="iconfont icon-aixin"></i>
						<i class="iconfont icon-xiazai1"></i>
						<i class="iconfont icon-pinglun"></i>
						<i class="iconfont icon-gengduoxiao"></i>
					</div>
				</div>
				<div class="song-play-foot">
					<i class="iconfont icon-fanhui-yuanshijituantubiao"></i>
					<i class="iconfont icon-48shangyishou main-play-btn"></i>
					<span class="play-btn">
						<i class="iconfont icon-bofang" @click="playSong" v-if="playState"></i>
						<i class="iconfont icon-zanting" @click="pauseSong" v-if="!playState"></i>
					</span>
					<i class="iconfont icon-49xiayishou main-play-btn"></i>
					<i class="iconfont icon-zhankaicaidan"></i>
					<div class="progress-group">
						<span>{{currentTime}}</span>
						<mt-progress :value="playProgress" :bar-height="1"></mt-progress>
						<span>{{totalTime}}</span>
					</div>
					<audio id="songPlayAudio" :src="audioSrc"></audio>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	var totalTime = '00:00';
	window.onload = function(){
		var songPlayAudio = document.querySelector('#songPlayAudio');
		/*songPlayAudio.oncanplay = function () {
		    //console.info('进入可播放状态,音频总长度:' + songPlayAudio.duration);
		    var all = songPlayAudio.duration.toFixed(2);
		    var time = (all/60).toFixed(1).split('.');
		    totalTime = (time[0]<10?('0' + time[0]):time[0]) + ':' + (time[1]<10?('0' + time[1]):time[1]);
		}*/
	}
	export default {
		props: ['player'],
		data () {
			return {
				bgImg: '../src/assets/images/img5.jpg',
				headerImg: '../src/assets/images/wanglihong.jpeg',
				stickBg: '../src/assets/images/stickbg.png',
				stickDeg: '-15',
				isPlaying: false,
				playState: true,
				currentSong: this.player.songSheet[0],
				currentSongIndex: 0,
				audioSrc: '../src/assets/audio/'+this.player.songSheet[0].songer+' - '+this.player.songSheet[0].name+'.mp3',
				totalTime: totalTime,
				playProgress: 0,
				currentTime: '00:00'
			}
		},
		methods: {
			songPalyShow(){
				//向父组件广播点击事件
				this.$emit('songPaly');
			},
			songPalyHide() {
				this.player.top = '100%';
				this.player.opa = 0;
			},
			playSong() {
				//var footAudio = document.querySelector('#footAudio');
				songPlayAudio.play();
				//this.isPlaying = true;
				var _this = this;
				songPlayAudio.ontimeupdate = function (e) {
				    //console.info('播放时间发生改变：'+footAudio.currentTime);
				    //console.info('播放进度：'+(footAudio.currentTime/footAudio.duration).toFixed(2)*100+'%');
				    _this.playProgress = (songPlayAudio.currentTime/songPlayAudio.duration).toFixed(2)*100;

				    var all = songPlayAudio.currentTime.toFixed(2);
		    		var time = (all/60).toFixed(1).split('.');
		    		_this.currentTime = (time[0]<10?('0' + time[0]):time[0]) + ':' + (time[1]<10?('0' + time[1]):time[1]);
				}
				songPlayAudio.onpause = function () {
					//歌曲播放完成后自动执行暂停
				    //console.info('暂停播放：' + footAudio.currentTime);
				    _this.isPlaying = false;
				    _this.playState = true;
				    _this.playProgress = 0;
				    _this.stickDeg = '-15';
				}
				songPlayAudio.onplay = function () {
				    //console.info('开始播放：' + footAudio.currentTime);
				    _this.stickDeg = '7';
					_this.isPlaying = true;
					_this.playState = false;

					var all = songPlayAudio.duration.toFixed(2);
		    		var time = (all/60).toFixed(1).split('.');
		    		_this.totalTime = (time[0]<10?('0' + time[0]):time[0]) + ':' + (time[1]<10?('0' + time[1]):time[1]);
				}
			},
			pauseSong() {
				songPlayAudio.pause();
				this.stickDeg = '-15';
				this.isPlaying = false;
				this.playState = true;
			}
		}
	}
</script>
<style lang="sass">
	.song-play-bg, .song-play {
		position: fixed;
		height: 100%;
		width: 100%;
		z-index: 4;
		background-size: cover;
		background-position: center;
		.song-play {
			background-color: rgba(0,0,0,.8);

			.song-play-head {
				background-color: rgba(171,165,165,.7);
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
				background-color: rgba(171,165,165,.7);
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
					background-color: rgba(171,165,165,.8);
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
				background-color: rgba(171,165,165,.7);
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
					span {
						padding: 0 8px;
						transform: scale(0.7);
					}
				}
				
			}
		}
	}
	@keyframes songRotate {
		0%   {transform:rotate(0deg);}
		100% {transform:rotate(360deg);}
	}
</style>