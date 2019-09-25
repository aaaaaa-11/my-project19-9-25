// 入口文件
// console.log("ok");

// 导入Vue
import Vue from 'vue'

// 按需导入
import 'mint-ui/lib/style.css'
import { Header } from 'mint-ui'
Vue.component(Header.name, Header)

// 导入MUI
import './lib/mui/css/mui.min.css'

// 导入 App 根组件
import app from './App.vue'

var vm = new Vue({
  el: '#app',
  render: c => c(app)
})