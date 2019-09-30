<template>
  <div class="goodsinfo-container">

    <!-- 小球加入购物车 -->
    <transition 
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
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
          <p>购买数量：<numbox @getcount="getSelectorCount" :max_count="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>

            <!-- 实现 加入购物车 功能时，需要拿到numbox中的购买数量 -->
            <!-- 1. 按钮属于goodsinfo 页面，数字属于numbox组件 -->
            <!-- 2. 涉及到父子组件传值：事件调用 -->
            <!-- 3. 事件调用本质：父向子传递方法，子调用该方法，同时把数据作为参数传递给这个方法 -->
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
      ballFlag: false, // 控制小球是否显示
      selectedCount: 1 // 保存用户选中的商品数量，默认用户买1个
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

      // 小球动画优化思路：
      // 1. 小球动画不准确的本质原因：我们把小球最终移动的位置已经限制于某一固定分辨率下、滚动条未滚动的情况下。
      // 2. 只要分辨率和测试时不一样，或滚动条有一定滚动距离后，问题就出现了。
      // 3. 因此：不要把位移的横纵坐标写死，而是应该视情况动态计算这个坐标值
      // 4. 解题思路：先得到小球的徽标的横纵坐标，然后两两相减，得到小球的徽标的相对位移，就是小球要移动的距离。
      // 5. 难点：获取小球和徽标的位置 —— domObject.getBoundingClientRect()

      // 获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect()
      // 获取徽标的位置
      const badgePosition = document.getElementById('badge').getBoundingClientRect()

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`
      el.style.transition = 'all 0.5s cubic-bezier(.21,-0.37,1,.51)'
      done()
    },
    afterEnter(el){
      this.ballFlag = !this.ballFlag
      // document.getElementById('badge').innerText = this.selectedCount;
    },
    getSelectorCount(count){
      // 当子组件把 选中的数量 传递给父组件时，把选中的值保存到 data 上
      this.selectedCount = count;
      console.log(count);
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