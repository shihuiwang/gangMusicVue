//index.vue
<template>
    <div>
        <p class="nav-list flex">
            <router-link class="nav-item" to="/homeMusic" v-bind:class="{ active: isMusic }">音乐</router-link>
            <router-link class="nav-item" to="/homeVideo" v-bind:class="{ active: isVideo }">视频</router-link>
            <router-link class="nav-item" to="/homeRadio" v-bind:class="{ active: isRadio }">电台</router-link>
        </p>
        <div>
            <transition :name="transitionName">  
                <router-view class='router'></router-view>  
            </transition>
        </div>
    </div>
</template>

<script>
export default {
  name: 'indexP',
  data () {
    return {
        transitionName: 'slide-left',
        isMusic: true,
        isVideo: false,
        isRadio: false,
    }
  },
  methods:{
    
  },
    //监听路由的路径，可以通过不同的路径去选择不同的切换效果  
  watch: {  
    '$route' (to, from) {
      if(from.path == '/homeMusic' && to.path == '/homeVideo'){  
        this.transitionName = 'slide-left';
        this.isMusic = false;
        this.isVideo = true;
        this.isRadio = false;
      }
      if(from.path === '/homeVideo' && to.path == '/homeMusic'){  
        this.transitionName = 'slide-right';  
        this.isMusic = true;
        this.isVideo = false;
        this.isRadio = false;
      }
      if(from.path === '/homeVideo' && to.path == '/homeRadio'){  
        this.transitionName = 'slide-left'; 
        this.isMusic = false;
        this.isVideo = false;
        this.isRadio = true; 
      }
      if(from.path === '/homeRadio' && to.path == '/homeVideo'){  
        this.transitionName = 'slide-right'; 
        this.isMusic = false;
        this.isVideo = true;
        this.isRadio = false; 
      }
      if(from.path === '/homeRadio' && to.path == '/homeMusic'){  
        this.transitionName = 'slide-right';
        this.isMusic = true;
        this.isVideo = false;
        this.isRadio = false;  
      }
      if(from.path === '/homeMusic' && to.path == '/homeRadio'){  
        this.transitionName = 'slide-left'; 
        this.isMusic = false;
        this.isVideo = false;
        this.isRadio = true;  
      }
    }  
  }
}
</script>
<style lang="scss">
    .flex {
        display: -webkit-flex;
        display: flex;
        justify-content: space-around;
    }
    .nav-list {
        padding: 0 15px;
        height: 35px;
        align-items: stretch;
    }
    .nav-item {
        position: relative;
        flex-grow: 1;
        line-height: 35px;
    }
    .nav-item.active{
        color: #26a2ff;
    }
    .nav-item.active:after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 15%;
      width: 70%;
      height: 2px;
      background: #26a2ff;
    }
</style>
