<template>
	<div class="footer">
	    <div class="footer-container">
	    	<img :src="playingCoverImgUrl" alt="" @click="songPalyShow">
	    	<div class="song-des" @click="songPalyShow">
	    		<span class="song-name">理想三巡</span>
	    		<span class="singer">邪春花</span>
	    	</div>
	    	<div class="play">
	    		<i class="iconfont icon-iconset0481" @click="audioPlay" v-if="!playing"></i>
	    		<i class="iconfont icon-plus-pause" @click="audioPause" v-if="playing"></i>
	    		<audio id="footAudio" :src="audioSrc"></audio>
	    	</div>
	    	<div class="play-list">
	    		<i class="iconfont icon-zhankaicaidan"></i>
	    	</div>
	    </div>
	    <mt-progress :value="playProgress" :bar-height="1"></mt-progress>
	</div>
</template>
<script>
	window.onload = function(){
		var footAudio = document.querySelector('#footAudio');
		//监听事件
		/*footAudio.oncanplay = function () {
		    console.info('进入可播放状态,音频总长度:' + footAudio.duration);
		}
		footAudio.onplay = function () {
		    console.info('开始播放：' + footAudio.currentTime);
		}
		footAudio.onpause = function () {
			//歌曲播放完成后自动执行暂停
		    console.info('暂停播放：' + footAudio.currentTime);
		}
		footAudio.onprogress = function () {
		    console.info(footAudio.buffered);
		    console.info('正在播放：' + footAudio.currentTime);
		}*/
	}
	
	
	export default {
		name: '',
		data () {
			return {
				playingCoverImgUrl: '../src/assets/images/logo.png',
				audioSrc: '../src/assets/audio/horse.ogg',//谢春花 - 理想三旬 (Live).mp3,
				playing: false,
				paused: false,
				playProgress: 0
			}
		},
		methods: {
			audioPlay() {
				//var footAudio = document.querySelector('#footAudio');
				footAudio.play();
				this.playing = true;
				var _this = this;
				footAudio.ontimeupdate = function (e) {
				    //console.info('播放时间发生改变：'+footAudio.currentTime);
				    //console.info('播放进度：'+(footAudio.currentTime/footAudio.duration).toFixed(2)*100+'%');
				    _this.playProgress = (footAudio.currentTime/footAudio.duration).toFixed(2)*100;
				}
				footAudio.onpause = function () {
					//歌曲播放完成后自动执行暂停
				    //console.info('暂停播放：' + footAudio.currentTime);
				    _this.playing = false;
				    _this.playProgress = 0;
				}
			},
			audioPause() {
				footAudio.pause();
				this.playing = false;
				this.paused = true;
			},
			songPalyShow() {
				//向父组件广播点击事件
				this.$emit('songPaly');
			}
		}
	}
</script>
<style lang="sass">
	.footer {
		position: fixed;
		width: 100%;
		bottom: 0px;
		text-align: left;
		z-index: 2;
		.footer-container {
			background: #fff;
			height: 34px;
			padding: 8px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			img {
				width: 34px;
				height: 100%;
			}
			.song-des {
				flex-grow: 1;
				padding: 0 10px;
				span {
					display: block;
				}
				.singer {
					font-size: 12px;
					color: #9c9c9c;
				}
			}
			.play, .play-list {
				width: 50px;
				height: 30px;
				text-align: center;
				overflow: hidden;
				i {
					font-size: 30px;
				}
			}
		}
		.mt-progress {
			height: 1px;
			width: 100%;
			position: absolute;
			top: 0;
		}
	}
</style>