<!--App.vue是项目入口文件。-->
<template>
    <div id="app">
        <header-tab v-on:openMenu="toggleMenu"></header-tab>
        <div>
            <transition :name="transitionName">  
                <router-view class='router'></router-view>  
            </transition>
        </div>
        <footer-nav ref="footplay" @songPaly="songPalyShow" 
        :player="player"
        @play="play" @pause="pause"></footer-nav>
        <right-menu v-bind:action="action" v-on:toggleMenu="toggleMenu"></right-menu>
        <song-play ref="songplay" :player="player" @songPaly="songPalyShow" @play="play" @pause="pause"></song-play>
        <audio id="globalAudio"></audio>
    </div>
</template>

<script>
import Vue from 'vue'
import HeaderTab from './components/header.vue'
import FooterNav from './components/footer.vue'
import RightMenu from './components/menu.vue'
import SongPlay from './components/songPlay.vue'
    
    var ontimeupdate = function(_this) {
        var _this = _this;
        //console.info('播放时间发生改变：'+globalAudio.currentTime, globalAudio.duration);
        //console.info('播放进度：'+(footAudio.currentTime/footAudio.duration).toFixed(2)*100+'%');
        _this.playProgress = (globalAudio.currentTime/globalAudio.duration).toFixed(2)*100;

        var all = globalAudio.currentTime.toFixed(2);
        var time = (all/60).toFixed(1).split('.');
        _this.currentTime = (time[0]<10?('0' + time[0]):time[0]) + ':' + (time[1]<10?('0' + time[1]):time[1]);
    }

    var onpause = function(_this) {
        var _this = _this;
        //console.info('暂停播放：' + footAudio.currentTime);
        _this.player.isPlaying = false;
        _this.player.playState = true;
        _this.player.stickDeg = '-15';
        if(globalAudio.duration <= globalAudio.currentTime){
            _this.playProgress = 0;
            //console.log(_this.player.songSheet,_this.player.songSheet.length);

            //播放下一首歌曲
            _this.currentSongIndex = _this.currentSongIndex + 1;
            if(_this.currentSongIndex > _this.player.songSheet.length){
                Toast({
                  message: '列表歌曲已经全部播放',
                  position: 'bottom',
                  duration: 3000
                });
                return;
            }
            var currentSong = _this.player.songSheet[_this.currentSongIndex];
            var audioSrc = '../src/assets/audio/' + currentSong.songer + ' - ' + currentSong.name + '.mp3';
            _this.audioSrc = audioSrc;
            _this.currentSong = currentSong;
            setTimeout(() => {
                globalAudio.src = _this.audioSrc;
                globalAudio.play();
                globalAudio.ontimeupdate = function (e) {
                    ontimeupdate(_this);
                }
                globalAudio.onpause = function () {
                    //歌曲播放完成后自动执行暂停
                    onpause(_this);
                }
                globalAudio.onplay = function () {
                    //console.info('开始播放：' + footAudio.currentTime);
                    onplay(_this);
                }
            }, 200);
            return;
        }
    }

    var onplay = function(_this) {
        var _this = _this;
        _this.player.stickDeg = '7';
        _this.player.isPlaying = true;
        _this.player.playState = false;
        //获取不到总时长时要进行不断查询来获取时间
        if(isNaN(globalAudio.duration)) {
            _this.totalTime = '00:00';

            var getTotalTime = function() {
                if(globalAudio.duration == NaN) {
                    setTimeout(() => {
                        getTotalTime();
                    },100);
                }
                var all = globalAudio.duration.toFixed(2);
                var time = (all/60).toFixed(1).split('.');
                _this.totalTime = (time[0]<10?('0' + time[0]):time[0]) + ':' + (time[1]<10?('0' + time[1]):time[1]);
            }

            setTimeout(() => {
                getTotalTime();
            },100);
        }
        else{
            //正常获取总时长
            var all = globalAudio.duration.toFixed(2);
            var time = (all/60).toFixed(1).split('.');
            _this.totalTime = (time[0]<10?('0' + time[0]):time[0]) + ':' + (time[1]<10?('0' + time[1]):time[1]);
        }
    }
    window.onload = function(){
        var globalAudio = document.querySelector('#globalAudio');
        Vue.prototype.globalAudio = globalAudio;
        //监听事件
        /*footAudio.oncanplay = function () {
            console.info('进入可播放状态,音频总长度:' + footAudio.duration);
        }
        globalAudio.onplay = function () {
            console.info('开始播放：' + footAudio.currentTime);
        }
        footAudio.onpause = function () {
            //歌曲播放完成后自动执行暂停
            console.info('暂停播放：' + footAudio.currentTime);
        }
        footAudio.onprogress = function () {
            console.info(footAudio.buffered);
            console.info('正在播放：' + footAudio.currentTime);
        }*/
    }
    
    function initSongSheet(){
        //生成模拟的歌曲数据
        var imgSrc = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg'];
        var songerName = [
            '二珂 - 带着音乐去旅行',
            '高野健一 - さくら',
            '黑崎子 - 最美情侣（Cover 白小白）',
            '金莎 - 最后一个夏天',
            '锦零 - 春风吹（Cover 方大同）',
            '井口裕香 - 白金ディスコ',
            '谢春花 - 理想三旬 (Live)',
            '周冬雨 - 不完美女孩',
            '周子琰 - 全世界我最喜欢你'
        ];
        for (var i = 0, song = []; i <= imgSrc.length-1; i++) {
            var num = Math.random()*9;
            num = parseInt(num, 10);
            var name = {
                id: i, 
                cover:'../src/assets/images/'+imgSrc[i],
                num: num,
                songer: songerName[i].split(' - ')[0],
                name: songerName[i].split(' - ')[1]
            }
            if(i == 0) {
                name.type = '推荐歌单';
            }
            song.push(name);
        };
        return song;
    }

