<!-- 播放器组件
	接受参数：player: {}，播放器组件和页脚组件共用的数据对象，包含播放器显示隐藏属性，播放状态属性等
	向上级组件传递的事件：
						@songPaly="songPalyShow" //显示隐藏组件
						@play="play" //播放音乐
						@pause="pause"  //暂停音乐
						@playSheet="showPlaySheet" //显示隐藏播放列表组件
-->

<template>
	<div class="footer">
	    <div class="footer-container">
	    	<img :src="player.currentSong.cover" alt="" @click="songPalyShow">
	    	<div class="song-des" @click="songPalyShow">
	    		<span class="song-name">{{player.currentSong.name}}</span>
	    		<span class="singer">{{player.currentSong.songer}}</span>
	    	</div>
	    	<div class="play">
	    		<i class="iconfont icon-iconset0481" @click="audioPlay" v-if="player.playState"></i>
	    		<i class="iconfont icon-plus-pause" @click="audioPause" v-if="!player.playState"></i>
	    	</div>
	    	<div class="play-list" @click="showPlaySheet">
	    		<i class="iconfont icon-zhankaicaidan"></i>
	    	</div>
	    </div>
	    <mt-progress :value="player.playProgress" :bar-height="1"></mt-progress>
	</div>
</template>
<script>
	import Vue from 'vue'
	export default {
		props: ['player', 'playing'],
		name: '',
		data () {
			return {
				
			}
		},
		methods: {
			audioPlay() {
				//向父组件广播播放事件
				this.$emit('play','foot');
			},
			audioPause() {
				//向父组件广播暂停事件
				this.$emit('pause');
			},
			songPalyShow() {
				//向父组件广播点击事件
				this.$emit('songPaly');
			},
			showPlaySheet() {
				this.$emit('playSheet');
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