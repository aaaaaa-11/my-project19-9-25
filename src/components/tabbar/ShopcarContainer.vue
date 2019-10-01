<template>
  <div class="shopcar-container">
    <!-- 商品列表项 -->
    <div class="goods-list">
      <div class="mui-card" v-for="(item, i) in goodsList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="info">
              <h3 class="title">{{ item.title }}</h3>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <!-- 如何从购物车中获取商品数量 -->
                <!-- 1. 可以先创建一个空对象，然后循环购物车中所有商品数据，并把当前循环的商品的id作为对象的属性名，count作为属性值。这样，遍历完整个数组，就会得到一个对象{ 87: 1, 89: 2, ... } -->
                <numbox :id="item.id" :initcount="$store.getters.getGoodsCount[item.id]"></numbox>
                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="jiesuan">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <div class="info">
              <p>总计（不含运费）</p>
              <p>已勾选商品<span>{{ $store.getters.getGoodsCountAndAmount.count }}</span>件，总价 : <span>￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>

    <p v-html="$store.getters.getGoodsSelected"></p>
  </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox.vue';

export default {
  data(){
    return {
      goodsList: [] // 购物车中所有商品数据
    }
  },
  created(){
    this.getGoodsInfo()
  },
  methods: {
    getGoodsInfo(){
      // 获取所有商品的ID，然后拼接出一个 用 , 分隔的字符串
      var idArr = [];
      this.$store.state.car.forEach(item=>idArr.push(item.id))
      // 如果购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
      if(idArr.length <= 0){
        return;
      }
      this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(result => {
        if(result.body.status === 0){
          this.goodsList = result.body.message
          // console.log(goodsList);
        }
      })
    },
    remove(id, idx){
      // 点击删除，把商品从 store中根据指定的id删除，同时根据传进来的索引 idx 把当前组件的goodsList中的该商品删除
      this.goodsList.splice(idx, 1)
      this.$store.commit('removeFromCar', id)
    },
    selectedChanged(id, selected){
      this.$store.commit('updateSelected', {id: id, selected: selected})
    }
  },
  components: {
    numbox
  }
}
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    img {
      width: 60px;
      height: 60px;
      margin: 0 5px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h3 {
        font-size: 13px;
      }
      .price {color: red; font-weight: bold;}
      p {margin: 10px 0 0;}
    }
    .mui-card-content-inner {
      display: flex;
      justify-content: space-between; 
      align-items: center;
    }
  }
  .jiesuan {
    .mui-card-content-inner {
      display: flex;
      justify-content: space-between; 
      align-items: center;
      p {
        margin: 5px 0;
        span {
          color: red;
          font-weight: bold;
        }
      }
    }
  }
}
</style>