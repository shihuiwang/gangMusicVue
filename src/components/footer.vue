<template>
	<div class="footer">
	    <div class="footer-container">
	    	<img :src="currentSong.cover" alt="" @click="songPalyShow">
	    	<div class="song-des" @click="songPalyShow">
	    		<span class="song-name">{{currentSong.name}}</span>
	    		<span class="singer">{{currentSong.songer}}</span>
	    	</div>
	    	<div class="play">
	    		<i class="iconfont icon-iconset0481" @click="audioPlay" v-if="!playing"></i>
	    		<i class="iconfont icon-plus-pause" @click="audioPause" v-if="playing"></i>
	    	</div>
	    	<div class="play-list">
	    		<i class="iconfont icon-zhankaicaidan"></i>
	    	</div>
	    </div>
	    <mt-progress :value="playProgress" :bar-height="1"></mt-progress>
	</div>
</template>
<script>
	import Vue from 'vue'
	export default {
		props: ['player', 'playing'],
		name: '',
		data () {
			return {
				paused: false,
				playProgress: 0,
				currentSong: this.player.songSheet[0],
				allSong: this.player.songSheet,
				currentSongIndex: 0,
				audioSrc: '../src/assets/audio/'+this.player.songSheet[0].songer+' - '+this.player.songSheet[0].name+'.mp3',
			}
		},
		methods: {
			audioPlay() {
				Vue.prototype.footPalying = true;
				//向父组件广播播放事件
				this.$emit('play','foot');
				console.log('11c');
				if(!globalAudio.src) {
					globalAudio.src = this.audioSrc;
				}
				globalAudio.play();
				//this.playing = true;
				var _this = this;
				globalAudio.ontimeupdate = function (e) {
				    //console.info('播放时间发生改变：'+globalAudio.currentTime);
				    //console.info('播放进度：'+(globalAudio.currentTime/globalAudio.duration).toFixed(2)*100+'%');
				    _this.playProgress = (globalAudio.currentTime/globalAudio.duration).toFixed(2)*100;
				}
				globalAudio.onpause = function () {
					//歌曲播放完成后自动执行暂停
				    //console.info('暂停播放：' + globalAudio.currentTime);
				    //_this.playing = false;
				    _this.playProgress = 0;
				}
			},
			audioPause() {
				//向父组件广播暂停事件
				this.$emit('pause');

				globalAudio.pause();
				//this.playing = false;
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