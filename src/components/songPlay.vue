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
					<div class="stick" :style="{backgroundImage: 'url('+ stickBg +')', transform:'rotate('+ player.stickDeg +'deg)'}"></div>
					<div class="disc-cylindrical">
						<div class="disc-black-box" :class="{'anima-paused': player.playState}">
							<div class="disc" :style="{backgroundImage: 'url('+ currentSong.cover +')'}" @click="getLyrics"></div>
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
					<i class="iconfont icon-fanhui-yuanshijituantubiao"></i>
					<i class="iconfont icon-48shangyishou main-play-btn" @click="prevSong"></i>
					<span class="play-btn">
						<i class="iconfont icon-bofang" @click="playSong" v-if="player.playState"></i>
						<i class="iconfont icon-zanting" @click="pauseSong" v-if="!player.playState"></i>
					</span>
					<i class="iconfont icon-49xiayishou main-play-btn" @click="nextSong"></i>
					<i class="iconfont icon-zhankaicaidan"></i>
					<div class="progress-group">
						<span>{{currentTime}}</span>
						<mt-progress :value="playProgress" :bar-height="1"></mt-progress>
						<span>{{totalTime}}</span>
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

	var totalTime = '00:00';
	var songPlayAudio = Vue.prototype.globalAudio;
/*
	var ontimeupdate = function(_this) {
		var _this = _this;
		//console.info('播放时间发生改变：'+songPlayAudio.currentTime, songPlayAudio.duration);
	    //console.info('播放进度：'+(footAudio.currentTime/footAudio.duration).toFixed(2)*100+'%');
	    _this.playProgress = (songPlayAudio.currentTime/songPlayAudio.duration).toFixed(2)*100;

	    var all = songPlayAudio.currentTime.toFixed(2);
		var time = (all/60).toFixed(1).split('.');
		_this.currentTime = (time[0]<10?('0' + time[0]):time[0]) + ':' + (time[1]<10?('0' + time[1]):time[1]);
	}

	var onpause = function(_this) {
		var _this = _this;
		//console.info('暂停播放：' + footAudio.currentTime);
	    _this.isPlaying = false;
	    _this.playState = true;
	    _this.player.stickDeg = '-15';
	    if(songPlayAudio.duration <= songPlayAudio.currentTime){
	    	_this.playProgress = 0;
	    	//console.log(_this.player.songSheet,_this.player.songSheet.length);

	    	//播放下一首歌曲
	    	_this.currentSongIndex = _this.currentSongIndex + 1;
	    	if(_this.currentSongIndex > _this.player.songSheet.length){
	    		Toast({
				  message: '列表歌曲已经全部播放',
				  position: 'bottom',
				  duration: 3000
				});
				return;
	    	}
	    	var currentSong = _this.player.songSheet[_this.currentSongIndex];
	    	var audioSrc = '../src/assets/audio/' + currentSong.songer + ' - ' + currentSong.name + '.mp3';
	    	_this.audioSrc = audioSrc;
	    	_this.currentSong = currentSong;
	    	setTimeout(() => {
			    songPlayAudio.src = _this.audioSrc;
			    songPlayAudio.play();
			    songPlayAudio.ontimeupdate = function (e) {
				    ontimeupdate(_this);
				}
				songPlayAudio.onpause = function () {
					//歌曲播放完成后自动执行暂停
				    onpause(_this);
				}
				songPlayAudio.onplay = function () {
				    //console.info('开始播放：' + footAudio.currentTime);
				    onplay(_this);
				}
			}, 200);
	    	return;
	    }
	}

	var onplay = function(_this) {
		var _this = _this;
		_this.player.stickDeg = '7';
		_this.isPlaying = true;
		_this.playState = false;
		//获取不到总时长时要进行不断查询来获取时间
		if(isNaN(songPlayAudio.duration)) {
			_this.totalTime = '00:00';

			var getTotalTime = function() {
				if(songPlayAudio.duration == NaN) {
					setTimeout(() => {
						getTotalTime();
					},100);
				}
				var all = songPlayAudio.duration.toFixed(2);
	    		var time = (all/60).toFixed(1).split('.');
	    		_this.totalTime = (time[0]<10?('0' + time[0]):time[0]) + ':' + (time[1]<10?('0' + time[1]):time[1]);
			}

			setTimeout(() => {
				getTotalTime();
			},100);
		}
		else{
			//正常获取总时长
			var all = songPlayAudio.duration.toFixed(2);
    		var time = (all/60).toFixed(1).split('.');
    		_this.totalTime = (time[0]<10?('0' + time[0]):time[0]) + ':' + (time[1]<10?('0' + time[1]):time[1]);
		}
	}*/

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
				
				
				
				currentSong: this.player.songSheet[0],
				allSong: this.player.songSheet,
				currentSongIndex: 0,
				audioSrc: '../src/assets/audio/'+this.player.songSheet[0].songer+' - '+this.player.songSheet[0].name+'.mp3',
				totalTime: totalTime,
				playProgress: 0,
				currentTime: '00:00',
				mutedHandler: 'icon-laba-xianxing',
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
				//向父组件广播播放事件
				this.$emit('play','song');
				/*Vue.prototype.songPalying = true;
				
				console.log('11b');
				songPlayAudio = Vue.prototype.globalAudio;
				if(!songPlayAudio.src) {
					songPlayAudio.src = this.audioSrc;
				}
				songPlayAudio.play();
				var _this = this;
				songPlayAudio.ontimeupdate = function (e) {
				    ontimeupdate(_this);
				}
				songPlayAudio.onpause = function () {
					//歌曲播放完成后自动执行暂停
				    onpause(_this);
				}
				songPlayAudio.onplay = function () {
				    //console.info('开始播放：' + footAudio.currentTime);
				    onplay(_this);
				}*/
			},
			pauseSong() {

				//向父组件广播暂停事件
				this.$emit('pause');

				//songPlayAudio.pause();
			},
			mutedToggle() {
				console.log(this.isPlaying);
				if(songPlayAudio.muted){
					songPlayAudio.muted = false;
					this.mutedHandler = 'icon-laba-xianxing';
				}
				else{
					songPlayAudio.muted = true;
					this.mutedHandler = 'icon-mutejingyin blue';
				}
			},
			//下一首
			nextSong() {
				//播放下一首歌曲
				var _this = this;
				_this.player.isPlaying = true;
			    _this.player.playState = false;
			    _this.player.stickDeg = '7';

		    	_this.currentSongIndex = _this.currentSongIndex + 1;
		    	if(_this.currentSongIndex >= _this.player.songSheet.length){
		    		Toast({
					  message: '列表歌曲已经全部播放',
					  position: 'bottom',
					  duration: 3000
					});
					return;
		    	}
		    	var currentSong = _this.player.songSheet[_this.currentSongIndex];
		    	var audioSrc = '../src/assets/audio/' + currentSong.songer + ' - ' + currentSong.name + '.mp3';
		    	_this.audioSrc = audioSrc;
		    	_this.currentSong = currentSong;
		    	setTimeout(() => {
		    		songPlayAudio = Vue.prototype.globalAudio;
		    		songPlayAudio.src = _this.audioSrc;
				    songPlayAudio.play();
					songPlayAudio.ontimeupdate = function (e) {
					    ontimeupdate(_this);
					}
					songPlayAudio.onpause = function () {
						//歌曲播放完成后自动执行暂停
					    onpause(_this);
					}
					songPlayAudio.onplay = function () {
					    //console.info('开始播放：' + footAudio.currentTime);
					    onplay(_this);
					}
				}, 200);
			},
			//上一首
			prevSong() {
				//播放上一首歌曲
				var _this = this;
				_this.player.isPlaying = true;
			    _this.player.playState = false;
			    _this.player.stickDeg = '7';

		    	_this.currentSongIndex = _this.currentSongIndex - 1;
		    	if(_this.currentSongIndex < 0){
		    		Toast({
					  message: '已经是第一首了',
					  position: 'bottom',
					  duration: 3000
					});
					return;
		    	}
		    	var currentSong = _this.player.songSheet[_this.currentSongIndex];
		    	var audioSrc = '../src/assets/audio/' + currentSong.songer + ' - ' + currentSong.name + '.mp3';
		    	_this.audioSrc = audioSrc;
		    	_this.currentSong = currentSong;
		    	setTimeout(() => {
		    		songPlayAudio = Vue.prototype.globalAudio;
		    		songPlayAudio.src = _this.audioSrc;
				    songPlayAudio.play();
				    songPlayAudio.ontimeupdate = function (e) {
					    ontimeupdate(_this);
					}
					songPlayAudio.onpause = function () {
						//歌曲播放完成后自动执行暂停
					    onpause(_this);
					}
					songPlayAudio.onplay = function () {
					    //console.info('开始播放：' + footAudio.currentTime);
					    onplay(_this);
					}
				}, 200);
			},
			getLyrics() {
				Toast('不要点了，米有歌词');
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
				.muted-handler {
					position: absolute;
					top: 10px;
					right: 5px;
					color: #fff;
					font-size: 22px;
					padding: 0 10px;
				}
				.muted-handler.blue {
					color: #26a2ff;
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