export default {
  name: 'app',
  data () {
    return {
        transitionName: 'slide-left',
        action: {
            boxShow: false,
            show: false,
            left: '-80%'
        },
        player: {
            top: '100%',
            opa: 0,
            songSheet: initSongSheet(),
            stickDeg: '-15',
            isPlaying: false,
            playState: true,
        },
        playing: false,
        //audioSrc: '../src/assets/audio/'+this.player.songSheet[0].songer+' - '+this.player.songSheet[0].name+'.mp3',
    }
  },
  components:{
    HeaderTab,
    FooterNav,
    RightMenu,
    SongPlay
  },
  //监听路由的路径，可以通过不同的路径去选择不同的切换效果  
  watch: {  
    '$route' (to, from) {
        if(from.path == '/personalCenter' && to.path == '/homeMusic'){  
            this.transitionName = 'slide-left';
        }
        if(from.path === '/homeMusic' && to.path == '/personalCenter'){  
            this.transitionName = 'slide-right';  
        }
        if(from.path === '/homeMusic' && to.path == '/friendsTrends'){  
            this.transitionName = 'slide-left';  
        }
        if(from.path === '/friendsTrends' && to.path == '/homeMusic'){  
            this.transitionName = 'slide-right'; 
        }
        if(from.path === '/friendsTrends' && to.path == '/personalCenter'){  
            this.transitionName = 'slide-right';
        }
        if(from.path === '/personalCenter' && to.path == '/friendsTrends'){  
            this.transitionName = 'slide-left';  
        }  
    }  
  },
    methods: {
        toggleMenu(){
            if(this.action.show){
                setTimeout(() => {
                    this.action.boxShow = false;
                },500);
                this.action.show = false;
                this.action.left = '-80%';
            }
            else{
                this.action.boxShow = true;
                setTimeout(() => {
                    this.action.show = true;
                    this.action.left = 0;
                },50);
            }
        },
        songPalyShow() {
            this.player.top = '0';
            this.player.opa = 1;
        },
        play(para) {
            this.playing = true;
            console.log('11a',para);
            /*if(para == 'song') {
                if(!Vue.prototype.footPalying){
                   this.$refs.footplay.audioPlay(); 
                }
            }
            else if(para == 'foot'){
                if(!Vue.prototype.songPalying){
                    this.$refs.songplay.playSong(); 
                }
            }*/
            //Vue.prototype.songPalying = true;
            //向父组件广播播放事件
            //this.$emit('play','song');
            //console.log('11b');
            //globalAudio  = Vue.prototype.globalAudio;
            if(!globalAudio.src) {
                globalAudio.src = '../src/assets/audio/'+this.player.songSheet[0].songer+' - '+this.player.songSheet[0].name+'.mp3';
            }
            console.log(globalAudio,globalAudio.src);
            globalAudio.play();
            var _this = this;
            globalAudio.ontimeupdate = function (e) {
                ontimeupdate(_this);
            }
            globalAudio.onpause = function () {
                //歌曲播放完成后自动执行暂停
                onpause(_this);
            }
            globalAudio.onplay = function () {
                //console.info('开始播放：' + footAudio.currentTime);
                onplay(_this);
            }
        },
        pause() {
            console.log('暂停');
            this.playing = false;

            this.player.stickDeg = '-15';
            this.player.isPlaying = false;
            this.player.playState = true;
        }
    }
}
</script>

<style lang="sass">
   /*这里sass编译正常*/
    $redColor:red;
    h2{
        color:$redColor;
    }
    #app {
        text-align: center;
        color: #2c3e50;
        padding-top: 40px;
    }
</style>
<style>  
    .router {  
        position: absolute;  
        width: 100%;  
        transition: all .4s ease;  
    }
    .menu {  
        width: 80%;  
        transition: all .5s ease;  
    }
    .song-play-bg {
        transition: all .3s ease; 
    }
    .slide-left-enter,  
    .slide-right-leave-active {  
        opacity: 0;  
        -webkit-transform: translate(100%, 0);  
        transform: translate(100%, 0);  
    }  
      
    .slide-left-leave-active,  
    .slide-right-enter {  
        opacity: 0;  
        -webkit-transform: translate(-100%, 0);  
        transform: translate(-100% 0);  
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style> 