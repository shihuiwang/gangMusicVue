//personalCenter.vue
<template>
    <div>
    	<div class="ul-group">
    		<ul class="sys-list">
	    		<li>
	    			<i class="iconfont icon-yinle201"></i>
	    			<p>本地音乐 <span>(12)</span></p>
	    		</li>
	    		<li>
	    			<i class="iconfont icon-iconset0481"></i>
	    			<p>最近播放 <span>(170)</span></p>
	    		</li>
	    		<li>
	    			<i class="iconfont icon-download"></i>
	    			<p>下载管理 <span>(0)</span></p>
	    		</li>
	    		<li>
	    			<i class="iconfont icon-shouyinji01"></i>
	    			<p>我的电台 <span>(3)</span></p>
	    		</li>
	    		<li>
	    			<i class="iconfont icon-shangpinshoucang"></i>
	    			<p>我的收藏 <span>(2)</span></p>
	    		</li>
	    	</ul>
	    	<ul class="song-shett-list">
	    		<li>
	    			<p v-on:click="openSongSheet">
	    				<i class="iconfont" v-bind:class="{ 'icon-down': isOpen, 'icon-xiangyou': isClose }"></i>
	    				<span>创建的歌单</span>
	    				<span>(12)</span>
	    			</p>
	    			<i class="iconfont icon-shezhi" v-on:click="songAction('a')"></i>
	    		</li>
				<!-- 创建的歌单，手风琴张开效果的内容 -->
	    		<li class="new-sheet" v-if="isOpen" v-for="item in songList">
	    			<div class="sheet-item-r">
	    				<img class="sheet-img" :src="item.url" alt="">
	    				<div class="item-name">
	    					<p>{{item.name}}</p>
	    					<p class="sheet-num">{{item.num}} 首</p>
	    				</div>
	    			</div>
	    			<i class="iconfont icon-gengduoxiao"></i>
	    		</li>
				<!-- 歌单到这里结束—————————————————————— -->
	    		<li>
	    			<p v-on:click="openSongSheet1">
	    				<i class="iconfont" v-bind:class="{ 'icon-down': isOpen1, 'icon-xiangyou': isClose1 }"></i>
	    				<span>收藏的歌单</span>
	    				<span>(1)</span>
	    			</p>
	    			<i class="iconfont icon-shezhi" v-on:click="songAction('b')"></i>
	    		</li>
	    		<!-- 创建的歌单，手风琴张开效果的内容 -->
	    		<li class="new-sheet" v-if="isOpen1" v-for="item in colleList">
	    			<div class="sheet-item-r">
	    				<img class="sheet-img" :src="item.url" alt="">
	    				<div class="item-name">
	    					<p>{{item.name}}</p>
	    					<p class="sheet-num">{{item.num}} 首</p>
	    				</div>
	    			</div>
	    			<i class="iconfont icon-gengduoxiao"></i>
	    		</li>
				<!-- 歌单到这里结束—————————————————————— -->
	    	</ul>
    	</div>
    	<my-actionsheet :actions="actions" v-model="sheetVisible" cancelText=""></my-actionsheet>
    </div>
</template>
<script>
	import Vue from 'vue'
	import myActionsheet from '../components/myMint/actionsheet.vue'
	import { MessageBox } from 'mint-ui';

	var newImgs = ['girls.jpeg','LUHAN.jpeg','xuanya.jpeg'];
	var colleImgs = ['wangxinlin.jpeg'];
	var names = ['我喜欢的音乐','2016-4','不知道什么歌'];
	var actionThis = null;
	function initSongSheet(ar) {
		if(ar == 'new') {
			var imgs = newImgs;
		}
		if(ar == 'colle'){
			var imgs = colleImgs;
		}
		for(var i=0,list=[];i<imgs.length;i++){
			var item = {
				url: Vue.prototype.staticSource+'images/' + imgs[i],
				name: names[i],
				num: 64
			}
			list.push(item);
		}
		return list;
	}
	function actionCallback(e) {
		console.log(e.id);
		if(e.id == 'newSong') {
			MessageBox.prompt('1','新建歌单').then(({ value, action }) => {
			  	console.log(value,action);
			  	if(action == 'confirm'){
			  		if(value !='' && value !==null){
			  			var item = {
							url: this.staticSource+'images/LUHAN.jpeg',
							name: value,
							num: 0
						}
						actionThis.songList.push(item);
			  		}
			  	}
			});
		}
	}
	export default {
		data () {
			return {
				songList: initSongSheet('new'),
				colleList: initSongSheet('colle'),
				imgSrc: this.staticSource+'images/logo.png',
				isOpen: true,
				isClose: false,
				isOpen1: true,
				isClose1: false,
				actions: [],
				sheetVisible: false
			}
		},
		methods: {
			openSongSheet() {
				if(this.isOpen) {
					this.isOpen = false;
					this.isClose = true;
				}
				else{
					this.isOpen = true;
					this.isClose = false;
				}
			},
			openSongSheet1() {
				if(this.isOpen1) {
					this.isOpen1 = false;
					this.isClose1 = true;
				}
				else{
					this.isOpen1 = true;
					this.isClose1 = false;
				}
			},
			songAction(para) {
				actionThis = this;
				if(para == 'a'){
					//创建歌单的操作列表
					this.actions = [
						{id: 'newSong', name: '创建新歌单', method: actionCallback, title: '创建的歌单', icon: 'icon-tianjia'},
						{id: 'newSongManage', name: '歌单管理', method: actionCallback, icon: 'icon-liebiao'}
					]
				}
				if(para == 'b'){
					//收藏歌单的操作列表
					this.actions = [
						{id: 'colleSongManage', name: '歌单管理', method: actionCallback, title: '收藏的歌单', icon: 'icon-liebiao'}
					]
				}
				this.sheetVisible = true;
			}
		},
		components: {
			myActionsheet
		}
	}
</script>
<style lang="scss">
	.ul-group {
		width: 100%;
		line-height: 10%;
		overflow: scroll;
		ul.sys-list {
			text-align: left;
			background-color: #fff;
			padding-left: 15px;
			line-height: 40px;
			li {
				display: flex;
				i {
					font-size: 20px;
					margin-right: 10px;
					color: #26a2ff;
				}
				p {
					flex-grow: 1;
					border-bottom: 1px solid #ddd;
					span {
						display: inline-block;
						color: #9c9c9c;
						font-size: 11px;
						transform: scale(.8);
					}
				}
			}
		}
		ul.song-shett-list {
			text-align: left;
			background-color: #ddd;
			line-height: 25px;
			font-size: 13px;
			li,li.new-sheet {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-left: 15px;
				padding-right: 15px;
			}
			li.new-sheet {
				background-color: #fff;
				padding: 5px 20px 5px 5px;
				border-bottom: 1px solid #ddd;
				.sheet-item-r {
					display: flex;
				}
				.item-name {
					flex-grow: 1;
					margin-left: 10px;
					.sheet-num {
						font-size: 11px;
						color: #9c9c9c;
						transform: scale(.8);
						margin-left: -8px;
					}
				}
			}
			.sheet-img {
				width: 50px;
			 	height: 50px;
			 	background-color: #ccc;
			}
		}
	}
	.mint-msgbox-message {
		display: none;
	}
	.mint-msgbox-input input {
		height: 30px;
	}
</style>