# gangMusicVue
a、使用方法
项目下打开命令行工具
npm install //等待安装完成

npm run dev //启动开发环境服务，自动开启浏览器运行项目

npm run build //编译上线代码

b、目录结构
dist //第一次运行项目后自动生成的编译后代码文件存放处

node_modules //npm install安装回来的库和插件

-src //代码业务逻辑文件夹，存放主要的开发代码文件
   |
   --assets //静态资源
        ---css
        ---images
        ---myFont //阿里巴巴矢量图标库下载回来的图标库
        ---sass
   --components //自定义的共用组件、复用性高的组件
   		---footer
   		---header
   		---imageText
   		---menu
   		---mvSheet
   		---songSheet
   		---textImage
   --views //详情页
   --App.vue //项目入口文件
   --main.js //项目的核心文件。全局的配置都在这个文件里面配置
   --routes.js //项目路由配置文件
-index.html //入口页面
-webpack.config //webpack配置文件
