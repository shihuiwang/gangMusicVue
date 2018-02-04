// 引用模板
import Vue from 'vue';
import Router from 'vue-router';
import indexPage from './components/header.vue';
import homePage from './views/home.vue';
import aboutPage from './views/about.vue';
import homeMusic from './views/music.vue';
import homeVideo from './views/video.vue';
import homeRadio from './views/radioStation.vue';

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes:[
        {
            path:'/',
            redirect: '/homeMusic',
            component:homePage,
            children: [
                {
                    path: '/homeMusic',
                    component: homeMusic,
                    name: '首页音乐'
                },
                {
                    path: '/homeVideo',
                    component: homeVideo,
                    name: '首页视频'
                },
                {
                    path: '/homeRadio',
                    component: homeRadio,
                    name: '首页电台'
                }
            ]
        },
        {
            path:'/about',
            component:aboutPage
        }
    ]
})