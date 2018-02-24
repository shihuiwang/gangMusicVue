//main.js这是项目的核心文件。全局的配置都在这个文件里面配置
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import MintUI from 'mint-ui'

import './assets/css/base.css'
import './assets/css/style.css'
import './assets/css/app.css'
import 'mint-ui/lib/style.css'
import './assets/myFont/iconfont.css'
//import './assets/sass/reset.sass'//报错暂时不用sass
Vue.config.debug = true;//开启错误提示
Vue.config.productionTip = false;
Vue.use(MintUI);
//全局的静态资源路径，使用的时候是this.staticSource
Vue.prototype.staticSource = '../static/';
//打包build时去掉注释，在app时才可以显示图片 
Vue.prototype.staticSource = 'https://raw.githubusercontent.com/shihuiwang/gangMusicVue/master/src/assets/';

new Vue({
  el: '#appIndex',
  router,
  components: { App },
  template: '<App/>'
})
