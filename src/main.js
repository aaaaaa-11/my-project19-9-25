// 导入Vue
import Vue from 'vue'
// 1.1 安装路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 导入Mint-UI css 样式
import 'mint-ui/lib/style.css'
// 按需导入 Mint-UI中的组件
/* import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload) */
import MintUI from 'mint-ui'
Vue.use(MintUI)

// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
// 全局设置 post 时候表单数据格式的组织形式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dataFormat', function(dataStr, pattern="YYYY-MM-DD HH:MM:SS"){
  return moment(dataStr).format(pattern)
})

// 导入MUI
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 1.3 导入自己的router.js路由模块
import router from './router.js'

// 导入 App 根组件
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router // 1.4 挂载路由对象到 vm实例上
})