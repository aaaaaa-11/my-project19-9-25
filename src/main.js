// 导入Vue
import Vue from 'vue'
// 1.1 安装路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 一开始就获取本地的购物车数据（如果没有就把一个空数据保存到购物车数据里）
var car = JSON.parse(localStorage.getItem('car') || '[]')

// 注册 vuex
import Vuex from 'vuex';
Vue.use(Vuex)
// 创建store
var store = new Vuex.Store({
  state: { // this.$store.state.***
    // 将购物车中的商品数据，用一个数组存储起来，在car数组中，存储一些商品对象，里面至少存储:
    // {id: 商品的id, count: 商品的数量, price: 商品的单价, selected: true}
    car: car
  },
  mutations: { // this.$store.commit('方法名', '按需传递的唯一的参数')
    addToCar(state, goodsinfo){
      // 点击加入购物车，就会把传过来的数据保存到store中
      // 1. 如果之前已经有该商品了，那么这时只需要更新数量
      // 2. 如果之前没有，则添加

      // 假设购物车中没有找到对应的商品
      var flag = false
      
      state.car.some(item=>{
        if(item.id == goodsinfo.id){
          item.count += parseInt(goodsinfo.count);
          // 购物车中找到对应的商品
          flag = true;
          return true;
        }
      })
      // 如果最终循环完毕，得到的flag还是false，那么就没有找到，直接把商品push进car数组中
      if(!flag){
        state.car.push(goodsinfo)
      }
      // 当 更新 car 之后，把car数组存储到本地localStorage中
      localStorage.setItem('car',  JSON.stringify(state.car));
    },
    updateCount(state, goodsinfo){
      state.car.some(item=>{
        if(item.id === goodsinfo.id){
          item.count = parseInt(goodsinfo.count);
          return true;
        }
      })
      // 当修改完商品的数量，把最新的购物车数据，保存到本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFromCar(state, id){
      // 根据Id，从store中删除购物车对应的商品数据
      state.car.some((item, i)=>{
        if(item.id == id){
          state.car.splice(i, 1)
          return true;
        }
      })
      // 将删除后的最新的购物车数据保存到localStorage中
      localStorage.setItem('car', state.car)
    },
    updateSelected(state, goodsinfo){
      state.car.some(item=>{
        if(item.id == goodsinfo.id){
          item.selected = goodsinfo.selected;
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: { // this.$store.getters.***
    getAllCount(state){
      var sum = 0;
      state.car.forEach(item=>{
        sum += item.count;
      })
      return sum
    },
    getGoodsCount(state){
      var o = {};
      state.car.forEach(item=>{
        o[item.id] = item.count
      })
      return o;
    },
    getGoodsSelected(state){
      var o = {};
      state.car.forEach(item=>{
        o[item.id] = item.selected
      })
      return o;
    },
    getGoodsCountAndAmount(state){
      var o = {
        count: 0, // 勾选的数量
        amount: 0 // 勾选的总价
      }
      state.car.forEach(item=>{
        if(item.selected){
          o.count += item.count;
          o.amount += item.count*item.price
        }
      })
      return o;
    }
  }
})

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
  router, // 1.4 挂载路由对象到 vm实例上
  store // 挂载store管理对象
})