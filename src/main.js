//main.js这是项目的核心文件。全局的配置都在这个文件里面配置
import Vue from 'vue'
import App from './App.vue'
import router from './routes.js'
import MintUI from 'mint-ui'


import './assets/css/base.css'
import './assets/css/style.css'
import 'mint-ui/lib/style.css'
import './assets/myFont/iconfont.css'
//import './assets/sass/reset.sass'//报错暂时不用sass
Vue.config.debug = true;//开启错误提示
Vue.use(MintUI)

new Vue({
        router: router,
        el: '#appIndex',
        render: h => h(App)
})
