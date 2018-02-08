<!--App.vue是项目入口文件。-->
<template>
    <div id="app">
        <header-tab v-on:openMenu="toggleMenu"></header-tab>
        <div>
            <transition :name="transitionName">  
                <router-view class='router'></router-view>  
            </transition>
        </div>
        <footer-nav v-on:songPaly="songPalyShow"></footer-nav>
        <right-menu v-bind:action="action" v-on:toggleMenu="toggleMenu"></right-menu>
        <song-play  v-bind:player="player" v-on:songPaly="songPalyShow"></song-play>
    </div>
</template>

<script>
import HeaderTab from './components/header.vue'
import FooterNav from './components/footer.vue'
import RightMenu from './components/menu.vue'
import SongPlay from './components/songPlay.vue'
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
            opa: 0
        }
      
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
        console.log(11);
        this.player.top = '0';
        this.player.opa = 1;
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