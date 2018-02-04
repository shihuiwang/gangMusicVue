<template>
	<div id="menu" v-if="action.boxShow">
		<transition name="fade">
		    <div class="menu-mask" v-if="action.show" v-on:click="toggleMask"></div>
		</transition>
		<transition name="transitionName">
		    <div class="menu menu-main" :style="{left: action.left}">
		    	<div class="bg-img" v-bind:style="{backgroundImage: 'url('+bgImg+')'}">
		    		<img :src="headerImg" alt="">
		    		<p>
		    			<span class="name">爱玩屎的阿拉蕾</span>
		    			<span class="level">lv.888</span>
		    			<span class="qiandao"><i class="iconfont icon-916caidan_fenceng"></i>签到</span>
		    		</p>
		    	</div>
		    	<div class="ul-group">
		    		<ul class="one">
			    		<li><i class="iconfont icon-mail"></i>我的消息</li>
			    		<li><i class="iconfont icon-vip"></i>VIP会员</li>
			    		<li><i class="iconfont icon-cart"></i>商城</li>
			    		<li><i class="iconfont icon-zhuanqugengduoliuliang"></i>在线听歌免流量</li>
			    	</ul>
			    	<ul class="two">
			    		<li><i class="iconfont icon-ren"></i>我的好友</li>
			    		<li><i class="iconfont icon-didian1"></i>附近的人</li>
			    	</ul>
			    	<ul class="three">
			    		<li><i class="iconfont icon-yifu"></i>个性换肤</li>
			    		<li><i class="iconfont icon-techreport-"></i>听歌识曲</li>
			    		<li><i class="iconfont icon-shizhong"></i>定时停止播放</li>
			    		<li><i class="iconfont icon-saoyisao"></i>扫一扫</li>
			    		<li><i class="iconfont icon-naozhong"></i>音乐闹钟</li>
			    		<li><i class="iconfont icon-chepai"></i>驾驶模式</li>
			    		<li><i class="iconfont icon-yunzhanghu"></i>音乐云盘</li>
			    	</ul>
		    	</div>		    	<div class="footer">
			    	<div class="item">
			    		<i class="iconfont icon-iconset0454"></i>
			    		<span>夜间模式</span>
			    	</div>
			    	<div class="item">
			    		<i class="iconfont icon-shezhi"></i>
			    		<span>设置</span>
			    	</div>
			    	<div class="item">
			    		<i class="iconfont icon-iconset0253"></i>
			    		<span>退出</span>
			    	</div>
			    </div>
		    </div>
		</transition>
	</div>
</template>
<script>
	export default {
		props: ['action'],
		data () {
			return {
				bgImg: '../src/assets/images/img5.jpg',
				headerImg: '../src/assets/images/wanglihong.jpeg'
			}
		},
		methods: {
			toggleMask(){
				//向父组件广播点击事件
				this.$emit('toggleMenu');
			}
		}
	}
</script>
<style lang="sass">
	#menu {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 10;
		.menu-mask {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,.5);
		}
		.menu-main {
			position: absolute;
			top: 0;
			left: 0;
			width: 80%;
			height: 100%;
			background-color: #ddd;
			.bg-img {
				box-sizing: border-box;
				height: 160px;
				background-size: cover;
    			background-position: center;
    			padding: 80px 10px 0 10px;
    			text-align: left;
    			img {
    				width: 50px;
    				height: 50px;
    				border-radius: 50%;
    			}
    			p {
    				color: #fff;
    				font-size: 12px;
    				overflow: hidden;
    				span {
    					float: left;
    					margin-top: 2px;
    				}
    				.name {
    					margin: 0;
    					font-size: 14px;
    				}
    				.qiandao {
    					float: right;
    					border: 1px solid #fff;
    					border-radius: 25px;
    					padding: 0 5px;
    				}
    				.level {
    					border: 1px solid #fff;
    					border-radius: 25px;
    					transform: scale(.7);
    					padding: 0 5px;
    				}
    			}
			}
			.ul-group {
				position: absolute;
				top: 160px;
				bottom: 48px;
				width: 100%;
				line-height: 10%;
				overflow: scroll;
				ul.one,ul.two,ul.three {
					text-align: left;
					background-color: #fff;
					padding-left: 5px;
					line-height: 40px;
					li {
						i {
							font-size: 18px;
							margin-right: 10px;
						}
					}
				}
				ul.one,ul.two {
					margin-bottom: 2%;
				}
				ul.one,ul.three {
					li {
						display: flex;
						align-items: center;
					}
				}
				ul.two {
				}
			}
			.footer {
				position: fixed;
				bottom: 0;
				width: 80%;
				height: 48px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #fff;
				border-top: 1px solid #ddd;
				padding: 0 10px;
				box-sizing: border-box;
				i {
					font-size: 18px;
					margin-right: 5px;
				}
			}
		}
	}
</style>