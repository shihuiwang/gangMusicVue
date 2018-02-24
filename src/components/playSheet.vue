<!-- 当前播放列表组件
	接受参数：player: {}，播放器组件和页脚组件共用的数据对象，包含播放器显示隐藏属性，播放状态属性等
	向上级组件传递的事件：
						@songPaly="songPalyShow" //显示隐藏组件
						@play="play" //播放音乐
						@pause="pause"  //暂停音乐
						@nextsong="nextSong" //下一首音乐
        				@prevsong="prevSong"  //上一首音乐
        				@playway="playWay" //播放方式
-->

<template>
	<transition name="transitionName">
		<div class="play-sheet-bg" @click="" :style="{top: playesheet.top, opacity: playesheet.opa}">
			<div class="close-sheet" @click="palySheetHide"></div>
			<div class="play-sheet">
				<div class="sheet-head">
					<div class="left">
						<i class="iconfont icon-danquxunhuan"></i>
						<span>单曲循环(99)</span>
					</div>
					<div class="right">
						<div class="colle">
							<i class="iconfont icon-shoucang"></i>
							<span>收藏全部</span>
						</div>
						<i class="iconfont icon-dustbin_icon"></i>
					</div>
				</div>
				<div class="sheet-content">
					<div class="sheet-content-item" v-for="(item, index) in playesheet.songSheet">
						<div class="left" :class="{active: index == currentindex}" @click="playSong(index)">
							<i class="iconfont icon-laba-xianxing" v-if="index == currentindex"></i>
							<span>{{item.name}}</span>
							<span class="songer">- {{item.songer}}</span>
						</div>
						<div class="right icon-group">
							<i class="iconfont icon-xiazai8" v-if="index == 2"></i>
							<i class="iconfont icon-chahao"></i>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		props: ['playesheet','currentindex'],
		data () {
			return {
				stickBg: this.staticSource+'images/stickbg.png',
				mutedHandler: 'icon-laba-xianxing',
				playWayIcon: 'icon-fanhui-yuanshijituantubiao',
			}
		},
		methods: {
			palySheetHide() {
				this.playesheet.top = '100%';
				this.playesheet.opa = 0;
			},
			playSong(index) {
				this.$emit('playsong',index);
			}
		}
	}
</script>

<style lang="scss">
	.play-sheet-bg, .play-sheet {
		position: fixed;
		height: 100%;
		width: 100%;
		z-index: 5;
		background-size: cover;
		background-position: center;
		overflow: hidden;
		background-color: rgba(0,0,0,0.7);
		.play-sheet {
			position: absolute;
			background-color: #fff;
			top: 40%;
			height: 60%;
			padding: 10px;
			box-sizing: border-box;
			overflow: scroll;
			padding-top: 55px;
			&::-webkit-scrollbar {display:none}
			.sheet-head {
				position: absolute;
				top: 0;
				height: 55px;
				left: 0;
				right: 0;
				padding: 0 10px;
				box-sizing: border-box;
				background-color: #fff;
				z-index: 6;
			}
			.sheet-head, .sheet-content-item {
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #ddd;
				.left, .right {
					display: flex;
					align-items: center;
					&>span {
						padding-left: 5px;
					}
				}
				.right {
					.colle {
						padding-right: 10px;
						border-right: 1px solid #ccc;
						border-right: 1px solid #ccc;
					}
					&>i {
						padding-left: 10px;
					}
				}
			}
			.sheet-content-item {
				padding: 0;
				.songer {
					font-size: 11px;
					color: #9c9c9c;
					transform: scale(0.8);
				}
				.left {
					align-items: flex-end;
					padding: 12px 0;
				}
				.left.active {
					color: #26a2ff;
					.songer {
						color: #26a2ff;
					}
				}
			}
		}
		.close-sheet {
			position: absolute;
			top: 0;
			height: 40%;
			width: 100%;
		}
	}
</style>