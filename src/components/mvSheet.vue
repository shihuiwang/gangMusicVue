<template>
	<div>
		<div class="left-anchor">
			<span>{{sheetList[0].type}}</span>
			<i class="iconfont icon-qianjin"></i>
		</div>
		<div class="song-sheet">
			<div class="video-item" v-for="item in sheetList" :key="item.id">
				<div class="video-item-img" v-bind:style="{backgroundImage: 'url('+item.src+')'}">
					<span class="corner-num">{{item.num}}万</span>
				</div>
				<p class="song-title text-ellipsis2">{{item.title}}</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['sheetList']
	}
</script>