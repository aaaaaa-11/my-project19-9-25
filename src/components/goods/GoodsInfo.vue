<template>
  <div class="goodsinfo-container">

    <!-- 小球加入购物车 -->
    <transition 
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag"></div>
    </transition>

    <!-- 轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="list" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品详情 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价 : <del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;&nbsp;销售价 : <span class="stock-price">￥{{ goodsinfo.sell_price }}</span>
          </p>
          <p>购买数量：<numbox></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time | dataFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" plain size="large" @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" plain size="large" @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
// 导入轮播图组件
import swiper from "../subcomponents/swipe.vue";
// 导入数字选择框
import numbox from '../subcomponents/goodsinfo_number.vue';

export default {
  data() {
    return {
      id: this.$route.params.id, // 将路由参数对象中的 id 挂载到 data，方便后期调用
      list: [], // 轮播图数据
      goodsinfo: {}, // 商品信息
      ballFlag: false // 控制小球是否显示
    };
  },
  created() {
    this.getPhotoInfo();
    this.getGoodsinfo()
  },
  methods: {
    getPhotoInfo() {
      // 获取轮播图
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.img_url = item.src;
          });
          this.list = result.body.message;
        }
      });
    },
    getGoodsinfo(){
      // 获取商品信息
      this.$http.get('api/goods/getinfo/' + this.id).then(result=>{
        if(result.body.status === 0){
          this.goodsinfo = result.body.message[0]
        }
      })
    },
    goDesc(id){
      // 使用编程式导航 跳转到 图文介绍页面
      this.$router.push({name: 'goodsdesc', params: { id } })
    },
    goComment(id){
      // 点击跳转到 评论页面
      this.$router.push({ name: 'goodscomment', params: { id } })
    },
    addToShopCar(){
      this.ballFlag = !this.ballFlag;
    },
    beforeEnter(el){
      el.style.transform = 'translate(0, 0)'
    },
    enter(el, done){
      el.offsetWidth
      el.style.transform = 'translate(90px, 330px)'
      el.style.transition = 'all 0.5s cubic-bezier(.21,-0.37,1,.51)'
      done()
    },
    afterEnter(el){
      this.ballFlag = !this.ballFlag
    }
  },
  components: {
    swiper,
    numbox
  }
};
</script>

<style lang="scss" scoped>

.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  .price {
    .stock-price {
      font-size: 13px;
      color: red;
    }
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 148px;
  }
}
</style>