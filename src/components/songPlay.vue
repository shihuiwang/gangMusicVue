<template>
	<transition name="transitionName">
		<div class="song-play-bg" @click="" :style="{top: player.top, opacity: player.opa}">
			<div class="song-play">
				<div class="song-play-head">
					<div class="right">
						<i class="iconfont icon-didian1" @click="songPalyHide"></i>
						<div>
							<p class="song-name">理想三巡</p>
							<p class="songer">邪春花</p>
						</div>
					</div>
					<i class="iconfont icon-didian1"></i>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	export default {
		props: ['player'],
		data () {
			return {
				bgImg: '../src/assets/images/img5.jpg',
				headerImg: '../src/assets/images/wanglihong.jpeg'
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
		}
	}
</style>