<template>
	<div class="footer">
	    <div class="footer-container">
	    	<img :src="playingCoverImgUrl" alt="">
	    	<div class="song-des">
	    		<span class="song-name">理想三巡</span>
	    		<span class="singer">邪春花</span>
	    	</div>
	    	<div class="play">
	    		<i class="iconfont icon-iconset0481"></i>
	    	</div>
	    	<div class="play-list">
	    		<i class="iconfont icon-zhankaicaidan"></i>
	    	</div>
	    </div>
	</div>
</template>
<script>
	export default {
		name: '',
		data () {
			return {
				playingCoverImgUrl: '../src/assets/images/logo.png'
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
	}
</style>