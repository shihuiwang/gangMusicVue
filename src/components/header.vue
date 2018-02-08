<template>
	<div>
	    <mt-header fixed title="">
	        <mt-button v-on:click="openMenu" icon="i iconfont icon-caidan" slot="left"></mt-button>
	        <mt-button icon="i iconfont icon-sousuo" slot="right"></mt-button>
	    </mt-header>
	    <div class="header-main-icon-group">
	        <i class="iconfont icon-yinle201" v-on:click="personalCenter" v-bind:class="{active: isCenter}"></i>
	        <i class="iconfont icon-tubiaozhizuomoban" v-on:click="home" v-bind:class="{active: isHome}"></i>
	        <i class="iconfont icon-kehu" v-on:click="friendsTrends" v-bind:class="{active: isDynamic}"></i>
	    </div>
	</div>
</template>
<script>
	function changeTabState(_this,name) {
		_this.isCenter = false;
		_this.isHome = false;
		_this.isDynamic = false;
		_this[name] = true;
	}

	export default {
		data () {
			return {
				isCenter: false,
				isHome: true,
				isDynamic: false
			}
		},
		methods: {
			openMenu() {
				//console.log('点击了菜单按钮')
				this.$emit('openMenu');
			},
			personalCenter() {
				changeTabState(this,'isCenter');
				this.$router.push('personalCenter');
			},
			home() {
				changeTabState(this,'isHome');
				this.$router.push('/');
			},
			friendsTrends() {
				changeTabState(this,'isDynamic');
				this.$router.push('friendsTrends');
			}
		}
	}
</script>
<style lang="sass">
div .mint-header.is-fixed {
	z-index: 3;
}
	.header-main-icon-group {
		top: 0;
	    right: 90px;
	    left: 90px;
	    position: fixed;
	    z-index: 3;
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
