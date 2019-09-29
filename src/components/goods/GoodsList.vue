<template>
  <div class="goodslist-container">
    <!-- 商品列表项 -->
    <!-- <router-link :to="'/home/goodsinfo/' + item.id" tag="div" class="goods-list-item" v-for="item in goodslist" :key="item.id">
      <div class="img">
        <img :src="item.img_url" alt="">
      </div>
      <div class="title">{{ item.title }}</div>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="before">$2{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </router-link> -->

    <!-- 在网页中，有两种跳转方式 -->
    <!-- 方式1：使用 a 标签 的形式叫做 标签跳转 -->
    <!-- 方式2：使用 window.location.href 的形式，叫做 编程式导航 -->
    <div class="goods-list-item" v-for="item in goodslist" :key="item.id" @click="getDetail(item.id)">
      <div class="img">
        <img :src="item.img_url" alt="">
      </div>
      <div class="title">{{ item.title }}</div>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="before">$2{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>

    <!-- 加载更多 -->
    <mt-button size="large" type="danger" @click="getMore()">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      goodslist: [],
      pageIdx: 1
    }
  },
  created(){
    this.getGoods()
  },
  methods: {
    getGoods(){
      this.$http.get('api/getgoods?pageindex=' + this.pageIdx).then(result => {
        if(result.body.status === 0){
          this.goodslist = this.goodslist.concat(result.body.message)
        }
      });
    },
    /* getMore(){
      this.pageIdx++
      this.getGoods()
    } */
    getDetail(id){
      console.log(this);
      // 使用JS的形式的形式进行路由导航

      // this.$route 和 this.$router
      // this.$route：是路由参数对象，所有路由中的参宿，params、query都属于它
      // this.$router：路由【导航对象】，用它可以方便的使用 JS代码，实现路由的前进、后退，跳转到新的 URL 地址
      // 1. 最简单的写法
      // this.$router.push('/home/goodsinfo/' + id)
      // 2. 传递对象
      // this.$router.push({path: '/home/goodsinfo/' + id})
      // 3. 命令路由
      this.$router.push({ name: 'goodsinfo', params: { id: id } })
      // 如果提供了 path，params就会被忽略，所以要么使用path，要么使用params，不要一起用
      // 使用 :id 这种形式可以使用上面的方法，如果使用 ?uname=tom 这种形式可以把params改为 query
    }
  }
}
</script>

<style lang="scss" scoped>
.goodslist-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 7px;
  .goods-list-item {
    margin: 3px 0;
    width: 49%;
    box-sizing: border-box;
    border: 1px solid #aaa;
    box-shadow: 0 0 6px #999;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
      padding: 5px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-size: 16px;
          font-weight: bold;
        }
        .before {
          font-size: 12px;
          text-decoration: line-through;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
  button{
   outline:none;
   :focus {outline:none;} /*for IE*/
::-moz-focus-inner {border-color: transparent;} /*for mozilla*/
  }
}
</style>