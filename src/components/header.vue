<template>
	<div>
	    <mt-header fixed title="">
	        <mt-button v-on:click="openMenu" icon="i iconfont icon-caidan" slot="left"></mt-button>
	        <mt-button icon="i iconfont icon-sousuo" slot="right"></mt-button>
	    </mt-header>
	    <div class="header-main-icon-group">
	        <i class="iconfont icon-yinle201"></i>
	        <i class="iconfont icon-tubiaozhizuomoban active"></i>
	        <i class="iconfont icon-yinle201"></i>
	    </div>
	</div>
</template>
<script>
	export default {
		data () {
			return {

			}
		},
		methods: {
			openMenu() {
				//console.log('点击了菜单按钮')
				this.$emit('openMenu');
			}
		}
	}
</script>
<style lang="sass">
	.header-main-icon-group {
		top: 0;
	    right: 90px;
	    left: 90px;
	    position: fixed;
	    z-index: 1;
	    line-height: 40px;
	    i.iconfont {
			padding: 5px 10px;
			color: #fff;
			font-size: 28px;
			opacity: .6;
	    }
	    i.iconfont.active {
	    	opacity: 1;
	    }
	}
	.mint-header {
		i.iconfont {
			font-size: 25px;
		}
	}
</style>
